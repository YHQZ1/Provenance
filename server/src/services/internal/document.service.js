import { supabaseAdmin } from "../../config/database.js";
import { storageService } from "./storage.service.js";
import { ocrService } from "../external/ocr.service.js";
import { ragService } from "../external/rag.service.js";
import { env } from "../../config/env.js";

// Use mocks if services not ready
const USE_MOCK_OCR = env.USE_MOCK_SERVICES === "true" || !env.OCR_SERVICE_URL;
const USE_MOCK_RAG = env.USE_MOCK_SERVICES === "true" || !env.RAG_SERVICE_URL;

export const documentService = {
  /**
   * Create document and start processing pipeline
   */
  async createDocument(userId, fileInfo) {
    const { originalname, mimetype, size, path: localPath } = fileInfo;

    // 1. Upload to Supabase Storage
    const { path: storagePath } = await storageService.uploadFile(
      localPath,
      userId,
      originalname
    );

    // 2. Create document record
    const { data: document, error } = await supabaseAdmin
      .from("documents")
      .insert({
        company_id: userId,
        filename: originalname,
        file_path: storagePath,
        mime_type: mimetype,
        file_size: size,
        status: "PENDING",
        extracted_data: {},
      })
      .select()
      .single();

    if (error) {
      // Rollback storage
      await storageService.deleteFile(storagePath).catch(console.error);
      throw new Error(`Database insert failed: ${error.message}`);
    }

    // 3. Start OCR processing (async)
    this.startOcrProcessing(document.id, storagePath).catch((err) => {
      console.error("OCR processing failed:", err);
      // Update status to failed
      supabaseAdmin
        .from("documents")
        .update({
          status: "OCR_FAILED",
          error_message: err.message,
        })
        .eq("id", document.id)
        .then();
    });

    return document;
  },

  /**
   * Start OCR processing (internal)
   */
  async startOcrProcessing(documentId, storagePath) {
    // Update status
    await supabaseAdmin
      .from("documents")
      .update({ status: "OCR_PROCESSING" })
      .eq("id", documentId);

    // Call OCR service (or mock)
    const ocr = USE_MOCK_OCR ? ocrService.mockSubmit : ocrService.submitForOcr;
    await ocr(documentId, storagePath);
  },

  /**
   * Handle OCR completion webhook
   */
  async handleOcrComplete(documentId, ocrResult) {
    console.log(`[OCR Complete] Document ${documentId}`);

    // 1. Update document with OCR results
    const { error: updateError } = await supabaseAdmin
      .from("documents")
      .update({
        raw_text: ocrResult.raw_text,
        extracted_data: ocrResult.extracted_data,
        ocr_confidence: ocrResult.confidence,
        status: "OCR_COMPLETED",
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId);

    if (updateError) {
      throw new Error(`Failed to save OCR results: ${updateError.message}`);
    }

    // 2. Start RAG classification if items found
    const items = ocrResult.extracted_data?.items || [];
    if (items.length === 0) {
      // No items to classify
      await supabaseAdmin
        .from("documents")
        .update({
          status: "COMPLETED",
          requires_human_review: true,
          reasoning: "No items extracted from document",
        })
        .eq("id", documentId);
      return;
    }

    // Get company ID
    const { data: doc } = await supabaseAdmin
      .from("documents")
      .select("company_id")
      .eq("id", documentId)
      .single();

    // Start RAG
    await supabaseAdmin
      .from("documents")
      .update({ status: "RAG_PROCESSING" })
      .eq("id", documentId);

    const rag = USE_MOCK_RAG ? ragService.mockSubmit : ragService.submitForClassification;
    await rag(documentId, items, doc.company_id);
  },

  /**
   * Handle RAG completion webhook
   */
  async handleRagComplete(documentId, ragResult) {
    console.log(`[RAG Complete] Document ${documentId}`);

    const classifications = ragResult.classifications || [];
    let requiresReview = false;
    let totalConfidence = 0;

    // Insert classifications
    for (const cls of classifications) {
      const confidence = cls.confidence_score || 0;
      totalConfidence += confidence;

      if (confidence < 0.8) {
        requiresReview = true;
      }

      const { error } = await supabaseAdmin
        .from("document_classifications")
        .insert({
          document_id: documentId,
          material_code: cls.material_code,
          quantity_kg: cls.quantity_kg,
          confidence_score: confidence,
          reasoning: cls.reasoning,
          matched_synonym: cls.matched_synonym,
          vector_similarity: cls.vector_similarity,
          requires_human_review: confidence < 0.8,
          alternatives: cls.alternatives || [],
        });

      if (error) {
        console.error("Failed to insert classification:", error);
      }
    }

    // Calculate document-level metrics
    const avgConfidence =
      classifications.length > 0 ? totalConfidence / classifications.length : 0;

    // Find primary material (highest confidence)
    const primary =
      classifications.length > 0
        ? classifications.reduce((prev, current) =>
            prev.confidence_score > current.confidence_score ? prev : current
          )
        : null;

    // Update document
    const { error } = await supabaseAdmin
      .from("documents")
      .update({
        status: "COMPLETED",
        rag_confidence: avgConfidence,
        primary_material: primary?.material_code,
        requires_human_review: requiresReview,
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId);

    if (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }

    console.log(
      `[Document ${documentId}] Completed. Review required: ${requiresReview}`
    );
  },

  /**
   * Get document with details
   */
  async getDocument(documentId, userId) {
    const { data: document, error } = await supabaseAdmin
      .from("documents")
      .select(
        `
        *,
        document_classifications (
          *,
          materials_master (material_name, category)
        )
      `
      )
      .eq("id", documentId)
      .eq("company_id", userId)
      .single();

    if (error || !document) {
      throw new Error("Document not found");
    }

    // Get signed URL for file access
    const fileUrl = await storageService.getSignedUrl(document.file_path, 300);

    return {
      ...document,
      file_url: fileUrl,
      summary: {
        total_items: document.document_classifications?.length || 0,
        pending_review:
          document.document_classifications?.filter(
            (c) => c.requires_human_review && !c.verified_by_user
          ).length || 0,
        verified:
          document.document_classifications?.filter((c) => c.verified_by_user)
            .length || 0,
        avg_confidence: document.rag_confidence,
      },
    };
  },

  /**
   * List documents
   */
  async listDocuments(userId, options = {}) {
    const { page = 1, limit = 20, status } = options;

    let query = supabaseAdmin
      .from("documents")
      .select(
        `
        *,
        document_classifications (
          id,
          material_code,
          confidence_score,
          requires_human_review,
          verified_by_user
        )
      `,
        { count: "exact" }
      )
      .eq("company_id", userId)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }

    return {
      data: data.map((doc) => ({
        id: doc.id,
        filename: doc.filename,
        status: doc.status,
        document_type: doc.document_type,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
        ocr_confidence: doc.ocr_confidence,
        rag_confidence: doc.rag_confidence,
        requires_human_review: doc.requires_human_review,
        primary_material: doc.primary_material,
        classifications_count: doc.document_classifications?.length || 0,
        pending_review:
          doc.document_classifications?.filter(
            (c) => c.requires_human_review && !c.verified_by_user
          ).length || 0,
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  },
};
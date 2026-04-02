import { documentService } from "../services/internal/document.service.js";

export const documentController = {
  /**
   * POST /documents/upload
   */
  async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const document = await documentService.createDocument(
        req.user.id,
        req.file
      );

      res.status(201).json({
        success: true,
        message: "Document uploaded and processing started",
        data: {
          id: document.id,
          filename: document.filename,
          status: document.status,
          created_at: document.created_at,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /documents
   */
  async list(req, res, next) {
    try {
      const result = await documentService.listDocuments(req.user.id, {
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
      });

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /documents/:id
   */
  async getById(req, res, next) {
    try {
      const document = await documentService.getDocument(
        req.params.id,
        req.user.id
      );

      res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /documents/:id/status
   */
  async getStatus(req, res, next) {
    try {
      const { supabaseAdmin } = await import("../config/database.js");
      
      const { data: document, error } = await supabaseAdmin
        .from("documents")
        .select(
          "id, status, ocr_confidence, rag_confidence, requires_human_review, verified_by_user, updated_at, error_message"
        )
        .eq("id", req.params.id)
        .eq("company_id", req.user.id)
        .single();

      if (error || !document) {
        return res.status(404).json({
          success: false,
          message: "Document not found",
        });
      }

      res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /webhooks/ocr/complete
   * Called by OCR service when processing completes
   */
  async handleOcrWebhook(req, res, next) {
    try {
      const { document_id, raw_text, extracted_data, confidence, status } =
        req.body;

      if (status === "FAILED") {
        await documentService.handleOcrFailure(document_id, req.body.error);
        return res.json({ success: true, message: "OCR failure recorded" });
      }

      await documentService.handleOcrComplete(document_id, {
        raw_text,
        extracted_data,
        confidence,
      });

      res.json({ success: true, message: "OCR results processed" });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /webhooks/rag/complete
   * Called by RAG service when classification completes
   */
  async handleRagWebhook(req, res, next) {
    try {
      const { document_id, classifications, status, error: ragError } =
        req.body;

      if (status === "FAILED") {
        await documentService.handleRagFailure(document_id, ragError);
        return res.json({ success: true, message: "RAG failure recorded" });
      }

      await documentService.handleRagComplete(document_id, {
        classifications,
      });

      res.json({ success: true, message: "RAG results processed" });
    } catch (error) {
      next(error);
    }
  },
};
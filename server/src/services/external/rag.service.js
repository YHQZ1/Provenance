import axios from "axios";
import { env } from "../../config/env.js";

const RAG_URL = env.RAG_SERVICE_URL || "http://rag-service:8001";

export const ragService = {
  /**
   * Submit text for classification
   * Backend calls RAG service directly
   */
  async submitForClassification(documentId, items, companyId) {
    try {
      const response = await axios.post(
        `${RAG_URL}/classify`,
        {
          document_id: documentId,
          company_id: companyId,
          items: items.map((item, index) => ({
            id: index,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            context: `Invoice item from supplier`,
          })),
          webhook_url: `${env.BACKEND_WEBHOOK_URL}/rag/complete`,
        },
        {
          timeout: 5000,
        }
      );

      return {
        jobId: response.data.job_id,
        status: "SUBMITTED",
      };
    } catch (error) {
      console.error("RAG submission failed:", error.message);
      throw new Error(`Failed to submit RAG job: ${error.message}`);
    }
  },

  /**
   * MOCK for testing
   */
  async mockSubmit(documentId, items, companyId) {
    console.log(`[MOCK RAG] Classifying ${items.length} items for ${documentId}`);

    setTimeout(async () => {
      try {
        const axios = (await import("axios")).default;

        const classifications = items.map((item, index) => {
          // Simple mock logic based on description
          const desc = item.description.toLowerCase();
          let material = "PET";
          let confidence = 0.94;
          let synonym = item.description.split(" ")[0];

          if (desc.includes("hdpe") || desc.includes("5400")) {
            material = "HDPE";
            confidence = 0.91;
          } else if (desc.includes("pp") || desc.includes("repol")) {
            material = "PP";
            confidence = 0.89;
          } else if (desc.includes("pvc")) {
            material = "PVC";
            confidence = 0.87;
          }

          // Parse quantity
          const qtyStr = item.quantity?.toString().replace(/,/g, "") || "0";
          const quantityKg = parseFloat(qtyStr);

          return {
            id: index,
            material_code: material,
            quantity_kg: quantityKg,
            confidence_score: confidence,
            reasoning: `${item.description} matched to ${material} based on trade name pattern`,
            matched_synonym: synonym,
            vector_similarity: confidence - 0.05,
            alternatives: [
              { material_code: "HDPE", confidence: 0.23 },
              { material_code: "PP", confidence: 0.12 },
            ],
          };
        });

        await axios.post(`${env.BACKEND_WEBHOOK_URL}/rag/complete`, {
          document_id: documentId,
          classifications,
          processing_time: 2.5,
        });
      } catch (e) {
        console.error("[MOCK RAG] Webhook failed:", e.message);
      }
    }, 3000);

    return {
      jobId: `mock-rag-${documentId}`,
      status: "SUBMITTED",
    };
  },
};
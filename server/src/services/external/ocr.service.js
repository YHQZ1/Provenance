import axios from "axios";
import { env } from "../../config/env.js";

const OCR_URL = env.OCR_SERVICE_URL || "http://ocr-service:8000";

export const ocrService = {
  /**
   * Submit document for OCR processing
   * Backend calls OCR service directly (internal network)
   */
  async submitForOcr(documentId, storagePath) {
    try {
      const response = await axios.post(
        `${OCR_URL}/extract`,
        {
          document_id: documentId,
          file_path: storagePath,
          // OCR will call this webhook when done
          webhook_url: `${env.BACKEND_WEBHOOK_URL}/ocr/complete`,
        },
        {
          timeout: 5000, // 5s to accept job
        }
      );

      return {
        jobId: response.data.job_id,
        status: "SUBMITTED",
        estimatedTime: response.data.estimated_time || 30,
      };
    } catch (error) {
      console.error("OCR submission failed:", error.message);
      throw new Error(`Failed to submit OCR job: ${error.message}`);
    }
  },

  /**
   * Check job status (for polling fallback)
   */
  async getJobStatus(jobId) {
    try {
      const response = await axios.get(`${OCR_URL}/status/${jobId}`, {
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get OCR status: ${error.message}`);
    }
  },

  /**
   * MOCK for testing (remove when OCR ready)
   */
  async mockSubmit(documentId, storagePath) {
    console.log(`[MOCK OCR] Submitting ${documentId}`);

    // Simulate async processing
    setTimeout(async () => {
      try {
        const axios = (await import("axios")).default;

        await axios.post(`${env.BACKEND_WEBHOOK_URL}/ocr/complete`, {
          document_id: documentId,
          status: "COMPLETED",
          raw_text:
            "Reliance Industries Ltd\n" +
            "GST: 27AAACR5055K1Z5\n" +
            "Invoice No: RI/2025/00142\n" +
            "Date: 15-03-2025\n\n" +
            "Item: POLYPET 3020 Bottle Grade\n" +
            "Quantity: 10,000 KG\n" +
            "Rate: ₹85.50 per KG\n" +
            "Amount: ₹855,000",
          extracted_data: {
            supplier: "Reliance Industries Ltd",
            supplier_gst: "27AAACR5055K1Z5",
            invoice_number: "RI/2025/00142",
            date: "2025-03-15",
            items: [
              {
                description: "POLYPET 3020 Bottle Grade",
                quantity: "10,000",
                unit: "KG",
                rate: "85.50",
                amount: "855000",
              },
            ],
            total_amount: "855000",
            currency: "INR",
          },
          confidence: 92.5,
          processing_time: 4.2,
        });
      } catch (e) {
        console.error("[MOCK OCR] Webhook failed:", e.message);
      }
    }, 5000); // 5 second delay

    return {
      jobId: `mock-ocr-${documentId}`,
      status: "SUBMITTED",
      estimatedTime: 5,
    };
  },
};
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { uploadMiddleware, handleUploadError } from "../middleware/upload.middleware.js";
import { documentController } from "../controllers/document.controller.js";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Document operations
router.post(
  "/upload",
  uploadMiddleware.single("file"),
  handleUploadError,
  documentController.upload
);

router.get("/", documentController.list);
router.get("/:id", documentController.getById);
router.get("/:id/status", documentController.getStatus);

// Webhooks (no auth - called by internal services)
// Protected by network isolation in production
router.post("/webhooks/ocr/complete", documentController.handleOcrWebhook);
router.post("/webhooks/rag/complete", documentController.handleRagWebhook);

export default router;
import { Router } from "express";
import {
  logout,
  getCurrentUser,
  syncUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/logout", logout);
router.get("/me", authenticate, getCurrentUser);
router.post("/sync", syncUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

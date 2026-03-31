import { Router } from "express";
import { getCurrentUser, logout } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

export default router;
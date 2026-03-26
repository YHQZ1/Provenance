import { Router } from "express";
import {
  signup,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import {
  googleLogin,
  microsoftLogin,
} from "../controllers/oauth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/google", googleLogin);
router.get("/microsoft", microsoftLogin);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

export default router;

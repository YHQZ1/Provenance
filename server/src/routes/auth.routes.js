import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.post("/sync", authController.syncUser);
router.post("/verify", authController.verifyToken); // For gateway
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected routes
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getCurrentUser);

export default router;

// import { Router } from "express";
// import {
//   logout,
//   getCurrentUser,
//   syncUser,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/auth.controller.js";
// import { authenticate } from "../middleware/auth.middleware.js";

// const router = Router();

// router.post("/logout", logout);
// router.get("/me", authenticate, getCurrentUser);
// router.post("/sync", syncUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// export default router;

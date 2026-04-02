import { authService } from "../services/internal/auth.service.js";
import { supabaseAdmin } from "../config/database.js";

export const authController = {
  /**
   * POST /auth/sync
   * Called by frontend after Supabase auth to sync with our backend
   */
  async syncUser(req, res, next) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: "No token provided",
        });
      }

      // Verify with Supabase
      const {
        data: { user },
        error,
      } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      // Get or create company
      const company = await authService.getOrCreateCompany(user);

      // Set cookie for web clients (optional, gateway uses headers)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 6 * 60 * 60 * 1000, // 6 hours
        path: "/",
      });

      return res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
          company,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /auth/verify
   * Internal endpoint for gateway to validate JWT
   * Returns user info in headers for gateway to capture
   */
  async verifyToken(req, res, next) {
    try {
      // Get token from cookie or Authorization header
      const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "No token" });
      }

      // Verify with Supabase
      const {
        data: { user },
        error,
      } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Return user info in headers (gateway captures these)
      res.setHeader("X-User-ID", user.id);
      res.setHeader("X-User-Email", user.email || "");
      res.setHeader("X-Gateway-Verified", "true");

      // Also return in body for debugging
      return res.json({
        valid: true,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Verify error:", error);
      return res.status(401).json({ error: "Verification failed" });
    }
  },

  /**
   * POST /auth/logout
   */
  logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });
  },

  /**
   * GET /auth/me
   * Get current user (from middleware)
   */
  getCurrentUser(req, res) {
    return res.json({
      success: true,
      data: {
        user: req.user,
        company: req.company,
      },
    });
  },

  /**
   * POST /auth/forgot-password
   */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return res.json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /auth/reset-password
   */
  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      await authService.resetPassword(token, newPassword);
      return res.json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      next(error);
    }
  },
};

// import { authService } from "../services/auth.service.js";

// export const logout = async (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   });
//   return res.json({ success: true, message: "Logout successful" });
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     return res.json({ success: true, user: req.user, company: req.company });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch user" });
//   }
// };

// export const syncUser = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No token provided" });
//     }

//     const {
//       data: { user },
//       error,
//     } = await authService.verifyToken(token);

//     if (error || !user) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     const company = await authService.getOrCreateCompany(user);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 6 * 60 * 60 * 1000,
//       path: "/",
//     });

//     return res.json({ success: true, user, company });
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     await authService.forgotPassword(email);
//     return res.json({ success: true, message: "Password reset email sent" });
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;
//     await authService.resetPassword(token, newPassword);
//     return res.json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

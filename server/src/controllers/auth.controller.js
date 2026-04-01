import { authService } from "../services/auth.service.js";

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res.json({ success: true, message: "Logout successful" });
};

export const getCurrentUser = async (req, res) => {
  try {
    return res.json({ success: true, user: req.user, company: req.company });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user" });
  }
};

export const syncUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    const {
      data: { user },
      error,
    } = await authService.verifyToken(token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const company = await authService.getOrCreateCompany(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 6 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({ success: true, user, company });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    return res.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

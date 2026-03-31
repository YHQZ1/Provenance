import { authService } from "../services/auth.service.js";

export const getCurrentUser = async (req, res) => {
  try {
    const data = await authService.getCurrentUser(req.user);

    return res.json({
      message: "User fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "InternalServerError",
      message: "Failed to fetch user",
    });
  }
};

export const logout = async (req, res) => {
  return res.json({
    message: "Logout handled on client",
  });
};

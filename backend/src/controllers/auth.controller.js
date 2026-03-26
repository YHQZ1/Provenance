import { authService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { email, password, companyName, gstNumber } = req.body;

    if (!email || !password || !companyName) {
      return res.status(400).json({
        error: "Missing fields",
        message: "Email, password, and company name are required",
      });
    }

    const result = await authService.signup(
      email,
      password,
      companyName,
      gstNumber,
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.user,
      requiresEmailVerification: !result.user?.confirmed_at,
    });
  } catch (error) {
    if (error.message.includes("already registered")) {
      return res.status(400).json({
        error: "User already exists",
        message:
          "An account with this email already exists. Please login instead.",
      });
    }

    res.status(400).json({
      error: "Signup failed",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing fields",
        message: "Email and password are required",
      });
    }

    const result = await authService.login(email, password);

    res.json({
      message: "Login successful",
      session: result.session,
      user: result.user,
      company: result.company,
    });
  } catch (error) {
    if (error.message.includes("Invalid login credentials")) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    if (error.message.includes("Email not confirmed")) {
      return res.status(401).json({
        error: "Email not verified",
        message: "Please verify your email before logging in",
      });
    }

    res.status(400).json({
      error: "Login failed",
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const result = await authService.getCurrentUser(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    await authService.logout();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({
      error: "Logout failed",
      message: error.message,
    });
  }
};

import { supabaseAdmin } from "../config/database.js";

export const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { data: company } = await supabaseAdmin
      .from("companies")
      .select("*")
      .eq("id", user.id)
      .single();

    req.user = { id: user.id, email: user.email };
    req.company = company;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
};

import { supabaseAdmin } from "../config/database.js";

/**
 * Authentication middleware
 * In production: Trusts gateway to validate JWT and pass user headers
 * In development: Can fall back to cookie validation
 */
export const authenticate = async (req, res, next) => {
  try {
    // Production: Gateway validates JWT and passes user info
    const userId = req.headers["x-user-id"];
    const userEmail = req.headers["x-user-email"];
    const gatewayVerified = req.headers["x-gateway-verified"];

    // If gateway passed user info, use it directly
    if (userId && gatewayVerified === "true") {
      req.user = { id: userId, email: userEmail };
      
      // Fetch company profile
      const { data: company, error: companyError } = await supabaseAdmin
        .from("companies")
        .select("*")
        .eq("id", userId)
        .single();

      if (companyError && companyError.code !== "PGRST116") {
        throw companyError;
      }

      req.company = company || null;
      return next();
    }

    // Development fallback: Verify JWT ourselves
    if (process.env.NODE_ENV === "development") {
      return await verifyTokenFromCookie(req, res, next);
    }

    // No valid auth
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

/**
 * Development fallback: Verify JWT from cookie
 */
async function verifyTokenFromCookie(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No authentication token",
    });
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  req.user = { id: user.id, email: user.email };

  const { data: company } = await supabaseAdmin
    .from("companies")
    .select("*")
    .eq("id", user.id)
    .single();

  req.company = company || null;
  next();
}

/**
 * Optional: Require company profile to be complete
 */
export const requireCompany = (req, res, next) => {
  if (!req.company) {
    return res.status(403).json({
      success: false,
      message: "Company profile required. Complete onboarding first.",
    });
  }
  next();
};

// import { supabaseAdmin } from "../config/database.js";

// export const authenticate = async (req, res, next) => {
//   try {
//     let token = req.cookies?.token;

//     if (!token) {
//       const authHeader = req.headers.authorization;
//       if (authHeader && authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//       }
//     }

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token provided" });
//     }

//     const {
//       data: { user },
//       error,
//     } = await supabaseAdmin.auth.getUser(token);

//     if (error || !user) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     const { data: company } = await supabaseAdmin
//       .from("companies")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     req.user = { id: user.id, email: user.email };
//     req.company = company;

//     next();
//   } catch (err) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Authentication failed" });
//   }
// };

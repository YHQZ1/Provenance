import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from server root
dotenv.config({ path: join(__dirname, "../../.env") });

export const env = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  
  // Services (internal network)
  OCR_SERVICE_URL: process.env.OCR_SERVICE_URL || "http://ocr-service:8000",
  RAG_SERVICE_URL: process.env.RAG_SERVICE_URL || "http://rag-service:8001",
  
  // Webhooks (how OCR/RAG call back)
  BACKEND_WEBHOOK_URL: process.env.BACKEND_WEBHOOK_URL || "http://backend:3000/api",
  
  // Uploads
  UPLOAD_TEMP_DIR: process.env.UPLOAD_TEMP_DIR || "./uploads",
  
  // Feature flags
  USE_MOCK_SERVICES: process.env.USE_MOCK_SERVICES || "true", // Set "false" when services ready
};

// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const NODE_ENV = process.env.NODE_ENV;

// const envFile = `.env.${NODE_ENV}`;
// const envPath = path.resolve(__dirname, "../../", envFile);

// dotenv.config({ path: envPath });

// const requiredEnvVars = ["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_URL", "SUPABASE_ANON_KEY"];

// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     throw new Error(`${envVar} is required in ${envFile}`);
//   }
// }

// export const env = {
//   PORT: process.env.PORT || 4000,
//   NODE_ENV: process.env.NODE_ENV,

//   SUPABASE_URL: process.env.SUPABASE_URL,
//   SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
//   SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
//   SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,

//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

//   MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
//   MICROSOFT_TENANT_ID: process.env.MICROSOFT_TENANT_ID,
//   MICROSOFT_SECRET_VALUE: process.env.MICROSOFT_SECRET_VALUE,
//   MICROSOFT_REDIRECT_URI: process.env.MICROSOFT_REDIRECT_URI,

//   CORS_ORIGIN: process.env.CORS_ORIGIN,
// };

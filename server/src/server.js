import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 EPR Backend running on port ${PORT}`);
  console.log(`📁 Environment: ${env.NODE_ENV || "development"}`);
  console.log(`🔧 Mock services: ${env.USE_MOCK_SERVICES === "true" ? "ENABLED" : "DISABLED"}`);
});
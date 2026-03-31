import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
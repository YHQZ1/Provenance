import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import documentRoutes from "./routes/documents.routes.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (_, res) => res.json({ message: "Provenance API is running" }));
app.get("/health", (_, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString() }),
);

// Health check (public)
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

app.use("/api/documents", documentRoutes); //route for document management

app.use(notFound);
app.use(errorHandler);

export default app;

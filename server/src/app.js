import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (_, res) => res.json({ message: "Provenance API is running" }));
app.get("/health", (_, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString() }),
);

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

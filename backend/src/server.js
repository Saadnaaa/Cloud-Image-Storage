import dns from "dns";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { authRouter } from "./routes/auth.routes.js";
import { memoryRouter } from "./routes/memory.routes.js";
import { connectDB } from "./config/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===============================
// Middleware
// ===============================

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===============================
// CORS
// ===============================

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRouter);
app.use("/api/memories", memoryRouter);

// ===============================
// Health Check
// ===============================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cloud Memory server is up and running",
  });
});

// ===============================
// Serve React Frontend
// ===============================

const frontendDist = path.join(__dirname, "../../frontend/dist");

if (fs.existsSync(frontendDist)) {
  console.log("Frontend found:", frontendDist);

  // Serve React static files
  app.use(express.static(frontendDist));

  // React Router fallback
  // API routes are excluded
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  console.log("Frontend dist folder not found:", frontendDist);
}

// ===============================
// Database + Server
// ===============================

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running 🎉 on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

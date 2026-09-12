import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { memoryRouter } from "./routes/memory.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // and requests from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Request parsers
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRouter);

app.use("/api/memories", memoryRouter);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Memory Cloud API is running",
  });
});

// ===============================
// SERVE REACT FRONTEND
// ===============================

// frontend/dist location
// server.js is inside: backend/src/server.js
// So ../../frontend/dist points to:
// cloud-memory/frontend/dist

const distPath = path.resolve(__dirname, "../../frontend/dist");

console.log("Frontend dist path:", distPath);

// Serve React static files
app.use(express.static(distPath));

// React SPA fallback for non-API GET requests.
// Avoid a wildcard route string like "*" because Express 5 rejects it
// with the path-to-regexp error seen on Render.
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  if (req.method !== "GET") {
    return next();
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// ===============================
// START SERVER
// ===============================

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { memoryRouter } from "./routes/memory.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Request parsers with 10mb limit for base64 image uploads
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/memories", memoryRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Memory Cloud API is running" });
});

// Serve frontend in production or whenever the built frontend exists.
const distPath = path.resolve(__dirname, "../../frontend/dist");
const frontendBuildExists = fs.existsSync(distPath);

if (process.env.NODE_ENV === "production" || frontendBuildExists) {
  app.use(express.static(distPath, { index: false }));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "API endpoint not found" });
    }

    if (req.path.includes(".")) {
      return next();
    }

    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

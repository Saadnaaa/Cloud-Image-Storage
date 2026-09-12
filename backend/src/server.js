import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
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
const ensureFrontendBuild = () => {
  if (fs.existsSync(distPath)) {
    return distPath;
  }

  const rootPath = path.resolve(__dirname, "../..");

  try {
    console.log("Frontend dist folder missing. Building frontend for production...");
    execSync("npm install --prefix frontend && npm run build --prefix frontend", {
      cwd: rootPath,
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to build frontend bundle:", error.message);
    return null;
  }

  return fs.existsSync(distPath) ? distPath : null;
};

const frontendDistPath = ensureFrontendBuild();

if (process.env.NODE_ENV === "production" || frontendDistPath) {
  app.use(express.static(frontendDistPath || distPath, { index: false }));

  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ message: "API endpoint not found" });
    }

    if (req.path.includes(".")) {
      return next();
    }

    res.sendFile(path.resolve((frontendDistPath || distPath), "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

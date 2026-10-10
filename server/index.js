import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db.js";
import { PORT, NODE_ENV } from "./config.js";
import { ensureSeed } from "./seed.js";

import authRoutes from "./routes/auth.js";
import toolRoutes from "./routes/tools.js";
import generateRoutes from "./routes/generate.js";
import leadRoutes from "./routes/leads.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Rate limit the API (abuse / spam protection on public tools)
const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });
app.use("/api", apiLimiter);

app.get("/api/health", (_req, res) => res.json({ ok: true, env: NODE_ENV }));
app.use("/api/auth", authRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

// Serve the built React client
const clientDir = path.join(__dirname, "..", "client", "dist");

// Homepage = the SmartCRM marketing landing (static). Tools app lives under /tools etc.
app.get("/", (_req, res, next) => {
  res.sendFile(path.join(clientDir, "landing.html"), (err) => { if (err) next(); });
});

app.use(express.static(clientDir));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(clientDir, "index.html"), (err) => {
    if (err) res.status(200).send("App is building… please refresh in a minute.");
  });
});

function start() {
  // Listen immediately so the platform health check passes; connect DB in the background.
  app.listen(PORT, () => console.log(`[server] listening on :${PORT} (${NODE_ENV})`));
  connectDB()
    .then(ensureSeed)
    .catch((e) => console.error("[boot] DB/seed error:", e.message));
}
start();

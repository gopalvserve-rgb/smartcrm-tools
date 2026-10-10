import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

function readToken(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
}

// Requires a logged-in end user
export function requireUser(req, res, next) {
  try {
    const token = readToken(req);
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.kind !== "user") return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Optional user (for tools that work logged-out but save owner if logged-in)
export function optionalUser(req, _res, next) {
  try {
    const token = readToken(req);
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.kind === "user") req.user = decoded;
    }
  } catch {
    /* ignore */
  }
  next();
}

// Requires an admin
export function requireAdmin(req, res, next) {
  try {
    const token = readToken(req);
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.kind !== "admin") return res.status(403).json({ error: "Admin only" });
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

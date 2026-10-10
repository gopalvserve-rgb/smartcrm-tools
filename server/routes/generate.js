import { Router } from "express";
import QRCode from "qrcode";
import { customAlphabet } from "nanoid";
import { Generation } from "../models/index.js";
import { optionalUser, requireUser } from "../middleware/auth.js";

const r = Router();
const nano = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 7);

const TOOLS = ["whatsapp", "qr", "card", "follow-hub"];

// Build the payload string a QR should encode, per tool
function qrPayload(tool, data = {}) {
  if (tool === "whatsapp") {
    const num = (data.number || "").replace(/[^0-9]/g, "");
    const text = encodeURIComponent(data.message || "");
    return `https://wa.me/${num}${text ? "?text=" + text : ""}`;
  }
  if (tool === "qr") return data.content || "";
  // card / follow-hub QR points to the public page; filled in after save
  return "";
}

// Create / save a generation. Works logged-out (owner optional).
r.post("/", optionalUser, async (req, res) => {
  try {
    const { tool, title, data } = req.body || {};
    if (!TOOLS.includes(tool)) return res.status(400).json({ error: "Unknown tool" });
    const shortId = nano();
    const gen = await Generation.create({
      shortId,
      tool,
      title: title || "",
      data: data || {},
      user: req.user ? req.user.id : undefined,
    });
    res.json({ generation: pub(gen, req) });
  } catch (e) {
    res.status(500).json({ error: "Could not save" });
  }
});

// Return a QR PNG (data URL) for arbitrary content — used by live preview
r.post("/qr-image", async (req, res) => {
  try {
    const { content, dark = "#0f172a", light = "#ffffff" } = req.body || {};
    if (!content) return res.status(400).json({ error: "content required" });
    const dataUrl = await QRCode.toDataURL(String(content), {
      width: 480,
      margin: 2,
      color: { dark, light },
      errorCorrectionLevel: "H",
    });
    res.json({ dataUrl });
  } catch {
    res.status(500).json({ error: "QR generation failed" });
  }
});

// My saved creations
r.get("/mine", requireUser, async (req, res) => {
  const items = await Generation.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(100);
  res.json({ items: items.map((g) => pub(g, req)) });
});

r.delete("/:id", requireUser, async (req, res) => {
  await Generation.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
});

function pub(g, req) {
  const base = `${req.protocol}://${req.get("host")}`;
  return {
    id: g._id,
    shortId: g.shortId,
    tool: g.tool,
    title: g.title,
    data: g.data,
    views: g.views,
    url: `${base}/s/${g.shortId}`,
    createdAt: g.createdAt,
  };
}

export { qrPayload };
export default r;

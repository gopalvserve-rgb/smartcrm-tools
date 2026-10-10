import { Router } from "express";
import { Generation } from "../models/index.js";

const r = Router();

// Public fetch of a saved creation by shortId (for /s/:id, /c/:id, /u/:id pages)
r.get("/:shortId", async (req, res) => {
  try {
    const gen = await Generation.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!gen) return res.status(404).json({ error: "Not found" });
    res.json({
      tool: gen.tool,
      title: gen.title,
      data: gen.data,
      views: gen.views,
      createdAt: gen.createdAt,
    });
  } catch {
    res.status(500).json({ error: "Error" });
  }
});

export default r;

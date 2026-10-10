import { Router } from "express";
import { Tool } from "../models/index.js";

const r = Router();

// Public list of live tools (for the hub)
r.get("/", async (_req, res) => {
  const tools = await Tool.find({ status: "live" }).sort({ order: 1 });
  res.json({ tools });
});

export default r;

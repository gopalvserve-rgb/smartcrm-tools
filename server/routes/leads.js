import { Router } from "express";
import { Lead } from "../models/index.js";
import { SMARTCRM_API_URL, SMARTCRM_API_KEY } from "../config.js";

const r = Router();

// Public: capture a lead from any tool
r.post("/", async (req, res) => {
  try {
    const { name, email, phone, sourceTool, note } = req.body || {};
    if (!name && !phone && !email)
      return res.status(400).json({ error: "Name and phone (or email) required" });
    const lead = await Lead.create({ name, email, phone, sourceTool, note });

    // Best-effort push to SmartCRM (non-blocking failure)
    if (SMARTCRM_API_URL && SMARTCRM_API_KEY) {
      pushToCrm(lead).catch(() => {});
    }
    res.json({ ok: true, id: lead._id });
  } catch {
    res.status(500).json({ error: "Could not save lead" });
  }
});

async function pushToCrm(lead) {
  try {
    const resp = await fetch(SMARTCRM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SMARTCRM_API_KEY}` },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        source: `tools:${lead.sourceTool || "hub"}`,
      }),
    });
    if (resp.ok) {
      lead.pushedToCrm = true;
      await lead.save();
    }
  } catch {
    /* ignore */
  }
}

export default r;

import { Router } from "express";
import bcrypt from "bcryptjs";
import { Admin, User, Lead, Generation, Tool } from "../models/index.js";
import { sign, requireAdmin } from "../middleware/auth.js";

const r = Router();

r.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body || {};
    email = (email || "").toLowerCase().trim();
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Wrong email or password" });
    const ok = await bcrypt.compare(password || "", admin.passwordHash);
    if (!ok) return res.status(401).json({ error: "Wrong email or password" });
    const token = sign({ kind: "admin", id: admin._id, role: admin.role });
    res.json({ token, admin: { name: admin.name, email: admin.email, role: admin.role } });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

r.get("/stats", requireAdmin, async (_req, res) => {
  const [tools, leads, users, gens] = await Promise.all([
    Tool.countDocuments({ status: "live" }),
    Lead.countDocuments(),
    User.countDocuments(),
    Generation.countDocuments(),
  ]);
  const proUsers = await User.countDocuments({ plan: "pro" });
  // per-tool usage
  const byTool = await Generation.aggregate([
    { $group: { _id: "$tool", uses: { $sum: 1 } } },
    { $sort: { uses: -1 } },
  ]);
  res.json({ stats: { tools, leads, users, proUsers, gens }, byTool });
});

r.get("/leads", requireAdmin, async (req, res) => {
  const items = await Lead.find().sort({ createdAt: -1 }).limit(200);
  res.json({ items });
});

r.get("/users", requireAdmin, async (_req, res) => {
  const items = await User.find().select("name email phone plan createdAt").sort({ createdAt: -1 }).limit(200);
  res.json({ items });
});

r.get("/tools", requireAdmin, async (_req, res) => {
  const items = await Tool.find().sort({ order: 1 });
  res.json({ items });
});

r.patch("/tools/:id", requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  const t = await Tool.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json({ tool: t });
});

export default r;

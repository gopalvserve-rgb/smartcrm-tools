import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { sign, requireUser } from "../middleware/auth.js";

const r = Router();

r.post("/signup", async (req, res) => {
  try {
    let { name, email, phone, password } = req.body || {};
    email = (email || "").toLowerCase().trim();
    if (!email || !password || password.length < 6)
      return res.status(400).json({ error: "Email and a 6+ char password are required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Account already exists — please log in" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash });
    const token = sign({ kind: "user", id: user._id, email: user.email });
    res.json({ token, user: safe(user) });
  } catch (e) {
    res.status(500).json({ error: "Could not create account" });
  }
});

r.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body || {};
    email = (email || "").toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Wrong email or password" });
    const ok = await bcrypt.compare(password || "", user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Wrong email or password" });
    const token = sign({ kind: "user", id: user._id, email: user.email });
    res.json({ token, user: safe(user) });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

r.get("/me", requireUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json({ user: safe(user) });
});

function safe(u) {
  return { id: u._id, name: u.name, email: u.email, phone: u.phone, plan: u.plan };
}

export default r;

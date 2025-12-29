import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });
    const emailNorm = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: emailNorm });
    if (existing) return res.status(409).json({ error: "Email already in use" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: emailNorm, password: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: user.toJSON() });
  } catch (e) {
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });
    const emailNorm = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: emailNorm });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: user.toJSON() });
  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;

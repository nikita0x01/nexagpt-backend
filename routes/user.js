import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Update user profile (name, password, avatar)
router.put("/user/update", auth, async (req, res) => {
  try {
    const { name, password, avatar } = req.body;
    const updates = {};
    if (typeof name === "string") updates.name = name;
    if (typeof avatar === "string") updates.avatar = avatar;
    if (typeof password === "string" && password.trim()) {
      updates.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: user.toJSON() });
  } catch (e) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;

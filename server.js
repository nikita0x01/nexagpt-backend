import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { getOpenAPIResponse } from "./utils/openai.js"; // fine to keep if used

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ 1. Middleware order matters
app.use(cors()); // use BEFORE routes
app.use(express.json());

// ✅ 2. Routes
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// ✅ 3. Connect DB before listening
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};

// ✅ 4. Start server after DB connection
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

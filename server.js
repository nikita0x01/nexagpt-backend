import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 8080;

/* -------------------- MONGOOSE CONFIG -------------------- */
mongoose.set("bufferCommands", false);

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working fine");
});

/* -------------------- START SERVER -------------------- */
const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

startServer();

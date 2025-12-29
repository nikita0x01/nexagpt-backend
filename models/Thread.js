import mongoose from "mongoose";

// ✅ Define message schema
const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // ✅ Don't call Date.now() — pass the function reference
  },
});

// ✅ Define thread schema
const ThreadSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    default: "New Chat", // ✅ Fixed typo ("defalut" → "default")
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now, // ✅ Fixed missing comma and syntax
  },
  updatedAt: {
    type: Date,
    default: Date.now, // ✅ Same fix
  },
});

// ✅ Automatically update `updatedAt` before saving
ThreadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Thread", ThreadSchema);

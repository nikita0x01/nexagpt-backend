import express from "express";
import Thread from "../models/Thread.js";
import { getOpenAPIResponse } from "../utils/openai.js";


const router = express.Router();

// TEST route
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "testing new thread2",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.error("error while routing", err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});

// GET all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error("error while routing", err);
    res.status(500).json({ error: "failed to get all threads" });
  }
});

// GET particular thread by ID
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.error("error while routing", err);
    res.status(500).json({ error: "failed to get thread" });
  }
});

// DELETE thread by ID
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (err) {
    console.error("error while routing", err);
    res.status(500).json({ error: "failed to delete thread" });
  }
});

// POST chat message
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // Create new thread if it doesn't exist
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.slice(0, 50), // limit title
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    // Get AI response
    const assistantReply = await getOpenAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantReply.replace(/\\/g, "") });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;

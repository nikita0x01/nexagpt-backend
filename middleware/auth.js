import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const parts = header.split(" ");
  const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

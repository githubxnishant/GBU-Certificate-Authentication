import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("JWT secret missing!");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};
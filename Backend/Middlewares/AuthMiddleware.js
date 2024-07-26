// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .send({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ error: "Invalid token. User not found." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;

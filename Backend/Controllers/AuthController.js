const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("Authorization header missing or invalid format");
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      console.log("User not found for ID:", decoded._id);
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user object to request
    req.user = user;
    console.log("User authenticated:", user.email);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

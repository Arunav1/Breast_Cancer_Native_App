const express = require("express");
const router = express.Router();
const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMid = require("../Middlewares/AuthMiddleware");

require("dotenv").config();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(422).send({ error: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).send({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ message: "User created successfully", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Login route:
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).send({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log("Generated Token:", token);
    res.send({ message: "Login successful", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;

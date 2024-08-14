const express = require("express");
const router = express.Router();
const LongTermSymptoms = require("../Models/LongTermSymptomsSchema");
const authMiddleware = require("../Middlewares/AuthMiddleware");

// Save Long-Term Symptoms
router.post("/LongTerm", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the auth middleware adds the user to req
    const symptomsData = { ...req.body, user: userId };

    const newSymptoms = new LongTermSymptoms(symptomsData);
    await newSymptoms.save();

    res.status(201).json({ message: "Long-term symptoms saved successfully." });
  } catch (error) {
    console.error("Error saving long-term symptoms data:", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PersonalMedicalHistory = require("../Models/PersonalMedicalHistory");
const authMiddleware = require("../Middlewares/AuthMiddleware");

router.post("/api/submit", authMiddleware, async (req, res) => {
  try {
    const { history } = req.body;

    // Log the received data for debugging
    console.log("Received Data:", JSON.stringify(req.body, null, 2));

    // Basic validation to check if history array is present
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Validate that all required fields in history are filled
    for (const section of history) {
      for (const question of section.questions) {
        if (question.answer === undefined || question.answer === null) {
          return res.status(400).json({
            message: `Missing answer for question: '${question.question}' in section: '${section.title}'`,
          });
        }
      }
    }

    const newEntry = new PersonalMedicalHistory({
      userId: req.user._id, // Use req.user._id from middleware
      history, // Assuming req.body contains the history array
    });

    await newEntry.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Data Submission Error:", error);
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
});

module.exports = router;

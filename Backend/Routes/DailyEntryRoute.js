const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DailyEntry = require("../Models/DailyEntrySchema");
const authMiddleware = require("../Middlewares/AuthMiddleware");

// POST route to save a daily entry
router.post("/daily-entry", authMiddleware, async (req, res) => {
  try {
    const {
      date,
      from,
      selectedPeriodDay,
      selectedPain,
      painLevel,
      selectedSide,
      selectedLeftLocations,
      selectedRightLocations,
    } = req.body;

    // Log the received data for debugging
    console.log("Received Data:", JSON.stringify(req.body, null, 2));

    // Basic validation to check if required fields are present
    if (
      !date ||
      !selectedPeriodDay ||
      !selectedPain ||
      (selectedPain === "Yes" &&
        (painLevel === undefined || selectedSide === undefined)) ||
      (selectedSide === "Left" && !selectedLeftLocations) ||
      (selectedSide === "Right" && !selectedRightLocations) ||
      (selectedSide === "Both" &&
        (!selectedLeftLocations || !selectedRightLocations))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data format or missing required fields" });
    }

    // Create a new entry
    const newEntry = new DailyEntry({
      user: req.user._id, // Include the authenticated user's ID
      date,
      from,
      selectedPeriodDay,
      selectedPain,
      painLevel,
      selectedSide,
      selectedLeftLocations: selectedLeftLocations || [], // Default to empty array if not provided
      selectedRightLocations: selectedRightLocations || [], // Default to empty array if not provided
    });

    // Save the entry to the database
    await newEntry.save();
    res.status(201).json({ message: "Daily entry saved successfully" });
  } catch (error) {
    console.error("Daily Entry Submission Error:", error);
    res
      .status(500)
      .json({ message: "Failed to save daily entry", error: error.message });
  }
});

router.get("/daily-entry", async (req, res) => {
  try {
    const painRecords = await DailyEntry.find({}).select("date painLevel");
    res.json(painRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

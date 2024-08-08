const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DailyEntry = require("../Models/DailyEntrySchema");
const authMiddleware = require("../Middlewares/AuthMiddleware");
const moment = require("moment-timezone");

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

    console.log("Received Data:", JSON.stringify(req.body, null, 2));

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

    const localDate = moment.tz(date, "Asia/Kolkata").format("YYYY-MM-DD");

    const newEntry = new DailyEntry({
      user: req.user._id,
      date: localDate,
      from,
      selectedPeriodDay,
      selectedPain,
      painLevel,
      selectedSide,
      selectedLeftLocations: selectedLeftLocations || [],
      selectedRightLocations: selectedRightLocations || [],
    });

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
    const { month, year } = req.query;

    let painRecords;
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      painRecords = await DailyEntry.find({
        date: { $gte: startDate, $lt: endDate },
      }).select("date painLevel");
    } else {
      painRecords = await DailyEntry.find({}).select("date painLevel");
    }

    const formattedRecords = painRecords.map((record) => ({
      date: moment(record.date).format("YYYY-MM-DD"),
      painLevel: record.painLevel,
    }));

    res.json(formattedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

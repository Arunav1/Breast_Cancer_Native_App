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
    const { duration, aggregate } = req.query; // 'aggregate' is an optional query parameter
    let startDate;

    switch (duration) {
      case "10days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 10);
        break;
      case "1month":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "6months":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "1year":
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = null;
    }

    const filter = startDate ? { date: { $gte: startDate } } : {};

    if (aggregate === "painLevels") {
      // Aggregating data for the pie chart
      const aggregatedData = await DailyEntry.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$painLevel", // Group by pain level
            count: { $sum: 1 }, // Count the number of occurrences
          },
        },
        {
          $project: {
            _id: 0,
            painLevel: "$_id",
            count: 1,
          },
        },
      ]).sort({ painLevel: 1 });

      return res.json(aggregatedData);
    } else {
      // Default data retrieval for line graph and heatmap
      const entries = await DailyEntry.find(filter).sort({ date: 1 });
      return res.json(entries);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

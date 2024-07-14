const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define a schema for the data
const personalMedicalHistorySchema = new mongoose.Schema(
  {
    data: Object,
  },
  { timestamps: true }
);

const PersonalMedicalHistory = mongoose.model(
  "PersonalMedicalHistory",
  personalMedicalHistorySchema
);

router.post("/api/submit", async (req, res) => {
  try {
    const newEntry = new PersonalMedicalHistory({
      data: req.body,
    });

    await newEntry.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save data", error });
  }
});

module.exports = router;

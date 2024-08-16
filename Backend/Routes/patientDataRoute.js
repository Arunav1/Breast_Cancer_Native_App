// Example route handler
const express = require("express");
const router = express.Router();
const AssociatedSymptoms = require("../Models/AssociatedSymptomsSchema");
const DailyEntry = require("../Models/DailyEntrySchema");
const LongTermSymptoms = require("../Models/LongTermSymptomsSchema");
const PersonalMedicalHistory = require("../Models/PersonalMedicalHistory");
const Users = require("../Models/Users");

router.get("/patient-data/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    console.log("Fetching data for user:", userId);

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User data:", user);

    // const user = await Users.findById(userId);
    const associatedSymptoms = await AssociatedSymptoms.find({ user: userId });
    const dailyEntries = await DailyEntry.find({ user: userId });
    const longTermSymptoms = await LongTermSymptoms.find({ user: userId });
    const personalMedicalHistory = await PersonalMedicalHistory.findOne({
      user: userId,
    });

    const patientData = {
      user,
      associatedSymptoms,
      dailyEntries,
      longTermSymptoms,
      personalMedicalHistory,
    };

    res.json(patientData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patient data" });
  }
});

module.exports = router;

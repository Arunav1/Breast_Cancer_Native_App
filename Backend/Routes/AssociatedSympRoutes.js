const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const AssociatedSymptoms = require("../Models/AssociatedSymptomsSchema");
const mongoose = require("mongoose");

router.post("/AssociatedSymptoms", AuthMiddleware, async (req, res) => {
  const symptomData = new AssociatedSymptoms({
    userId: req.user._id,
    ...req.body,
  });

  try {
    await symptomData.save();
    res.status(201).send(symptomData);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

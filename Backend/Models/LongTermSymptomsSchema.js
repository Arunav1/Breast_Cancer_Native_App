const mongoose = require("mongoose");
const User = require("./Users");

const longTermSymptomsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  haveLumps: {
    type: String,
    required: true,
  },
  lumpType: {
    type: [String],
    default: [],
  },
  changeInBreastSymmetry: {
    type: String,
    required: true,
  },
  haveBreastSymmetry: {
    type: String,
  },
  breastSizeChanged: {
    type: String,
    required: true,
  },
  breastSizeChangeSide: {
    type: String,
  },
  selectedLeftSize: {
    type: String,
  },
  selectedRightSize: {
    type: String,
  },
  haveSwelling: {
    type: String,
    required: true,
  },
  swellingCoverage: {
    type: String,
  },
  swellingInWhichBreastEB: {
    type: String,
  },
  swellingInWhichBreastPB: {
    type: String,
  },
  leftSwellingPositions: {
    type: [String],
    default: [],
  },
  rightSwellingPositions: {
    type: [String],
    default: [],
  },
  haveNippleChanges: {
    type: String,
    required: true,
  },
  haveNippleDischarge: {
    type: String,
  },
  haveUnusualNippleDischargeColor: {
    type: String,
  },
});

const LongTermSymptoms = mongoose.model(
  "LongTermSymptoms",
  longTermSymptomsSchema
);

module.exports = LongTermSymptoms;

const mongoose = require("mongoose");
const User = require("./Users");

const dailyEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  selectedPeriodDay: {
    type: String,
    required: true,
  },
  selectedPain: {
    type: String,
    required: true,
  },
  painLevel: {
    type: Number,
    required: function () {
      return this.selectedPain === "Yes";
    },
  },
  selectedSide: {
    type: String,
    required: function () {
      return this.selectedPain === "Yes";
    },
  },
  selectedLeftLocations: {
    type: [String],
    required: function () {
      return this.selectedSide === "Left" || this.selectedSide === "Both";
    },
  },
  selectedRightLocations: {
    type: [String],
    required: function () {
      return this.selectedSide === "Right" || this.selectedSide === "Both";
    },
  },
});

const DailyEntry = mongoose.model("DailyEntry", dailyEntrySchema);

module.exports = DailyEntry;

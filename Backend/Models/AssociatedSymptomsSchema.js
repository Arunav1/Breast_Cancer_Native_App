const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true },
  haveAssociatedSymptoms: { type: String, required: true },
  haveSwelling: { type: String, required: false },
  haveWhichBreastSwelling: { type: String, required: false },
  haveFatigue: { type: String, required: false },
  haveIrritation: { type: String, required: false },
  haveNippleInversion: { type: String, required: false },
  haveWhichNippleInversion: { type: String, required: false },
  haveWhichNippleInversionOnLeft: { type: String, required: false },
  haveWhichNippleInversionOnRight: { type: String, required: false },
  haveRashes: { type: String, required: false },
});

module.exports = mongoose.model("AssociatedSymptoms", SymptomSchema);

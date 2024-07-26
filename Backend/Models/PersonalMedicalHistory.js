const mongoose = require("mongoose");
const User = require("../Models/Users");

const questionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: null, // Allowing null or empty strings
  },
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionAnswerSchema],
});

const personalMedicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    history: [sectionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PersonalMedicalHistory",
  personalMedicalHistorySchema
);

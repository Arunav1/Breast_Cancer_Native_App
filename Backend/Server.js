const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/Auth");
const cors = require("cors");
const questRoutes = require("./Routes/QuestionRoutes");
const dailyEntryRoutes = require("./Routes/DailyEntryRoute");
const associatedSymptoms = require("./Routes/AssociatedSympRoutes");
const moment = require("moment-timezone");
const DailyEntry = require("./Models/DailyEntrySchema");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow all origins (not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/", questRoutes);
app.use("/", dailyEntryRoutes);
app.use("/", associatedSymptoms);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Database");

    // Normalize dates after connecting to the database
    normalizeDates()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.error("Error normalizing dates:", error);
      });
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

// Function to normalize dates in the database
async function normalizeDates() {
  try {
    const entries = await DailyEntry.find();
    const updatePromises = entries.map(async (entry) => {
      // Normalize the date
      const normalizedDate = moment(entry.date)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD");
      entry.date = normalizedDate;

      // Save the updated entry back to the database
      await entry.save();
    });

    await Promise.all(updatePromises);
    console.log("Date normalization complete");
  } catch (error) {
    console.error("Error normalizing dates:", error);
    throw error;
  }
}

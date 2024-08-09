const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/Auth");
const cors = require("cors");
const questRoutes = require("./Routes/QuestionRoutes");
const dailyEntryRoutes = require("./Routes/DailyEntryRoute");
const associatedSymptoms = require("./Routes/AssociatedSympRoutes");

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
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Connected to Database");
    });
  })
  .catch((error) => {
    console.error("Connection error", error);
  });

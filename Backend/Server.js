const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/Auth");
const cors = require("cors");
const questRoutes = require("./Routes/QuestionRoutes");
const dailyEntryRoutes = require("./Routes/DailyEntryRoute");
const associatedSymptoms = require("./Routes/AssociatedSympRoutes");
const LongTermSymptomsRoutes = require("./Routes/LongTermSympRoute");
const patientDataRoute = require("./Routes/patientDataRoute");
const { generateQRCode } = require("./Utility/qrCodeGenerator");

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

// Page Routes
app.use("/api/auth", authRoutes);
app.use("/", questRoutes);
app.use("/", dailyEntryRoutes);
app.use("/", associatedSymptoms);
app.use("/", LongTermSymptomsRoutes);

// For building the connection:
app.use("/", patientDataRoute);

app.get("/generate-qr-code/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    console.log("Generating QR Code for user:", userId);
    const qrCodeData = await generateQRCode(userId);

    res.json({ qrCodeData });
  } catch (error) {
    console.error("Error generating QR code", error);
    res.status(500).json({ error: "Error generating QR code" });
  }
});

//PORT Declaration:
const PORT = process.env.PORT || 3000;

//Connecting to MongoDB Database:
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

require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // For handling CORS
const bodyParser = require("body-parser");
const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticate } = require("./middleware/authMiddleware");

// Initialize app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (customize if needed)
app.use(bodyParser.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API. Endpoints are available at /auth and /products.");
});

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/products", authenticate, productRoutes); // Product routes with authentication middleware

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticate } = require("./middleware/authMiddleware");

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/products", authenticate, productRoutes); // Product routes with authentication middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

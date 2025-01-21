const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: true },
    netRate: { type: Number, required: true },
    mrp: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Product", productSchema);

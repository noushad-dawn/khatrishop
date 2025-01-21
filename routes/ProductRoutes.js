const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
} = require("../controller/productController");

const router = express.Router();

// POST route to create a product
router.post("/", createProduct);

// GET route to fetch all products
router.get("/", getAllProducts);

// DELETE route to delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;

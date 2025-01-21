const express = require("express");
const { register, login } = require("../controller/authController");

const router = express.Router();

// POST route to register a user
router.post("/register", register);

// POST route to login a user
router.post("/login", login);

module.exports = router;

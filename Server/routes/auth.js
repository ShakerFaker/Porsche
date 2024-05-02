const express = require("express");
const { register, registerAdmin, login } = require("../controllers/auth");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const admin = require("../models/Admin");
router.post("/register", register);
router.post("/registerAdmin", authenticateToken, registerAdmin);
router.post("/login", login);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const connectDB = require("./db");
const customer = require("./models/Customer");
const product = require("./models/Product");
const order = require("./models/Order");
const admin = require("./models/Admin");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cors = require("cors");
require("dotenv").config();
const SECRET_KEY = "your_secret_key"; // Change this to a secure secret key
const app = express();

app.use(cors());

app.use(express.json());


connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

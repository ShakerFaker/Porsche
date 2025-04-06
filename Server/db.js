const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
  }
};

module.exports = connectDB;

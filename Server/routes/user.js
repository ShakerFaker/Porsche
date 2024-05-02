const express = require("express");
const customer = require("../models/Customer");
const product = require("../models/Product");
const order = require("../models/Order");
const admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/auth");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY; // Change this to a secure secret key

const router = express.Router();




//SARA

// Admin Endpoints (requires JWT authentication with admin privileges)
router.post("/products", authenticateToken, async (req, res) => {
  // Admin only
  if (req.user.role === "admin") {
    //res.json({ message: "This is a private endpoint" });
    const newProduct = new product(req.body);
    try {
      const success = await product.create(newProduct);

      return res.status(201).send(success);
      // res.status(201).json(savedProduct);
    } catch (err) {
      res.status(400).json({ message: "Error creating product" });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

router.put("/products", authenticateToken, async (req, res) => {
  if (req.user.role === "admin") {
    const { _id, updates } = req.body; // Destructure body for productId and other updates

    if (!_id) {
      return res
        .status(400)
        .json({ message: "Missing product ID in request body" });
    }

    try {
      // Create an empty object to store allowed updates
      const allowedUpdates = {};

      // Loop through all properties in the remaining updates object
      for (const key in updates) {
        // Check if the property exists in the product schema (optional validation)
        if (product.schema.path(key)) {
          // You can implement validation here
          allowedUpdates[key] = updates[key];
        }
      }

      const updatedProduct = await product.findByIdAndUpdate(
        _id,
        allowedUpdates,
        { new: true } // Return the updated document
      );
      console.log(updatedProduct);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: "Error updating product" });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

router.delete("/products/:productId", authenticateToken, async (req, res) => {
  // Admin only
  if (req.user.role === "admin") {
    const productId = req.body.productId;
    try {
      const deletedProduct = await product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting product" });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

// END OF SARA PART
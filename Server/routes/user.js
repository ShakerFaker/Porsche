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

//SHAKER PART
router.post("/makeOrder", authenticateToken, async (req, res) => {
  if (req.user.role === "user") {
    try {
      //Check if customers exists
      const orderer = await customer.findOne({ _id: req.body.customerID });
      if (!orderer) return res.status(404).send({ message: "User not found" });
      //Loop on products to see whether they are available or not and calculate their combined price
      //Update the stock
      let sum = 0;
      for (let i = 0; i < req.body.products.length; i++) {
        const p = await product.findOne({ _id: req.body.products[i] });
        if (!p) res.status(404).send({ message: "Product not found" });
        if (p.Stock === 0)
          res.status(403).send({ message: `${p.Name} is out of stock` });
        p.Stock--;
        await p.save();
        sum += p.Price;
      }
      //Create new order record
      const newOrder = {
        customerID: req.body.customerID,
        products: req.body.products,
        total: sum,
        createdAt: new Date(),
        status: "Pending",
      };
      const success = await order.create(newOrder);
      orderer.Orders.push(success._id);
      await orderer
        .save()
        .then((c) => console.log(c.Orders[c.Orders.length - 1]))
        .catch((c) => console.log(error));
      return res.status(200).send(success);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

router.delete("/deleteOrder", authenticateToken, async (req, res) => {
  if (req.user.role === "user") {
    try {
      const target = await order.findOne({ _id: req.body.orderID });
      if (!target) return res.status(404).send({ message: "Order not found" });
      if (target.status !== "Pending")
        return res.status(403).send({ message: "Cannot delete order" });
      const orderer = await customer.findOne({ _id: req.body.customerID });
      let index = -1;
      for (let i = 0; i < orderer.Orders.length; i++)
        if (orderer.Orders[i] === req.body.orderID) {
          index = i;
          break;
        }
      if (index === -1)
        return res.status(403).send({ message: "Order not found" });
      orderer.Orders.splice(index, 1);
      await orderer.save();
      await order.deleteOne({ _id: target._id });
      return res.status(200).send({ message: "Order cancelled" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

router.get("/getOrder", async (req, res) => {
  try {
    const target = await order.findOne({ _id: req.body.orderID });
    if (!target) return res.status(404).send({ message: "Order not found" });
    //Should I check whether the customerId on the order matches the id of the get api caller
    const client = await customer.findOne({ _id: req.body.customerID });
    let found = false;
    for (let i = 0; i < client.Orders.length; i++)
      if (client.Orders[i] === req.body.orderID) {
        found = true;
        break;
      }
    return found
      ? res.status(200).send(target)
      : res.status(403).send({ message: "Unauthorized operation" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/getOrders", authenticateToken, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      // const client = await customer.findOne({_id: req.body.customerID});
      // const orders = client.Orders;
      // const content = [];
      // for(let i = 0; i < orders.length; i++){
      //     const o = await order.findOne({_id: orders[i]});
      //     if(!o)
      //         continue;
      //     content.push(o);
      // }
      const orders = await order.find();
      return res.status(200).send(orders);
    } catch (error) {
      console.log(error.mesage);
      return res.status(500).send({ message: error.message });
    }
  } else return res.status(403).send({ message: "Unauthorized operation" });
});

//END OF SHAKER PART

//NAGAR & MUHAMMAD

//Public APIs
//app.use(bodyParser.json());
// Endpoint to get all products
router.get("/Products", async (req, res) => {
  try {
    const products = await product.find().sort({ Name: 1 }); // Use Mongoose to find and sort
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Endpoint to search for products by name
router.get("/products/search", async (req, res) => {
  const { Name } = req.body; // Get name from query parameter

  if (!Name) {
    return res.status(400).json({ error: "Name parameter is required" });
  }

  try {
    const products = await product.find({ Name: Name }).sort({ Name: 1 }); // Use Mongoose to find and sort
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Endpoint to get details of a specific product by ID
router.get("/Products/:id", async (req, res) => {
  const id = req.body._id;

  try {
    const productDetails = await product.findById(id); // Use Mongoose to find by ID

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(productDetails);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch product details" });
  }
});
//END OF NAGAR & MUHAMMAD PART

module.exports = router;
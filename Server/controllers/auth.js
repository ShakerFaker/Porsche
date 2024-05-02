const jwt = require("jsonwebtoken");
const customer = require("../models/Customer");
const admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const name = req.body.Name;
    const email = req.body.Email;
    const password = req.body.Password;
    const phoneNumber = req.body["Phone number"];
    const address = req.body.Address;
    const existingUser = await customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCustomer = new customer({
      Name: name,
      Email: email,
      Password: hashedPassword,
      "Phone number": phoneNumber,
      Address: address,
    });
    const success = await newCustomer.save();
    return res.status(201).send(success);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const registerAdmin = async (req, res) => {

  if (req.user.role ==="admin"){

  try {
   
    const email = req.body.Email;
    const password  = req.body.Password;

    // Check if admin with the provided email already exists
    const existingAdmin = await admin.findOne({ Email: email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new admin({
      Email: email,
      Password: hashedPassword
    });
    const success = await newAdmin.save();
    return res.status(201).send(success);

  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  }
  else
  res.status(500).json({ message: "Not an admin" });

};



// Login endpoint
const login = async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    let role = "user";
    let user = await customer.findOne({ Email: email });
    console.log(email);
    console.log(user);
    if (!user) {
      user = await admin.findOne({ Email: email });
      role = "admin";
      console.log(user);
      if (!user) return res.status(401).json({ message: "Invalid username" });
    }
    const passwordMatch = await user.comparePassword(password);
    console.log(passwordMatch);
    if (passwordMatch) {
      //const accessToken = jwt.sign({ username: user.Email }, SECRET_KEY);
      const payload = { role: role };
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "wrong password" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, registerAdmin, login };

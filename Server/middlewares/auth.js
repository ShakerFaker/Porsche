const jwt = require("jsonwebtoken");
const customer = require("../models/Customer");
const admin = require("../models/Admin");

//Alaa

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    // req.user = user;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;

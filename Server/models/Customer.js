const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CustomerSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  "Phone number": {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    reqiured: true,
  },
  Orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  ],
});

// Hash the password before saving it to the database
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    this.Password = bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
CustomerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.Password);
};

module.exports = mongoose.model("Customer", CustomerSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = mongoose.Schema({
  Email: {
    type: String,
    required: false,
  },
  Password: {
    type: String,
    required: false,
  },
});

// Hash the password before saving it to the database
AdminSchema.pre("create", async function (next) {
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
AdminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.Password);
};

module.exports = mongoose.model("Admin", AdminSchema);

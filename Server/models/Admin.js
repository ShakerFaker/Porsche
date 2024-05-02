const mongoose = require("mongoose");

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

module.exports = mongoose.model("Admin", AdminSchema);

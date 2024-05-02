const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: false,
  },
  Password: {
    type: String,
    required: false,
  },
  "Phone number": {
    type: String,
    required: false,
  },
  Address: {
    type: String,
    reqiured: false,
  },
  Orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Customer", CustomerSchema);

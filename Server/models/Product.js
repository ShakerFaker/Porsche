const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  Price: {
    type: Number,
    required: false,
  },
  Description: {
    type: String,
    required: false,
  },
  Stock: {
    type: Number,
    required: false,
  },
  Category: {
    type: String,
    reqiured: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

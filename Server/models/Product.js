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
    type: Array,
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
  Images: {
    type: Array,
    required: false
  }
});

module.exports = {
  product: mongoose.model("Product", ProductSchema),
  productSchema: ProductSchema
};

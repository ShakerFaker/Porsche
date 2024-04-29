import mongoose from "mongoose";

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

export const product = mongoose.model("Product", ProductSchema);

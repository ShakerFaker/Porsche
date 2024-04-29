import mongoose from "mongoose";

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

export const admin = mongoose.model("Admin", AdminSchema);

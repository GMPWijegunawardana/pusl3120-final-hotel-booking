const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

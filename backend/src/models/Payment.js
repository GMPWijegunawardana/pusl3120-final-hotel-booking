const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["CARD", "CASH", "ONLINE"], default: "CARD" },
    paymentStatus: { type: String, enum: ["PAID", "NOT PAID"], default: "NOT PAID" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);

const Payment = require("../models/Payment");

// CREATE PAYMENT
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL PAYMENTS
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user")
      .populate("booking");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ PAYMENT BY ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user")
      .populate("booking");
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PAYMENT
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PAYMENT
exports.deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

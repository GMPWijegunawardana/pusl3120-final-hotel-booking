const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Room = require("../models/Room");
const Notification = require("../models/Notification");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    // Create the booking
    const booking = new Booking(req.body);
    await booking.save();

    // Get room details to calculate payment amount
    const room = await Room.findById(booking.room);
    
    if (room) {
      // Calculate total amount based on number of nights
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const totalAmount = room.price * nights;

      // Automatically create payment record
      const payment = new Payment({
        booking: booking._id,
        user: booking.user,
        amount: totalAmount,
        paymentMethod: "CARD", // Default payment method
        paymentStatus: "NOT PAID" // Default status
      });
      
      await payment.save();

      // Create notification for the user
      const notification = new Notification({
        user: booking.user,
        message: `Your booking has been confirmed! Check-in: ${checkIn.toLocaleDateString()}, Check-out: ${checkOut.toLocaleDateString()}. Total amount: LKR ${totalAmount.toLocaleString()}.`,
        type: "BOOKING",
        isRead: false
      });
      
      await notification.save();

      // Emit real-time notification via Socket.IO
      const io = req.app.get("io");
      if (io) {
        io.to(booking.user.toString()).emit("newNotification", {
          _id: notification._id,
          message: notification.message,
          type: notification.type,
          isRead: notification.isRead,
          createdAt: notification.createdAt
        });
      }
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ BOOKING BY ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("room");
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE BOOKING
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

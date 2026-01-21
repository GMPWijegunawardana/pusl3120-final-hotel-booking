const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(require("cors")());

// ROUTES

// Auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Users
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Rooms
const roomRoutes = require("./routes/roomRoutes");
app.use("/api/rooms", roomRoutes);

// Bookings
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// Payments
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// Notifications
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

// Reviews / Feedback
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

// Contact Us
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hotel Booking Backend is running");
});

// EXPORT APP
module.exports = app;

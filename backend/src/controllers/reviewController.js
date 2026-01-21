const Review = require("../models/Review");

// Create a review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    const populatedReview = await Review.findById(review._id)
      .populate('user')
      .populate('booking')
      .populate('room');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user')
      .populate('booking')
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a specific booking
exports.getReviewsByBooking = async (req, res) => {
  try {
    const review = await Review.findOne({ booking: req.params.bookingId })
      .populate('user')
      .populate('booking')
      .populate('room');
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews by user
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('user')
      .populate('booking')
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

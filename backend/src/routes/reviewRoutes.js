const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewsByBooking,
  getReviewsByUser,
  deleteReview
} = require("../controllers/reviewController");

// CREATE review
router.post("/", createReview);

// GET all reviews
router.get("/", getReviews);

// GET reviews for a specific booking
router.get("/booking/:bookingId", getReviewsByBooking);

// GET reviews by user
router.get("/user/:userId", getReviewsByUser);

// DELETE review
router.delete("/:id", deleteReview);

module.exports = router;

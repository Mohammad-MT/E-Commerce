import { Review, reviewValidationSchema } from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const { error, value } = reviewValidationSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userInfo = req.user;

    const newReview = new Review({
      userId: userInfo._id,
      productId: value.productId,
      rating: value.rating,
      comment: value.comment,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.log("Error in createReview review.controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    console.log("Error in getReviews review.controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.log("Error in getReviewById review.controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { error, value } = reviewValidationSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.productId = value.productId;
    review.rating = value.rating;
    review.comment = value.comment;

    await review.save();
    res.json(review);
  } catch (error) {
    console.log("Error in updateReview review.controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.remove();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error in deleteReview review.controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

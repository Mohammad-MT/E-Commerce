import { Review, addReviewValidationSchema } from "../models/review.model.js";
import { User } from "../models/user.model.js";

export const createReview = async (req, res) => {
  
    const { error, value } = addReviewValidationSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //every user can only review once
    const existingReview = await Review.findOne({
      productId: value.productId,
      "userInfo.id": req.user._id,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const { _id } = req.user;
    const userInfo = await User.findOne({ _id });

    const newReview = new Review({
      userInfo: {
        id: _id,
        username: userInfo.username,
        email: userInfo.email,
        profilePic: userInfo.profilePic,
      },
      productId: value.productId,
      rating: value.rating,
      comment: value.comment,
    });
    await newReview.save();
    res.status(201).json(newReview);
  
};

export const getProductReviews = async (req, res) => {
 
    const review = await Review.find({ productId: req.params.productId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  
};

export const updateReview = async (req, res) => {
  
    const { error, value } = addReviewValidationSchema(req.body);
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
  
};

export const deleteReview = async (req, res) => {
 
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  
};

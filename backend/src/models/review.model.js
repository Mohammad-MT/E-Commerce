import mongoose from "mongoose";
import Joi from "joi";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true },
    comment: { type: String, max: 1000 },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

export const reviewValidationSchema = (newReview) => {
  const schema = Joi.object({
    productId: Joi.string().required().messages({
      "any.required": "Product ID is required",
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "any.required": "Rating is required",
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating must be at most 5",
    }),
    comment: Joi.string().max(1000).optional().messages({
      "string.max": "Comment must be at most 1000 characters",
    }),
  });

  return schema.validate(newReview);
};

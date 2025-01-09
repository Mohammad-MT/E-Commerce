import mongoose from "mongoose";

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
    comment: { type: String },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

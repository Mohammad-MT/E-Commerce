import mongoose from "mongoose";
import Joi from "joi";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    // shippingAddress: {
    //   line1: { type: String, required: true },
    //   city: { type: String, required: true },
    //   state: { type: String, required: true },
    //   zip: { type: String, required: true },
    //   country: { type: String, required: true },
    // },
    // paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);


export const validateOrders = (order) => {
  const schema = Joi.object({
    // userId: Joi.string().required().messages({
    //   "any.required": "User ID is required.",
    //   "string.empty": "User ID cannot be empty.",
    // }),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required().messages({
            "any.required": "Product ID is required.",
            "string.empty": "Product ID cannot be empty.",
          }),
          quantity: Joi.number().greater(0).required().messages({
            "any.required": "Quantity is required.",
            "number.greater": "Quantity must be greater than 0.",
          }),
          price: Joi.number().greater(0).required().messages({
            "any.required": "Price is required.",
            "number.greater": "Price must be greater than 0.",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "At least one item is required in the order.",
        "any.required": "Items are required.",
      }),
    totalAmount: Joi.number().greater(0).required().messages({
      "any.required": "Total amount is required.",
      "number.greater": "Total amount must be greater than 0.",
    }),
    status: Joi.string().valid("Pending", "Completed", "Cancelled").default("Pending"),
  });

  return schema.validate(order, { abortEarly: false });
};

export const Order = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema(
  {
    userInfo: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
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

const validateOrders = (order) => {
  const schema = Joi.object({
    userInfo: Joi.object({
      _id: Joi.string().required().messages({
        "any.required": "User ID is required.",
        "string.empty": "User ID cannot be empty.",
      }),
      name: Joi.string().required().messages({
        "any.required": "User name is required.",
        "string.empty": "User name cannot be empty.",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "User email is required.",
        "string.email": "User email must be a valid email address.",
        "string.empty": "User email cannot be empty.",
      }),
    })
      .required()
      .messages({
        "any.required": "User information is required.",
      }),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required().messages({
            "any.required": "Product ID is required.",
            "string.empty": "Product ID cannot be empty.",
          }),
          name: Joi.string().required().messages({
            "any.required": "Product name is required.",
            "string.empty": "Product name cannot be empty.",
          }),
          quantity: Joi.number().greater(0).required().messages({
            "any.required": "Quantity is required.",
            "number.greater": "Quantity must be greater than 0.",
          }),
          price: Joi.number().greater(0).required().messages({
            "any.required": "Price is required.",
            "number.greater": "Price must be greater than 0.",
          }),
          finalPrice: Joi.number().greater(0).required().messages({
            "any.required": "finalPrice is required.",
            "number.greater": "finalPrice must be greater than 0.",
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
    status: Joi.string()
      .valid("Pending", "Completed", "Cancelled")
      .default("Pending"),
  });

  return schema.validate(order, { abortEarly: false });
};

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  validateOrders,
};

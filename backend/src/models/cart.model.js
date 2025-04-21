const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema(
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
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .required(),
  });

  return schema.validate(cart);
};

module.exports = { Cart, validateCart };

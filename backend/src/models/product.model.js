import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    disc: {
      type: String,
      required: true,
    },
    pic: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

export const productValidationSchema = (newUser) => {
  const schema = Joi.object({
    name: Joi.string().max(80).required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    price: Joi.number().positive().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
      "number.positive": "Price must be a positive number",
    }),
    disc: Joi.string().max(1000).required().messages({
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),
    pic: Joi.array()
      .items(
        Joi.string().uri().messages({
          "string.uri": "Each picture must be a valid URL",
        })
      )
      .optional(),
  });
  return schema.validate(newUser);
};

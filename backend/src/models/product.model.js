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
    description: {
      type: String,
      required: true,
    },
    category: { type: String },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

export const productValidationSchema = (newProduct) => {
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
    description: Joi.string().max(1000).required().messages({
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),
    category: Joi.string().optional().messages({
      "string.base": "Category must be a valid ID",
    }),
    stock: Joi.number().integer().min(0).required().messages({
      "any.required": "Stock is required",
      "number.base": "Stock must be a number",
      "number.integer": "Stock must be an integer",
      "number.min": "Stock cannot be negative",
    }),
    images: Joi.array()
      .items(
        Joi.string().uri().messages({
          "string.uri": "Each picture must be a valid URL",
        })
      )
      .optional(),
  });
  return schema.validate(newProduct);
};
export const productValidationSchemaForEdit = (newProduct) => {
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
    stock: Joi.number().integer().min(0).required().messages({
      "any.required": "Stock is required",
      "number.base": "Stock must be a number",
      "number.integer": "Stock must be an integer",
      "number.min": "Stock cannot be negative",
    }),
    
  });
  return schema.validate(newProduct);
};

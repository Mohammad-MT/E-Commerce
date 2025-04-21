const mongoose = require("mongoose");
const Joi = require("joi");

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
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    images: {
      type: [String],
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    }, // Discount type
    discountValue: { type: Number, default: 0 }, // Discount amount (percentage or fixed)
    finalPrice: { type: Number }, // Price after discount
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.discountType === "percentage") {
    this.finalPrice = this.price - (this.price * this.discountValue) / 100;
  } else if (this.discountType === "fixed") {
    this.finalPrice = Math.max(this.price - this.discountValue, 0);
  } else {
    this.finalPrice = this.price;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

const productValidationSchema = (newProduct) => {
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

const productValidationSchemaForEdit = (newProduct) => {
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
    discountValue: Joi.number().min(0).optional().messages({
      "number.base": "Discount value must be a number",
      "number.min": "Discount value cannot be negative",
    }),
    discountType: Joi.string()
      .valid("percentage", "fixed")
      .optional()
      .messages({
        "any.only": "Discount type must be either 'percentage' or 'fixed'",
      }),
  });
  return schema.validate(newProduct);
};

module.exports = {
  Product,
  productValidationSchema,
  productValidationSchemaForEdit,
};

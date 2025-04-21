const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "customer",
    },
    address: [
      {
        line1: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    ],
    phone: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const loginValidation = (newUser) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password should be at least 6 characters long",
      "any.required": "Password is required",
    }),
  });

  return schema.validate(newUser);
};

const singupValidation = (newUser) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    fullname: Joi.string().required().messages({
      "any.required": "Full name is required",
    }),
    username: Joi.string().required().messages({
      "any.required": "Username is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password should be at least 6 characters long",
      "any.required": "Password is required",
    }),
  });
  return schema.validate(newUser);
};

module.exports = {
  User,
  loginValidation,
  singupValidation,
};

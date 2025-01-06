import mongoose from "mongoose";
import { z } from "zod";

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
      types: [String],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

export const productValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  price: z.number().positive("Price must be a positive number"),
  disc: z.string().nonempty("Description is required"),
  pic: z.array(z.string().url("Each picture must be a valid URL")).optional(),
});

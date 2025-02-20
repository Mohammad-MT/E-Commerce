import { Category } from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length >= 1) {
      return res.json({ categories });
    }

    res.status(404).json({ message: "categories not found!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log("Error in getAllCategories category.controller", error.message);
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ message: "Category name field is required!" });

    const newCategory = new Category({
      name: name,
    });

    if (newCategory) {
      await newCategory.save();
      return res.status(201).json({ message: "new category created" });
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    res.status(404).json({ message: "categories not found!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log("Error in addNewCategory category.controller", error.message);
  }
};

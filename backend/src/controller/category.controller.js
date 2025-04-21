const { Category } = require("../models/category.model.js");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();

  if (categories.length >= 1) {
    return res.json({ categories });
  }

  res.status(404).json({ message: "categories not found!" });
};

const addNewCategory = async (req, res) => {
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
};

module.exports = { getAllCategories, addNewCategory };

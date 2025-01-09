import { Product, productValidationSchema } from "../models/product.model.js";

export const showAll = async (req, res) => {
  try {
    const allProduct = await Product.find();

    if (allProduct.length > 0) return res.status(200).json(allProduct);

    res.status(404).json({ message: "No product provided!" });
  } catch (error) {
    console.log("Error in showAll product.controller", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log("Error in getProductById product.controller", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    //validation
    const { value, error } = productValidationSchema(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // check is product name is exist
    // const isExist = await Product.find({ name: value.name });
    // if (isExist.length > 0)
    //   return res.status(400).json({ message: "this product already exist" });

    //addnew Product
    const newProduct = new Product({
      name: value.name,
      price: value.price,
      description: value.description,
      category: value.category,
      stock: value.stock,
      images: value.images || "",
    });

    await newProduct.save();

    res.status(201).json({
      message: "new product added successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error in addnewProduct product.controller", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //remove by id
    const result = await Product.findByIdAndDelete(id, { context: true });

    //if isn't exist
    if (!result)
      return res
        .status(404)
        .json({ message: "selected product dosen't exist! " });

    res.status(200).json({ message: "selected product remove successfully." });
  } catch (error) {
    console.log("Error in removeProductById product.controller", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    //validation
    const { value, error } = productValidationSchema(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

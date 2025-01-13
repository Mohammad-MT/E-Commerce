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

// Get Paginated Products
export const getPaginatedProducts = async (req, res) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;

    // Get total document count
    const total = await Product.countDocuments();

    // Fetch paginated data
    const products = await Product.find().skip(skip).limit(limit);

    // Response with pagination metadata
    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
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

// ** Extend Pagination with Filters and Sorting **

// exports.getPaginatedProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Optional filters (e.g., category, price range)
//     const filters = {};
//     if (req.query.category) {
//       filters.category = req.query.category;
//     }
//     if (req.query.minPrice && req.query.maxPrice) {
//       filters.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
//     }

//     // Optional sorting (e.g., by price or name)
//     const sort = {};
//     if (req.query.sortBy) {
//       sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
//     }

//     // Get total count with filters
//     const total = await Product.countDocuments(filters);

//     // Fetch filtered, sorted, and paginated data
//     const products = await Product.find(filters)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

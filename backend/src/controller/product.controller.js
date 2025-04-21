const {
  Product,
  productValidationSchemaForEdit,
  productValidationSchema,
} = require("../models/product.model.js");

const getSortedPaginatedProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Optional filters (e.g., category, price range)
  let filters = {};
  if (req.query.category) {
    filters = { ...filters, category: req.query.category };
  }
  if (req.query.minPrice && req.query.maxPrice) {
    filters = {
      ...filters,
      price: {
        $gte: parseInt(req.query.minPrice),
        $lte: parseInt(req.query.maxPrice),
      },
    };
  }
  if (req.query.search) {
    filters = {
      ...filters,
      name: { $regex: req.query.search, $options: "i" },
    };
    // Search by name (case-insensitive)
  }

  // Optional sorting (e.g., by price or name)
  const sort = {};
  if (req.query.sortBy) {
    sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
  }

  // Get total count with filters
  const total = await Product.countDocuments(filters);

  // Fetch filtered, sorted, and paginated data
  const products = await Product.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: products,
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.json({
    data: products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  //validation
  const { value, error } = productValidationSchema(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

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
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  //remove by id
  const result = await Product.findByIdAndDelete(id, { context: true });

  //if isn't exist
  if (!result)
    return res
      .status(404)
      .json({ message: "selected product dosen't exist! " });

  res.status(200).json({ message: "selected product remove successfully." });
};

const updateProduct = async (req, res) => {
  //validation
  const { value, error } = productValidationSchemaForEdit(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = value.name;
  product.price = value.price;
  product.stock = value.stock;
  product.discountValue = value.discountValue;
  product.discountType = "percentage";

  await product.save();

  res.json({ message: "Product updated successfully", product });
};

const uploadProductImage = async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ imageUrl: req.file.path }); //cloudinary image url
};

//admin route access *
const applyDiscountToProduct = async (req, res) => {
  const { discountType, discountValue } = req.body;

  const product = await Product.findById(req.params.productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.discountType = discountType;
  product.discountValue = discountValue;

  await product.save();
  res
    .status(200)
    .json({ message: "Discount applied successfully", data: product });
};

const getDiscountedProducts = async (req, res) => {
  const discountedProducts = await Product.find({
    discountType: { $exists: true },
    discountValue: { $gt: 0 },
  }).sort({ updatedAt: -1 });

  if (discountedProducts.length === 0) {
    return res.status(404).json({ message: "No discounted products found" });
  }

  res.json({ data: discountedProducts });
};

module.exports = {
  getSortedPaginatedProducts,
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImage,
  applyDiscountToProduct,
  getDiscountedProducts,
};

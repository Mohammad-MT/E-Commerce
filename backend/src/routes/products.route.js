const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getSortedPaginatedProducts,
  getAllProducts,
  getDiscountedProducts,
  uploadProductImage,
  applyDiscountToProduct,
} = require("../controller/product.controller.js");
const protectRoute = require("../middleware/protectRoute.js");
const authorizeRole = require("../middleware/authorizeRole.js");
const upload = require("../middleware/uploadImg.js");
const asyncMiddleware = require("../middleware/async.js");

const router = express.Router();

router.get("/paginated", asyncMiddleware(getSortedPaginatedProducts));
router.get("/", asyncMiddleware(getAllProducts));
router.get("/:id", asyncMiddleware(getProductById));
router.get("/discount/limitoffer", asyncMiddleware(getDiscountedProducts));

//admin routes
router.post(
  "/",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(createProduct)
);
router.put(
  "/:id",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(updateProduct)
);
router.delete(
  "/:id",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(deleteProduct)
);
router.post(
  "/uploadImage",
  protectRoute,
  authorizeRole("admin"),
  upload.single("productImage"),
  asyncMiddleware(uploadProductImage)
);
router.post(
  "/discount/:productId",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(applyDiscountToProduct)
);

module.exports = router;

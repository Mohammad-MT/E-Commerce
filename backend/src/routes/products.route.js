import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getSortedPaginatedProducts,
  getAllProducts,
  getDiscountedProducts,
  uploadProductImage,
  applyDiscountToProduct,
} from "../controller/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";
import upload from "../middleware/uploadImg.js";
import asyncMiddleware from "../middleware/async.js";

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

export default router;

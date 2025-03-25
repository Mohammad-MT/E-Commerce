import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getSortedPaginatedProducts,
  getAllProducts,
  uploadProductImage,
} from "../controller/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";
import upload from "../middleware/uploadImg.js";

const router = express.Router();

router.get("/paginated", getSortedPaginatedProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, authorizeRole("admin"), createProduct);
router.put("/:id", protectRoute, authorizeRole("admin"), updateProduct);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteProduct);

router.post(
  "/uploadImage",
  protectRoute,
  authorizeRole("admin"),
  upload.single("productImage"),
  uploadProductImage
);

export default router;

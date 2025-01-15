import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getSortedPaginatedProducts,
} from "../controller/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/paginated", getSortedPaginatedProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, authorizeRole("admin"), createProduct);
router.put("/:id", protectRoute, authorizeRole("admin"), updateProduct);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteProduct);

export default router;

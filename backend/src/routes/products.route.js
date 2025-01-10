import express from "express";
import {
  showAll,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getPaginatedProducts,
} from "../controller/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/", showAll);
router.get("/paginated", getPaginatedProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, authorizeRole("admin"), createProduct);
router.put("/:id", protectRoute, authorizeRole("admin"), updateProduct);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteProduct);

export default router;

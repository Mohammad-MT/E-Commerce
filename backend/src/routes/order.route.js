import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  // getOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controller/order.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/my-orders", protectRoute, getUserOrders);
router.get("/", protectRoute, authorizeRole("admin"), getAllOrders);
// router.get("/:id", protectRoute, authorizeRole("admin"), getOrder);
router.put("/:id", protectRoute, authorizeRole("admin"), updateOrderStatus);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteOrder);

export default router;

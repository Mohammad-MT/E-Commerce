import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controller/order.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, authorizeRole("admin"), getAllOrders);
router.get("/my-orders", protectRoute, getUserOrders);

export default router;

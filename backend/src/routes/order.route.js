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

import asyncMiddleware from "../middleware/async.js"

const router = express.Router();

router.post("/", asyncMiddleware(protectRoute), asyncMiddleware(createOrder));
router.get("/my-orders", asyncMiddleware(protectRoute), asyncMiddleware(getUserOrders));
router.get("/", asyncMiddleware(protectRoute), authorizeRole("admin"), asyncMiddleware(getAllOrders));
// router.get("/:id", asyncMiddleware(protectRoute), authorizeRole("admin"), asyncMiddleware(getOrder));
router.put("/:id", asyncMiddleware(protectRoute), authorizeRole("admin"), asyncMiddleware(updateOrderStatus));
router.delete("/:id", asyncMiddleware(protectRoute), authorizeRole("admin"), (deleteOrder));

export default router;

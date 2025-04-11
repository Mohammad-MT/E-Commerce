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

import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

router.post("/", protectRoute, asyncMiddleware(createOrder));
router.get("/my-orders", protectRoute, asyncMiddleware(getUserOrders));
router.get(
  "/",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(getAllOrders)
);
// router.get("/:id", protectRoute, authorizeRole("admin"), asyncMiddleware(getOrder));
router.put(
  "/:id",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(updateOrderStatus)
);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteOrder);

export default router;

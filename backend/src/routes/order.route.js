const express = require("express");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  // getOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/order.controller.js");
const protectRoute = require("../middleware/protectRoute.js");
const authorizeRole = require("../middleware/authorizeRole.js");

const asyncMiddleware = require("../middleware/async.js");

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

module.exports = router;

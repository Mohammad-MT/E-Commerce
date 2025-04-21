const express = require("express");

const {
  getCart,
  updateCart,
  clearCart,
} = require("../controller/cart.controller.js");
const protectRoute = require("../middleware/protectRoute.js");
const asyncMiddleware = require("../middleware/async.js");

const router = express.Router();

router.get("/", protectRoute, asyncMiddleware(getCart));
router.post("/", protectRoute, asyncMiddleware(updateCart));
router.delete("/", protectRoute, asyncMiddleware(clearCart));

module.exports = router;

import express from "express";

import {
  getCart,
  updateCart,
  clearCart,
} from "../controller/cart.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/", protectRoute, updateCart);
router.delete("/", protectRoute, clearCart);

export default router;

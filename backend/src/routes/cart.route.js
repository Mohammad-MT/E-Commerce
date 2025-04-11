import express from "express";

import {
  getCart,
  updateCart,
  clearCart,
} from "../controller/cart.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

router.get("/", asyncMiddleware(protectRoute), asyncMiddleware(getCart));
router.post("/", asyncMiddleware(protectRoute), asyncMiddleware(updateCart));
router.delete("/", asyncMiddleware(protectRoute), asyncMiddleware(clearCart));

export default router;

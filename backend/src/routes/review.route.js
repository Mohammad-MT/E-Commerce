import express from "express";

import {
  createReview,
  getProductReviews,
  deleteReview,
  updateReview,
} from "../controller/review.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/", protectRoute, createReview);
router.get("/:productId", getProductReviews);
router.put("/:id", protectRoute, authorizeRole("admin"), updateReview);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteReview);

export default router;

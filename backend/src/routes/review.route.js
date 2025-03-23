import express from "express";

import {
  createReview,
  getReviews,
  getReviewById,
  deleteReview,
  updateReview,
} from "../controller/review.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.post("/", protectRoute, createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.put("/:id", protectRoute, authorizeRole("admin"), updateReview);
router.delete("/:id", protectRoute, authorizeRole("admin"), deleteReview);

export default router;

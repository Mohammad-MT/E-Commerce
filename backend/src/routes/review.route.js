import express from "express";

import {
  createReview,
  getProductReviews,
  deleteReview,
  updateReview,
} from "../controller/review.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

router.post("/", protectRoute, asyncMiddleware(createReview));
router.get("/:productId", asyncMiddleware(getProductReviews));
router.put(
  "/:id",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(updateReview)
);
router.delete(
  "/:id",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(deleteReview)
);

export default router;

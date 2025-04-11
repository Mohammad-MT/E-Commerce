import express from "express";

import {
  createReview,
  getProductReviews,
  deleteReview,
  updateReview,
} from "../controller/review.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

import asyncMiddleware from "../middleware/async.js"

const router = express.Router();

router.post("/", asyncMiddleware(protectRoute), asyncMiddleware(createReview));
router.get("/:productId", asyncMiddleware(getProductReviews));
router.put("/:id", asyncMiddleware(protectRoute), authorizeRole("admin"), asyncMiddleware(updateReview));
router.delete("/:id", asyncMiddleware(protectRoute), authorizeRole("admin"), asyncMiddleware(deleteReview));

export default router;

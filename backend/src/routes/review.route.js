const express = require("express");

const {
  createReview,
  getProductReviews,
  deleteReview,
  updateReview,
} = require("../controller/review.controller.js");

const protectRoute = require("../middleware/protectRoute.js");
const authorizeRole = require("../middleware/authorizeRole.js");

const asyncMiddleware = require("../middleware/async.js");

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

module.exports = router;

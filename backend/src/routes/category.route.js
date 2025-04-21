const express = require("express");
const {
  addNewCategory,
  getAllCategories,
} = require("../controller/category.controller.js");
const protectRoute = require("../middleware/protectRoute.js");
const authorizeRole = require("../middleware/authorizeRole.js");
const asyncMiddleware = require("../middleware/async.js");

const router = express.Router();

router.get("/getall", asyncMiddleware(getAllCategories));
router.post(
  "/add",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(addNewCategory)
);

module.exports = router;

import express from "express";
import {
  addNewCategory,
  getAllCategories,
} from "../controller/category.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

router.get("/getall", asyncMiddleware(getAllCategories));
router.post(
  "/add",
  protectRoute,
  authorizeRole("admin"),
  asyncMiddleware(addNewCategory)
);

export default router;

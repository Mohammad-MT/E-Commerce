import express from "express";
import {
  addNewCategory,
  getAllCategories,
} from "../controller/category.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/getall", getAllCategories);
router.post("/add", protectRoute, authorizeRole("admin"), addNewCategory);

export default router;

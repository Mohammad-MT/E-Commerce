import express from "express";
import { showAll, addNewProduct, removeProductById } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", showAll);
router.post("/addnew", addNewProduct);
router.post("/remove/:id", removeProductById);

export default router;

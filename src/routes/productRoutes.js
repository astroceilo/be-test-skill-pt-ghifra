import express from "express";
import {
  scrapeProducts,
  fetchApiProducts,
  getProducts
} from "../controllers/productController.js";

const router = express.Router();

router.get("/scrape", scrapeProducts);
router.get("/fetch-api", fetchApiProducts);
router.get("/products", getProducts);

export default router;
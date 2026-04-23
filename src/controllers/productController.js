import { scrapeBooks } from "../scraper/bookScraper.js";
import { fetchProductsAPI } from "../services/apiService.js";
import {
  insertProducts,
  deleteBySource,
  getProductsQuery
} from "../services/productService.js";

export const scrapeProducts = async (req, res) => {
  try {
    const data = await scrapeBooks();

    await deleteBySource("scraping");
    insertProducts(data);

    res.json({
      message: "Data scraped successfully",
      total: data.length
    });
  } catch (err) {
    res.status(500).json({ message: "Scraping failed" });
  }
};

export const fetchApiProducts = async (req, res) => {
  try {
    const data = await fetchProductsAPI();

    await deleteBySource("api");
    insertProducts(data);

    res.json({
      message: "API data stored successfully",
      total: data.length
    });
  } catch (err) {
    res.status(500).json({ message: "API fetch failed" });
  }
};

export const getProducts = (req, res) => {
  getProductsQuery(req.query, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(rows);
  });
};
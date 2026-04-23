import express from "express";
import { scrapeBooks } from "./scraper/bookScraper.js";
import { insertProducts } from "./services/productService.js";
import { fetchProductsAPI } from "./services/apiService.js";

import db from "./db.js";

// (async () => {
//   const data = await scrapeBooks();
//   console.log(data);
// })();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/scrape", async (req, res) => {
    try {
        const data = await scrapeBooks();

        // Insert data into the database
        insertProducts(data);

        res.json({
            message: "Data scraped and stored successfully",
            total: data.length
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape data" });
    }
});

app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products" });
    }

    res.json(rows);
  });
});

app.get("/fetch-api/products", async (req, res) => {
  try {
    const data = await fetchProductsAPI();

    // Insert data into the database
    insertProducts(data);

    res.json({
      message: "Data fetched from API and stored successfully",
      total: data.length
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products from API" });
  }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
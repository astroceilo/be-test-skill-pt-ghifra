import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeBooks = async () => {
  const books = [];

  const totalPages = 5; // total pages to scrape

  for (let page = 1; page <= totalPages; page++) {
    const url =
      page === 1
        ? "https://books.toscrape.com/"
        : `https://books.toscrape.com/catalogue/page-${page}.html`;

    console.log("Scraping:", url);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".product_pod").each((i, el) => {
      // extract name
      const name = $(el).find("h3 a").attr("title");

      // extract price
      const priceText = $(el).find(".price_color").text();
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

      // extract rating
      const ratingClass = $(el).find(".star-rating").attr("class");
      const ratingText = ratingClass.split(" ")[1];

      const ratingMap = {
        One: 1,
        Two: 2,
        Three: 3,
        Four: 4,
        Five: 5,
      };

      const rating = ratingMap[ratingText] || 0;

      books.push({
        name,
        price,
        rating,
        source: "scraping",
        created_at: new Date(),
      });
    });
  }

  return books;
};
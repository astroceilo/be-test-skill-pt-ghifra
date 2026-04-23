import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeBooks = async () => {
  const url = "https://books.toscrape.com/";

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const books = [];

  $(".product_pod").each((i, el) => {
    // name
    const name = $(el).find("h3 a").attr("title");

    // price
    const priceText = $(el).find(".price_color").text();
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    // rating (convert text → number)
    const ratingClass = $(el).find(".star-rating").attr("class");
    
    const ratingMap = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5
    };

    const ratingText = ratingClass.split(" ")[1];
    const rating = ratingMap[ratingText] || 0;

    books.push({
      name,
      price,
      rating,
      source: "scraping",
      created_at: new Date()
    });
  });

  return books;
};
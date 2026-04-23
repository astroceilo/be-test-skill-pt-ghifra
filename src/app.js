import { scrapeBooks } from "./scraper/bookScraper.js";

(async () => {
  const data = await scrapeBooks();
  console.log(data);
})();

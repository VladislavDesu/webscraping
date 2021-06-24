const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
   const browser = await puppeteer.launch({
      headless: false,
   });
   const page = await browser.newPage();
   await page.goto("https://coinmarketcap.com/");
   await page.waitForTimeout(5000);
   const html = await page.evaluate(
      () => document.querySelector(".cmc-table").innerHTML
   );

   const $ = cheerio.load(html);
   const prices = [];

   $("div a.cmc-link").each((i, elem) => {
      prices.push($(elem).text());
   });

   console.log(prices);
})();

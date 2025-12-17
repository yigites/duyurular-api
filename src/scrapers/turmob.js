import axios from "axios";
import { load } from "cheerio";
import { toIsoDateFromDotNotation } from "../utils/date.js";

const BASE_URL = "https://www.turmob.org.tr";
const DUYURU_PATH = "/Haberler";
const CATEGORY_LABEL = "TURMOB Haberler";

export async function scrapeTurmob() {
  const response = await axios.get(`${BASE_URL}${DUYURU_PATH}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml"
    }
  });

  const $ = load(response.data);
  const entries = [];

  $(".blue-list li").each((_, node) => {
    const entry = $(node);
    const anchor = entry.find("a").first();
    if (!anchor.length) return;

    const title = anchor.find("span").first().text().trim();
    const dateText = anchor.find("p.text-dark").text();
    const date = toIsoDateFromDotNotation(dateText);
    const link = anchor.attr("href")
      ? new URL(anchor.attr("href"), BASE_URL).href
      : null;

    if (!title || !link || !date) return;

    entries.push({
      title,
      link,
      date,
      category: CATEGORY_LABEL,
      source: "turmob.org.tr"
    });
  });

  const seen = new Set();
  return entries.filter(item => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });
}

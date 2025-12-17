import axios from "axios";
import { load } from "cheerio";
import { toIsoDateFromDotNotation } from "../utils/date.js";

const BASE_URL = "https://www.sgk.gov.tr";
const DUYURU_PATH = "/Duyuru";
const CATEGORY_LABEL = "SGK Güncel Duyurular";

export async function scrapeSgk() {
  const response = await axios.get(`${BASE_URL}${DUYURU_PATH}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml"
    }
  });

  const $ = load(response.data);
  const entries = [];

  $("#posts .posts-sm .entry.col-12").each((_, node) => {
    const entry = $(node);
    const titleEl = entry.find(".entry-title h4 a").first();
    const timeEl = entry.find(".entry-image time").first();
    const metaLabel = entry
      .find(".entry-meta li small.sgkUnite")
      .last()
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();

    const rawDate = timeEl.attr("datetime") ?? timeEl.text();
    const date = toIsoDateFromDotNotation(rawDate);
    const link = titleEl.attr("href")
      ? new URL(titleEl.attr("href"), BASE_URL).href
      : null;
    const title = titleEl.text().trim();

    if (!title || !link || !date) return;

    entries.push({
      title,
      link,
      date,
      category: CATEGORY_LABEL,
      source: metaLabel || "sgk.gov.tr"
    });
  });

  const seen = new Set();
  return entries.filter(item => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });
}

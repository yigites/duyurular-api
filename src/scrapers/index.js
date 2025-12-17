import { scrapeGib } from "./gib.js";
import { scrapeSgk } from "./sgk.js";
import { scrapeTurmob } from "./turmob.js";

export const scrapers = [
  {
    id: "gib",
    scrape: scrapeGib,
    feedTitle: "GİB Güncel Duyurular",
    feedDescription: "Gelir İdaresi Başkanlığı güncel duyurularından oluşan RSS",
    language: "tr"
  },
  {
    id: "sgk",
    scrape: scrapeSgk,
    feedTitle: "SGK Güncel Duyurular",
    feedDescription: "Sosyal Güvenlik Kurumu Duyuru sayfasından oluşturulan RSS",
    language: "tr"
  },
  {
    id: "turmob",
    scrape: scrapeTurmob,
    feedTitle: "TÜRMOB Haberler",
    feedDescription: "TÜRMOB Haberler sayfasındaki duyuruların RSS versiyonu",
    language: "tr"
  }
];

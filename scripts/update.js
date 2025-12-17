import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PUBLIC_BASE_URL, DATA_DIR, PUBLIC_DIR } from "../src/config.js";
import { scrapers } from "../src/scrapers/index.js";
import { buildFeed } from "../src/rss.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, DATA_DIR);
const publicDir = path.join(projectRoot, PUBLIC_DIR);

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

async function run() {
  for (const source of scrapers) {
    console.log(`[${source.id}] scraping announcements`);
    const announcements = await source.scrape();

    const jsonPath = path.join(dataDir, `${source.id}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(announcements, null, 2));
    console.log(`[${source.id}] saved ${announcements.length} items`);

    const feedPath = path.join(publicDir, source.id, "rss.xml");
    buildFeed(
      announcements,
      {
        title: source.feedTitle,
        description: source.feedDescription,
        siteUrl: `${PUBLIC_BASE_URL}/${source.id}`,
        feedUrl: `${PUBLIC_BASE_URL}/${source.id}/rss.xml`,
        language: source.language
      },
      feedPath
    );
    console.log(`[${source.id}] RSS created at ${feedPath}`);
  }

  console.log("All sources updated");
}

run().catch(error => {
  console.error("Update failed", error);
  process.exit(1);
});

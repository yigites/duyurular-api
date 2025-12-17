import fs from "fs";
import path from "path";
import RSS from "rss";

export function buildFeed(items, { title, description, siteUrl, feedUrl, language = "tr" }, outputPath) {
  const feed = new RSS({
    title,
    description,
    site_url: siteUrl,
    feed_url: feedUrl,
    language
  });

  items.forEach(item => {
    feed.item({
      title: item.title,
      url: item.link,
      date: item.date,
      description: `Kaynak: ${item.source}`,
      categories: item.category ? [item.category] : []
    });
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, feed.xml({ indent: true }));
}

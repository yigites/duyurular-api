import axios from "axios";

const BASE_URL = "https://www.gib.gov.tr";
const API_URL = `${BASE_URL}/api/gibportal/duyuru/listPublish`;
const CATEGORY_LABEL = "Güncel";

export async function scrapeGib() {
  const response = await axios.post(
    API_URL,
    {
      page: 0,
      size: 20,
      sortFieldName: "startdate",
      sortType: "DESC"
    },
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json"
      }
    }
  );

  const announcements = response.data?.resultContainer?.content ?? [];

  return announcements
    .map(item => {
      const title = item.title?.trim();
      const slug = item.slug?.trim();
      const startDate = item.startdate
        ? new Date(item.startdate).toISOString().slice(0, 10)
        : null;
      const link = slug
        ? `${BASE_URL}/duyuru-arsivi/guncel/${encodeURIComponent(slug)}`
        : `${BASE_URL}/duyuru-arsivi/guncel/${item.id}`;

      if (!title || !startDate) return null;

      return {
        title,
        link,
        date: startDate,
        category: CATEGORY_LABEL,
        source: "gib.gov.tr"
      };
    })
    .filter(Boolean);
}

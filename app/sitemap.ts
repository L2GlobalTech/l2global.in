// app/sitemap.ts
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const WEBSITE_URL = "https://l2global.in";

  const urls = [
    { path: "/", changeFreq: "weekly", priority: 1 },
    { path: "/about-us", changeFreq: "monthly", priority: 0.9 },
    { path: "/contact-us", changeFreq: "monthly", priority: 0.8 },
    { path: "/career", changeFreq: "monthly", priority: 0.8 },
    { path: "/team", changeFreq: "monthly", priority: 0.8 },
    { path: "/services", changeFreq: "monthly", priority: 0.8 },
    { path: "/expertise", changeFreq: "monthly", priority: 0.8 },
    { path: "/admission-process", changeFreq: "monthly", priority: 0.8 },
    { path: "/franchise", changeFreq: "monthly", priority: 0.8 },
    { path: "/infrastructure-and-facileties", changeFreq: "monthly", priority: 0.8 },
    { path: "/internships", changeFreq: "monthly", priority: 0.8 },
    { path: "/leadership", changeFreq: "monthly", priority: 0.8 },
    { path: "/student-housing", changeFreq: "monthly", priority: 0.8 },
    { path: "/study-abroad", changeFreq: "monthly", priority: 0.8 },
    { path: "/blogs", changeFreq: "monthly", priority: 0.8 },

    // Industries
    { path: "/industries/education", changeFreq: "monthly", priority: 0.8 },
    { path: "/industries/health-care", changeFreq: "monthly", priority: 0.8 },
    { path: "/industries/real-estate", changeFreq: "monthly", priority: 0.8 },
    { path: "/industries/manufacturing", changeFreq: "monthly", priority: 0.8 },
    { path: "/industries/non-profit", changeFreq: "monthly", priority: 0.8 },
  ];

  return urls.map(({ path, changeFreq, priority }) => ({
    url: `${WEBSITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  }));
}

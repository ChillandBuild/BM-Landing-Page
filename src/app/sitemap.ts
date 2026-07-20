import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/products", "/products/aira", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

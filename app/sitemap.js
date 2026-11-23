export const dynamic = "force-static";

import { getAllArticles, getCategories, categorySlug, POSTS_PER_PAGE } from "../lib/articles";
import { locations } from "../lib/locations";
import { services } from "../lib/services";
import { SITE_URL } from "../lib/site";

const STATIC_DATE = new Date("2026-01-08T00:00:00.000Z");

export default function sitemap() {
  const articles = getAllArticles();
  const categories = getCategories();
  const totalBlogPages = Math.ceil(articles.length / POSTS_PER_PAGE);

  const pages = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/portfolio/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/book-meeting/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/locations/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
  ];

  const servicePages = services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  const blogPages = Array.from({ length: Math.max(0, totalBlogPages - 1) }, (_, index) => ({
    path: `/blog/page/${index + 2}/`,
    priority: 0.4,
    changeFrequency: "weekly",
  }));

  const categoryPages = categories.map((category) => ({
    path: `/blog/category/${categorySlug(category.name)}/`,
    priority: 0.5,
    changeFrequency: "weekly",
  }));

  const locationPages = locations.map((location) => ({
    path: `/locations/${location.slug}/`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  const articlePages = articles.map((article) => ({
    path: `/blog/${article.slug}/`,
    lastModified: new Date(article.updated || article.date || STATIC_DATE),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...pages, ...servicePages, ...locationPages, ...blogPages, ...categoryPages, ...articlePages].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: entry.lastModified || STATIC_DATE,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

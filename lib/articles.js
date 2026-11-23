import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
export const POSTS_PER_PAGE = 6;

marked.setOptions({ gfm: true });

function estimateReadingTime(markdown) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\-[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return {
    words,
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

function parseArticleFile(filename) {
  const fullPath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const { words, minutes } = estimateReadingTime(content);
  return {
    ...data,
    slug: data.slug || filename.replace(/\.md$/, ""),
    date: data.date ? String(data.date) : "",
    updated: data.updated ? String(data.updated) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    faq: Array.isArray(data.faq) ? data.faq : [],
    body: content,
    html: marked.parse(content),
    readingMinutes: minutes,
    wordCount: words,
    filename,
  };
}

function isPublished(article) {
  if (process.env.NODE_ENV !== "production") return true;
  if (article.draft === true) return false;
  if (article.status === "draft") return false;
  if (article.status === "scheduled") {
    return new Date(article.date).getTime() <= Date.now();
  }
  return true;
}

export function getAllArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
  return files
    .map(parseArticleFile)
    .filter(isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(slug) {
  return getAllArticles().find((article) => article.slug === slug) || null;
}

export function getArticleSlugs() {
  return getAllArticles().map((article) => article.slug);
}

export function getCategories() {
  const map = new Map();
  for (const article of getAllArticles()) {
    map.set(article.category, (map.get(article.category) || 0) + 1);
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }));
}

export function getRelatedArticles(article, limit = 3) {
  const articles = getAllArticles().filter((item) => item.slug !== article.slug);
  const scored = articles.map((item) => {
    let score = 0;
    if (item.category === article.category) score += 3;
    for (const tag of item.tags) {
      if (article.tags.includes(tag)) score += 1;
    }
    for (const relatedSlug of article.related || []) {
      if (item.slug === relatedSlug) score += 5;
    }
    return { item, score };
  });
  return scored
    .sort((a, b) => b.score - a.score || new Date(b.item.date) - new Date(a.item.date))
    .slice(0, limit)
    .map(({ item }) => item);
}

export function paginateArticles(articles, page, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(articles.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: articles.slice(start, start + perPage),
    page: current,
    totalPages,
  };
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function articleHref(article) {
  return `/blog/${article.slug}/`;
}

export function categorySlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getArticlesByCategory(name) {
  return getAllArticles().filter((article) => article.category === name);
}

#!/usr/bin/env node
/**
 * Validate article frontmatter, uniqueness, images and internal links.
 * Run: npm run content:validate
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { services } from "../lib/services.js";
import { locations } from "../lib/locations.js";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const PUBLIC_DIR = path.join(ROOT, "public");

const CATEGORIES = new Set([
  "Web Development",
  "SEO",
  "Automation",
  "Cloud",
  "Data & Analytics",
  "Conversion",
  "Agency Operations",
]);

const errors = [];
const warnings = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function warn(file, message) {
  warnings.push(`${file}: ${message}`);
}

function countWords(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\-[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function lengthOf(value = "") {
  return String(value).trim().length;
}

if (!fs.existsSync(ARTICLES_DIR)) {
  console.error("No content/articles directory found.");
  process.exit(1);
}

const files = fs
  .readdirSync(ARTICLES_DIR)
  .filter((file) => file.endsWith(".md") && !file.startsWith("_"));

const articles = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  articles.push({ file, data, content });
}

const slugSet = new Set(articles.map((article) => article.data.slug || article.file.replace(/\.md$/, "")));
const relatedSet = new Set(slugSet);
const serviceSlugs = new Set(services.map((service) => service.slug));
const locationSlugs = new Set(locations.map((location) => location.slug));

const seenSlugs = new Map();
const seenKeywords = new Map();
const seenTitles = new Map();

for (const { file, data, content } of articles) {
  const status = data.status || "published";
  const isDraft = status === "draft";
  const required = ["title", "slug", "description", "date", "category", "focusKeyword", "coverImage"];

  for (const field of required) {
    if (!data[field]) fail(file, `missing required field "${field}"`);
  }

  const slug = data.slug || file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(file, `slug "${slug}" must be lowercase words separated by hyphens`);
  }
  if (seenSlugs.has(slug)) {
    fail(file, `duplicate slug "${slug}" (also in ${seenSlugs.get(slug)})`);
  }
  seenSlugs.set(slug, file);

  if (lengthOf(data.title) > 70) warn(file, "title is over 70 characters");
  if (lengthOf(data.title) < 20) warn(file, "title is under 20 characters");

  const descLength = lengthOf(data.description);
  if (descLength > 170) warn(file, `description is ${descLength} characters (aim for 140–155)`);
  if (descLength > 0 && descLength < 110) warn(file, `description is only ${descLength} characters (aim for 140–155)`);

  if (data.date && Number.isNaN(new Date(data.date).getTime())) {
    fail(file, `invalid date "${data.date}"`);
  }

  if (data.category && !CATEGORIES.has(data.category)) {
    fail(file, `category "${data.category}" is not in the allowed list`);
  }

  if (data.focusKeyword) {
    const key = String(data.focusKeyword).trim().toLowerCase();
    if (seenKeywords.has(key)) {
      fail(file, `duplicate focus keyword "${data.focusKeyword}" (also in ${seenKeywords.get(key)})`);
    }
    seenKeywords.set(key, file);
  }

  const titleKey = String(data.title || "").trim().toLowerCase();
  if (titleKey) {
    if (seenTitles.has(titleKey)) {
      fail(file, `duplicate title (also in ${seenTitles.get(titleKey)})`);
    }
    seenTitles.set(titleKey, file);
  }

  if (data.coverImage) {
    const imagePath = path.join(PUBLIC_DIR, String(data.coverImage).replace(/^\//, ""));
    if (!fs.existsSync(imagePath)) {
      fail(file, `coverImage not found: ${data.coverImage}`);
    }
    if (!/\.webp$/.test(String(data.coverImage))) {
      warn(file, "coverImage should be a .webp for performance");
    }
  }

  const words = countWords(content);
  if (isDraft) {
    if (words < 300) warn(file, `draft is very short (${words} words)`);
  } else {
    if (words < 900) fail(file, `published article is too short (${words} words, minimum 900)`);
    else if (words < 1200) warn(file, `article is ${words} words (target 1,200–2,000)`);
    if (!Array.isArray(data.faq) || data.faq.length < 2) {
      fail(file, "published article needs at least 2 FAQ entries");
    }
  }

  if (Array.isArray(data.faq)) {
    for (const [index, faq] of data.faq.entries()) {
      if (!faq?.q || !faq?.a) fail(file, `faq[${index}] is missing q or a`);
    }
  }

  if (Array.isArray(data.related)) {
    for (const related of data.related) {
      if (!relatedSet.has(related)) {
        warn(file, `related slug "${related}" does not exist`);
      }
    }
  }

  if (/^#\s+/m.test(content)) {
    warn(file, "body contains an H1; the page renders the title as H1 already");
  }

  for (const match of content.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    const href = match[1].split("#")[0].split("?")[0];
    const blogMatch = href.match(/^\/blog\/([a-z0-9-]+)\/?$/);
    const serviceMatch = href.match(/^\/services\/([a-z0-9-]+)\/?$/);
    const locationMatch = href.match(/^\/locations\/([a-z0-9-]+)\/?$/);
    if (blogMatch && !relatedSet.has(blogMatch[1])) {
      fail(file, `broken internal article link: ${href}`);
    }
    if (serviceMatch && !serviceSlugs.has(serviceMatch[1])) {
      fail(file, `broken internal service link: ${href}`);
    }
    if (locationMatch && !locationSlugs.has(locationMatch[1])) {
      fail(file, `broken internal location link: ${href}`);
    }
  }
}

for (const message of warnings) console.warn(`warn  ${message}`);
for (const message of errors) console.error(`error ${message}`);

console.log(
  `\nChecked ${articles.length} articles · ${errors.length} errors · ${warnings.length} warnings`,
);

if (errors.length > 0) process.exit(1);

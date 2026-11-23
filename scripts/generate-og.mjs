import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "og");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");

const palette = {
  bg: "#060709",
  ink: "#f5f1e8",
  muted: "#9c978d",
  gold: "#c9a84c",
  gold2: "#e6c77e",
  teal: "#7dd3c0",
};

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrap(text, maxChars, maxLines = 3) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines.slice(0, maxLines);
}

function svgFor({ eyebrow, title, subtitle }) {
  const titleLines = wrap(title, 27, 3);
  const subtitleLines = wrap(subtitle, 62, 2);
  const titleStart = 250;
  const lineHeight = 64;
  const titleTspans = titleLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  const subtitleY = titleStart + (titleLines.length - 1) * lineHeight + 66;
  const subtitleTspans = subtitleLines
    .map((line, index) => `<tspan x="74" dy="${index === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#060709"/>
      <stop offset="0.6" stop-color="#0b0d12"/>
      <stop offset="1" stop-color="#07080a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.72">
      <stop offset="0" stop-color="${palette.gold}" stop-opacity="0.28"/>
      <stop offset="0.55" stop-color="${palette.gold}" stop-opacity="0.05"/>
      <stop offset="1" stop-color="${palette.gold}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.9" r="0.5">
      <stop offset="0" stop-color="${palette.teal}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${palette.teal}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${palette.gold}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <circle cx="1010" cy="150" r="118" fill="none" stroke="${palette.gold}" stroke-opacity="0.2" stroke-width="1"/>
  <circle cx="1010" cy="150" r="74" fill="none" stroke="${palette.gold}" stroke-opacity="0.14" stroke-width="1" stroke-dasharray="4 8"/>
  <circle cx="1010" cy="150" r="3.5" fill="${palette.gold2}"/>

  <rect x="72" y="82" width="30" height="3" fill="${palette.gold}"/>
  <text x="114" y="90" fill="${palette.gold2}" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" letter-spacing="4" font-weight="700">${escapeXml(
    String(eyebrow).toUpperCase(),
  )}</text>

  <text x="72" y="${titleStart}" fill="${palette.ink}" font-family="DejaVu Sans, Arial, sans-serif" font-size="58" font-weight="700" letter-spacing="-2">${titleTspans}</text>

  <text x="74" y="${subtitleY}" fill="${palette.muted}" font-family="DejaVu Sans, Arial, sans-serif" font-size="23">${subtitleTspans}</text>

  <line x1="72" y1="548" x2="1128" y2="548" stroke="${palette.gold}" stroke-opacity="0.18"/>
  <text x="72" y="588" fill="${palette.ink}" font-family="DejaVu Sans, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="1">Sync-Oaks</text>
  <text x="252" y="588" fill="${palette.muted}" font-family="DejaVu Sans, Arial, sans-serif" font-size="18">Digital product studio</text>
  <text x="1128" y="588" text-anchor="end" fill="${palette.gold2}" font-family="DejaVu Sans, Arial, sans-serif" font-size="18">syncoaks.com</text>
</svg>`;
}

async function render(name, data) {
  const svg = svgFor(data);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(OUT_DIR, `${name}.png`));
  console.log(`og/${name}.png`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pages = [
    ["default", "Digital product studio", "Websites, apps and automation that win clients.", "Fast, crawlable builds with a simple WhatsApp or email start."],
    ["home", "Digital product studio", "Build a website that pulls its weight.", "Design, engineering, SEO, and follow-up built as one system."],
    ["services", "Services", "Build the asset. Then the system around it.", "Web, SEO, automation, cloud, data, and lead systems."],
    ["portfolio", "Selected work", "Work shaped around a problem, not a template.", "Web apps, lead systems, technical SEO, and automation."],
    ["blog", "Notes from the build", "Advice we would give a friend who asked.", "Practical guides on websites, search, automation, and conversion."],
    ["about", "About the studio", "A small senior studio for the whole system.", "Design, engineering, and search under one roof."],
    ["contact", "Contact", "Two ways to reach the studio.", "WhatsApp or a short email brief. No long forms."],
    ["book-meeting", "Book a meeting", "One conversation. Two simple ways to start.", "Choose WhatsApp or email. We handle the calendar by reply."],
    ["privacy", "Legal", "Privacy policy", "How Sync-Oaks handles information submitted through this site."],
    ["terms", "Legal", "Terms of service", "The basis for using this site and working with Sync-Oaks."],
  ];

  for (const [name, eyebrow, title, subtitle] of pages) {
    await render(name, { eyebrow, title, subtitle });
  }

  const { services } = await import("../lib/services.js");
  for (const service of services) {
    await render(`service-${service.slug}`, {
      eyebrow: "Service",
      title: service.name,
      subtitle: service.tagline,
    });
  }

  if (fs.existsSync(ARTICLES_DIR)) {
    for (const file of fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
      const { data, content } = matter(fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8"));
      if (data.status === "draft") continue;
      const words = content.replace(/\s+/g, " ").split(" ").length;
      await render(`article-${data.slug || file.replace(/\.md$/, "")}`, {
        eyebrow: data.category || "Insight",
        title: data.title,
        subtitle: `${data.focusKeyword ? `Focus: ${data.focusKeyword} · ` : ""}${Math.max(1, Math.round(words / 220))} min read`,
      });
    }
  }

  console.log("OG images generated.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES = path.join(ROOT, "public", "images");

const CARD_SOURCES = [
  "case-cloud",
  "case-data",
  "case-ecommerce",
  "case-logistics",
  "case-marketing",
  "case-saas",
  "service-ai",
  "service-cloud",
  "service-data",
  "service-marketing",
  "service-seo",
  "service-webdev",
].map((name) => `${name}.jpg`);

const HERO_SOURCE = "sync-oaks-hero-services.png";

async function writeOptimized(source, output, { width, quality }) {
  const input = path.join(IMAGES, source);
  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${source}`);
    return;
  }
  const target = path.join(IMAGES, output);
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(target);
  const before = fs.statSync(input).size;
  const after = fs.statSync(target).size;
  console.log(
    `${source} -> ${output}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  );
}

async function writeBlur(source, output, { width = 360, blur = 3 } = {}) {
  const input = path.join(IMAGES, source);
  if (!fs.existsSync(input)) return;
  const target = path.join(IMAGES, output);
  await sharp(input)
    .rotate()
    .resize({ width })
    .blur(blur)
    .webp({ quality: 62 })
    .toFile(target);
  console.log(`blur ${source} -> ${output} (${(fs.statSync(target).size / 1024).toFixed(1)}KB)`);
}

async function main() {
  for (const source of CARD_SOURCES) {
    await writeOptimized(source, source.replace(/\.jpg$/, ".webp"), {
      width: 940,
      quality: 80,
    });
  }

  await writeOptimized(HERO_SOURCE, "hero-services.webp", { width: 1200, quality: 78 });
  await writeBlur(HERO_SOURCE, "hero-blur.webp", { width: 320, blur: 3 });

  const blurTiles = [
    ["service-cloud.jpg", "blur-blue.webp"],
    ["case-saas.jpg", "blur-teal.webp"],
    ["service-marketing.jpg", "blur-gold.webp"],
    ["service-seo.jpg", "blur-violet.webp"],
  ];
  for (const [source, output] of blurTiles) {
    await writeBlur(source, output);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");

if (!fs.existsSync(outDir)) {
  console.warn("[prepare-dist] out/ not found; nothing to copy.");
  process.exit(0);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.cpSync(outDir, distDir, { recursive: true });

const entries = fs.readdirSync(distDir).length;
console.log(`[prepare-dist] copied out/ -> dist/ (${entries} entries) for Cloudflare Pages.`);

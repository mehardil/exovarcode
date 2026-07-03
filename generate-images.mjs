import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const outputDir = "./public/images";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const images = [
  // Case Studies
  {
    file: "case-ecommerce.jpg",
    prompt: "luxury ecommerce dashboard UI mockup, dark obsidian black background, elegant gold and bronze accents, sales analytics, clean layout, professional design, high resolution, 4k",
    width: 1200, height: 800,
  },
  {
    file: "case-saas.jpg",
    prompt: "saas analytics metrics dashboard, dark obsidian black theme, warm golden glowing charts, real-time graphs, premium interface, clean UI, ultrarealistic",
    width: 1200, height: 800,
  },
  {
    file: "case-cloud.jpg",
    prompt: "cloud server node topology network map, dark cybertech theme, warm amber and gold glowing data links, futuristic server farm architecture, clean 3d render",
    width: 1200, height: 800,
  },
  {
    file: "case-marketing.jpg",
    prompt: "digital marketing campaign performance dashboard, meta google ad metrics, elegant obsidian dashboard, gold bar charts and stats, glassmorphic UI, modern premium design",
    width: 1200, height: 800,
  },
  {
    file: "case-logistics.jpg",
    prompt: "logistics automation dashboard, workflow charts, order fulfillment metrics, obsidian theme with gold and bronze highlights, clean professional UI",
    width: 1200, height: 800,
  },
  {
    file: "case-data.jpg",
    prompt: "real-time data engineering stream pipeline analytics, data warehouses, dark theme, warm gold and bronze glowing flow connections, premium business intelligence dashboard",
    width: 1200, height: 800,
  },
  // Services
  {
    file: "service-webdev.jpg",
    prompt: "modern developer workspace, react code editor, sleek laptop displaying high-end luxury dark web design with gold accents, glowing ambient warm gold light, professional aesthetic",
    width: 1200, height: 800,
  },
  {
    file: "service-seo.jpg",
    prompt: "SEO growth dashboard, organic traffic search visibility keyword rankings charts, obsidian dark theme, elegant gold upward curve line graph, premium layout",
    width: 1200, height: 800,
  },
  {
    file: "service-marketing.jpg",
    prompt: "digital marketing strategic workspace, social media grid mockup and conversion rate indicators, obsidian dark dashboard design, luxury gold accents",
    width: 1200, height: 800,
  },
  {
    file: "service-cloud.jpg",
    prompt: "cloud computing network infrastructure system, glowing container nodes and CI/CD pipelines, dark black obsidian aesthetic, soft gold and amber glow, professional",
    width: 1200, height: 800,
  },
  {
    file: "service-data.jpg",
    prompt: "data engineering pipeline schema, database architecture warehouse flows, dark background, golden streaming data streams, high quality 3d visualization",
    width: 1200, height: 800,
  },
  {
    file: "service-ai.jpg",
    prompt: "AI neural network flow, digital workflow automation nodes, dark black obsidian theme with luxury gold circuit patterns, sophisticated futuristic look",
    width: 1200, height: 800,
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function generateImage(item) {
  const encoded = encodeURIComponent(item.prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${item.width}&height=${item.height}&nologo=true&model=flux`;
  const dest = path.join(outputDir, item.file);
  console.log(`Generating: ${item.file}...`);
  try {
    await download(url, dest);
    const size = fs.statSync(dest).size;
    console.log(`  ✓ Saved ${item.file} (${Math.round(size / 1024)}KB)`);
    return true;
  } catch (err) {
    console.error(`  ✗ Failed ${item.file}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("Generating images via Pollinations.ai (free, no key needed)...\n");
  for (const item of images) {
    await generateImage(item);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log("\nDone! Check public/images/");
}

main();

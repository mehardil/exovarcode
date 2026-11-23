#!/usr/bin/env node
/**
 * Sync-Oaks incremental indexing.
 *
 * - Fetches sitemap.xml
 * - Diffs URLs by lastmod against .state.json
 * - Submits changed URLs to IndexNow (Bing, Yandex, Seznam, and others)
 * - Refreshes the sitemap in Google Search Console
 * - Optionally submits individual URLs to the Google Indexing API (opt-in; Google
 *   officially supports it only for JobPosting and BroadcastEvent pages)
 *
 * Usage:
 *   npm run index:dry
 *   npm run index:submit
 *   node scripts/indexing/index.mjs --dry-run --verbose
 *
 * No script can force Google to index a page. This speeds up discovery.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const STATE_FILE = path.join(ROOT, "scripts", "indexing", ".state.json");
const SITE_URL = (process.env.SITE_URL || "https://syncoaks.com").replace(/\/$/, "");
const SITEMAP_URL = process.env.SITEMAP_URL || `${SITE_URL}/sitemap.xml`;
const DRY_RUN = process.argv.includes("--dry-run") || process.env.DRY_RUN === "1";
const VERBOSE = process.argv.includes("--verbose") || process.env.VERBOSE === "1";
const MAX_URLS = Number(process.env.MAX_URLS_PER_RUN || 200);

function loadDotEnv() {
  const file = path.join(ROOT, ".env");
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function log(message, extra) {
  const stamp = new Date().toISOString();
  if (extra !== undefined) console.log(`[${stamp}] ${message}`, extra);
  else console.log(`[${stamp}] ${message}`);
}

function debug(message, extra) {
  if (!VERBOSE) return;
  if (extra !== undefined) console.log(`[debug] ${message}`, extra);
  else console.log(`[debug] ${message}`);
}

function decodeXml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { urls: {}, lastRun: null };
  }
}

function writeState(state) {
  if (DRY_RUN) {
    debug("Dry run: state file not written.");
    return;
  }
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(url, options = {}, label = url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        debug(`${label}: ${response.status}`);
        return response;
      }
      const body = await response.text().catch(() => "");
      lastError = new Error(`${label} failed: ${response.status} ${body.slice(0, 300)}`);
      if (response.status === 429 || response.status >= 500) {
        const wait = 1000 * 2 ** (attempt - 1) + Math.random() * 400;
        log(`${label}: retrying after ${Math.round(wait)}ms (status ${response.status})`);
        await sleep(wait);
        continue;
      }
      throw lastError;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        const wait = 1000 * 2 ** (attempt - 1) + Math.random() * 400;
        log(`${label}: ${error.message}. Retrying in ${Math.round(wait)}ms`);
        await sleep(wait);
      }
    }
  }
  throw lastError;
}

async function fetchSitemap() {
  const response = await request(SITEMAP_URL, { headers: { "User-Agent": "SyncOaksIndexing/2.0" } }, "sitemap fetch");
  const xml = await response.text();
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  const entries = [];
  for (const block of blocks) {
    const loc = decodeXml(block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]?.trim() || "");
    const lastmod = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1]?.trim() || "";
    if (loc) entries.push({ loc, lastmod });
  }
  return entries;
}

function diff(entries, state) {
  const known = state.urls || {};
  const changed = [];
  for (const entry of entries) {
    const previous = known[entry.loc];
    if (!previous || (entry.lastmod && entry.lastmod !== previous)) {
      changed.push(entry);
    }
  }
  return changed;
}

function ensureIndexNowKey(key) {
  if (!key) return null;
  const file = path.join(ROOT, "public", `${key}.txt`);
  if (!fs.existsSync(file)) {
    if (DRY_RUN) {
      log(`IndexNow key file is missing: public/${key}.txt (dry run, not created)`);
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, key);
      log(`Created IndexNow key file: public/${key}.txt`);
    }
  }
  return `${SITE_URL}/${key}.txt`;
}

async function submitIndexNow(urls, key) {
  if (!key) {
    log("IndexNow: skipped (INDEXNOW_KEY not set)");
    return { ok: false, skipped: true, count: 0 };
  }
  if (!urls.length) return { ok: true, count: 0 };
  const keyLocation = ensureIndexNowKey(key);
  const host = new URL(SITE_URL).host;
  const payload = { host, key, keyLocation, urlList: urls };
  if (DRY_RUN) {
    log(`IndexNow dry run: would submit ${urls.length} URL(s)`, urls.slice(0, 5));
    return { ok: true, count: urls.length, dryRun: true };
  }
  try {
    await request(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      },
      "IndexNow",
    );
    log(`IndexNow: submitted ${urls.length} URL(s)`);
    return { ok: true, count: urls.length };
  } catch (error) {
    log(`IndexNow failed: ${error.message}`);
    return { ok: false, count: 0, error };
  }
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

async function getGoogleToken(serviceAccount, scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(serviceAccount.private_key, "base64url");
  const assertion = `${header}.${claim}.${signature}`;

  const response = await request(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
    },
    "Google OAuth token",
  );
  const data = await response.json();
  return data.access_token;
}

function loadServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch (error) {
    log(`GOOGLE_SERVICE_ACCOUNT_JSON could not be parsed: ${error.message}`);
    return null;
  }
}

async function submitSearchConsoleSitemap() {
  const serviceAccount = loadServiceAccount();
  if (!serviceAccount) {
    log("Search Console: skipped (GOOGLE_SERVICE_ACCOUNT_JSON not set)");
    return { ok: false, skipped: true };
  }
  const site = process.env.GSC_SITE_URL || "sc-domain:syncoaks.com";
  try {
    const token = await getGoogleToken(serviceAccount, "https://www.googleapis.com/auth/webmasters");
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
    if (DRY_RUN) {
      log(`Search Console dry run: would PUT sitemap for ${site}`);
      return { ok: true, dryRun: true };
    }
    await request(endpoint, { method: "PUT", headers: { Authorization: `Bearer ${token}` } }, "Search Console sitemap");
    log(`Search Console: sitemap submitted/refreshed for ${site}`);
    return { ok: true };
  } catch (error) {
    log(`Search Console failed: ${error.message}`);
    return { ok: false, error };
  }
}

async function submitGoogleIndexingApi(urls) {
  const enabled = String(process.env.GOOGLE_INDEXING_API_ENABLED || "").toLowerCase() === "true";
  if (!enabled) {
    log("Google Indexing API: skipped (GOOGLE_INDEXING_API_ENABLED is not true)");
    return { ok: false, skipped: true, count: 0 };
  }
  const serviceAccount = loadServiceAccount();
  if (!serviceAccount) {
    log("Google Indexing API: skipped (GOOGLE_SERVICE_ACCOUNT_JSON not set)");
    return { ok: false, skipped: true, count: 0 };
  }
  const batch = urls.slice(0, Math.min(MAX_URLS, 200));
  if (!batch.length) return { ok: true, count: 0 };
  try {
    const token = await getGoogleToken(serviceAccount, "https://www.googleapis.com/auth/indexing");
    let success = 0;
    for (const url of batch) {
      if (DRY_RUN) {
        log(`Google Indexing API dry run: would publish ${url}`);
        success += 1;
        continue;
      }
      try {
        await request(
          "https://indexing.googleapis.com/v3/urlNotifications:publish",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, type: "URL_UPDATED" }),
          },
          `Google Indexing ${url}`,
          2,
        );
        success += 1;
      } catch (error) {
        log(`Google Indexing failed for ${url}: ${error.message}`);
      }
      await sleep(250);
    }
    log(`Google Indexing API: submitted ${success}/${batch.length} URL(s)`);
    log("Note: Google officially supports this API only for JobPosting and BroadcastEvent pages. Results for normal pages are not guaranteed.");
    return { ok: success > 0, count: success };
  } catch (error) {
    log(`Google Indexing API failed: ${error.message}`);
    return { ok: false, count: 0, error };
  }
}

async function main() {
  loadDotEnv();
  log(`Sync-Oaks indexing ${DRY_RUN ? "(dry run)" : ""}`);
  log(`Sitemap: ${SITEMAP_URL}`);

  const entries = await fetchSitemap();
  const state = readState();
  const changed = diff(entries, state).slice(0, MAX_URLS);
  log(`Sitemap URLs: ${entries.length}. Changed/new: ${changed.length}.`);

  if (!changed.length) {
    log("Nothing new to submit. Done.");
    return;
  }

  debug("Changed URLs", changed);

  const urls = changed.map((entry) => entry.loc);
  const results = {
    indexNow: await submitIndexNow(urls, process.env.INDEXNOW_KEY),
    searchConsole: await submitSearchConsoleSitemap(),
    googleIndexing: await submitGoogleIndexingApi(urls),
  };

  const anySuccess = results.indexNow.ok || results.searchConsole.ok || results.googleIndexing.ok;
  if (!anySuccess) {
    log("No indexing channel succeeded. State left unchanged so the next run retries.");
    if (!DRY_RUN) process.exitCode = 1;
    return;
  }

  for (const entry of changed) {
    state.urls[entry.loc] = entry.lastmod || new Date().toISOString();
  }
  state.lastRun = new Date().toISOString();
  writeState(state);

  log(
    `Done. IndexNow: ${results.indexNow.count}; Search Console: ${results.searchConsole.ok ? "ok" : "no"}; Google Indexing API: ${results.googleIndexing.count}.`,
  );
}

main().catch((error) => {
  log(`Fatal: ${error.stack || error.message}`);
  process.exitCode = 1;
});

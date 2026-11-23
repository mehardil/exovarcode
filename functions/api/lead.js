import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_WINDOW_SECONDS = 600;
const RATE_LIMIT = 8;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(200).regex(EMAIL_RE),
  phone: z.string().trim().max(50).optional().default(""),
  service: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  company_website: z.string().max(500).optional().default(""),
  turnstileToken: z.string().max(4096).optional().default(""),
  source: z.string().trim().max(120).optional().default("website"),
  page: z.string().trim().max(500).optional().default(""),
  referrer: z.string().trim().max(1000).optional().default(""),
  utm: z.record(z.string(), z.string().max(1000)).optional().default({}),
});

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET_KEY) return { ok: true, skipped: true };
  if (!token) return { ok: false };
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET_KEY);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const result = await response.json();
    return { ok: Boolean(result.success) };
  } catch {
    return { ok: false };
  }
}

async function checkRateLimit(env, ip) {
  if (!env.LEADS_KV || !ip) return { allowed: true };
  const bucket = Math.floor(Date.now() / (RATE_WINDOW_SECONDS * 1000));
  const key = `rate:${ip}:${bucket}`;
  try {
    const current = Number((await env.LEADS_KV.get(key)) || "0");
    if (current >= RATE_LIMIT) return { allowed: false };
    await env.LEADS_KV.put(key, String(current + 1), {
      expirationTtl: RATE_WINDOW_SECONDS * 2,
    });
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

function buildEmail(data, meta) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Service", data.service || "Not specified"],
    ["Source", data.source],
    ["Page", data.page || "—"],
    ["Referrer", data.referrer || "—"],
    ["UTM source", meta.utm.utm_source || "—"],
    ["UTM medium", meta.utm.utm_medium || "—"],
    ["UTM campaign", meta.utm.utm_campaign || "—"],
    ["Landing page", meta.utm.landing_page || "—"],
    ["Submitted", meta.submittedAt],
  ];

  const html = `<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#f6f3ec;padding:24px;color:#15130f">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e6dfd0;border-radius:12px;overflow:hidden">
    <div style="background:#0b0c0f;color:#f5f1e8;padding:20px 24px">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#e6c77e">New Sync-Oaks lead</div>
      <h1 style="margin:6px 0 0;font-size:22px">${escapeHtml(data.name)}</h1>
    </div>
    <div style="padding:20px 24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:7px 0;color:#655f54;width:150px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 0;font-weight:600">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <hr style="border:0;border-top:1px solid #e6dfd0;margin:16px 0" />
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#655f54;margin-bottom:6px">Message</div>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.6">${escapeHtml(data.message)}</div>
      <p style="margin:22px 0 0;font-size:12px;color:#655f54">Reply directly to this email to reach the visitor.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    "New Sync-Oaks lead",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  return { html, text };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, message: "Unsupported request format." }, 415);
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path[0]))];
    return json({ ok: false, message: "Please check the highlighted fields.", fields }, 400);
  }
  const data = parsed.data;

  if (data.company_website) {
    return json({ ok: true, id: "ignored" });
  }

  const ip = request.headers.get("cf-connecting-ip") || "";
  const rate = await checkRateLimit(env, ip);
  if (!rate.allowed) {
    return json({ ok: false, message: "Too many messages. Please try again in a few minutes." }, 429);
  }

  const turnstile = await verifyTurnstile(env, data.turnstileToken, ip);
  if (!turnstile.ok) {
    return json({ ok: false, message: "Spam verification failed. Please refresh and try again." }, 400);
  }

  const id = crypto.randomUUID();
  const meta = {
    submittedAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") || "",
    utm: data.utm || {},
  };

  if (env.LEADS_KV) {
    try {
      await env.LEADS_KV.put(
        `lead:${Date.now()}:${id}`,
        JSON.stringify({ id, ...data, turnstileToken: undefined, meta }),
        { expirationTtl: 60 * 60 * 24 * 180 },
      );
    } catch (error) {
      console.error("Lead storage failed", error);
    }
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured. Lead stored but email not sent.", { id });
    return json(
      {
        ok: false,
        message:
          "Email delivery is not configured yet. Please use WhatsApp or email us directly so your message is not lost.",
      },
      503,
    );
  }

  const to = env.LEAD_TO_EMAIL || "syncoaks@gmail.com";
  const from = env.LEAD_FROM_EMAIL || "Sync-Oaks Website <onboarding@resend.dev>";
  const subject = `New lead · ${data.source} · ${data.name}`;
  const { html, text } = buildEmail(data, meta);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend delivery failed", response.status, detail);
      return json(
        {
          ok: false,
          message:
            "Your message was saved, but email delivery failed. Please use WhatsApp or email us directly.",
        },
        502,
      );
    }
  } catch (error) {
    console.error("Resend request error", error);
    return json(
      {
        ok: false,
        message:
          "Your message was saved, but email delivery failed. Please use WhatsApp or email us directly.",
      },
      502,
    );
  }

  return json({ ok: true, id });
}

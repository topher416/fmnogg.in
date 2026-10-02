import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { createHash } from "crypto";

// Show-alerts signup, backed by a private Vercel Blob store ("band-alerts").
// One tiny JSON blob per subscriber: subscribers/<sha256(email)>.json.
// The store's BLOB_READ_WRITE_TOKEN is injected by Vercel; the SDK picks it
// up automatically. No KV needed.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RL_MAX = 10;
const RL_WINDOW_MS = 3_600_000;

function sha(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

function authed(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function findBlob(pathname: string) {
  const page = await list({ prefix: pathname, limit: 1 });
  return page.blobs.find((b) => b.pathname === pathname) ?? null;
}

async function readJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!authed()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { email?: unknown; website?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; answer success and do nothing.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Best-effort rate limit: 10 signups per hour per IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const rlPath = `rl/${sha(ip)}.json`;
    const found = await findBlob(rlPath);
    const now = Date.now();
    let count = 0;
    let reset = now + RL_WINDOW_MS;
    if (found) {
      const cur = await readJson<{ count: number; reset: number }>(found.url);
      if (cur && now < cur.reset) {
        count = cur.count;
        reset = cur.reset;
      }
    }
    count += 1;
    await put(rlPath, JSON.stringify({ count, reset }), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    if (count > RL_MAX) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  } catch {
    // Rate limiting must never block a legitimate signup.
  }

  try {
    const path = `subscribers/${sha(email)}.json`;
    if (await findBlob(path)) {
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    await put(path, JSON.stringify({ email, ts: Date.now() }), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

async function allSubscribers(): Promise<string[] | null> {
  try {
    const emails: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 100, cursor });
      for (const b of page.blobs) {
        const data = await readJson<{ email?: unknown }>(b.url);
        if (data && typeof data.email === "string") emails.push(data.email);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return emails.sort();
  } catch {
    return null;
  }
}

function authorized(req: NextRequest): boolean {
  const adminToken = process.env.ALERTS_ADMIN_TOKEN;
  const token = req.nextUrl.searchParams.get("token");
  return !!adminToken && token === adminToken;
}

// Admin read: GET /api/alerts?token=<ALERTS_ADMIN_TOKEN>
export async function GET(req: NextRequest) {
  if (!authed() || !authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const subscribers = await allSubscribers();
  if (subscribers === null) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ count: subscribers.length, subscribers });
}

// Admin remove: DELETE /api/alerts?token=<ALERTS_ADMIN_TOKEN>&email=<email>
export async function DELETE(req: NextRequest) {
  if (!authed() || !authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const email = (req.nextUrl.searchParams.get("email") || "")
    .trim()
    .toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  try {
    const path = `subscribers/${sha(email)}.json`;
    const found = await findBlob(path);
    if (!found) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    await del(found.url);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

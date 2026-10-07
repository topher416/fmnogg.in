import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { createHash } from "crypto";
import { normalizeVenue, type VenueVote } from "@/lib/venue-votes";

// Show-alerts signup, backed by a private Vercel Blob store ("band-alerts").
// One tiny JSON blob per subscriber: subscribers/<sha256(email)>.json.
// The store's BLOB_READ_WRITE_TOKEN is injected by Vercel; the SDK picks it
// up automatically. No KV needed.
//
// The signup form also carries an optional "which bar next?" venue vote,
// stored on the subscriber blob and aggregated into the public "Wanted at"
// leaderboard. Resubmitting with a venue updates an existing subscriber's vote.

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

interface SubscriberBlob {
  email: string;
  ts: number;
  venue?: VenueVote;
}

export async function POST(req: NextRequest) {
  if (!authed()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { email?: unknown; website?: unknown; venue?: unknown };
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

  // Optional venue vote; a bad value never blocks the signup.
  const venue = normalizeVenue(body.venue);

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
    const record: SubscriberBlob = { email, ts: Date.now() };
    if (venue) record.venue = venue;

    if (await findBlob(path)) {
      if (!venue) {
        return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
      }
      // Existing subscriber casting or changing their venue vote.
      await put(path, JSON.stringify(record), {
        access: "private",
        allowOverwrite: true,
        contentType: "application/json",
      });
      return NextResponse.json({ ok: true, updated: true, venue: venue.display });
    }

    await put(path, JSON.stringify(record), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return NextResponse.json({ ok: true, venue: venue?.display ?? null });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

async function allSubscribers(): Promise<
  { email: string; venue?: string }[] | null
> {
  try {
    const out: { email: string; venue?: string }[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 100, cursor });
      for (const b of page.blobs) {
        const data = await readJson<SubscriberBlob>(b.url);
        if (data && typeof data.email === "string") {
          out.push({ email: data.email, venue: data.venue?.display });
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out.sort((a, b) => a.email.localeCompare(b.email));
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

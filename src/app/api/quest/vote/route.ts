import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { createHash } from "crypto";
import { isQuestCandidate } from "@/lib/song-quest";

// Song-quest voting. One vote per song per email. Voting also signs the
// email up for show alerts (one email per show) when it isn't already.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RL_MAX = 20;
const RL_WINDOW_MS = 3_600_000;

function sha(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

function authed(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
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

  let body: { email?: unknown; website?: unknown; song?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const song = typeof body.song === "string" ? body.song : "";
  if (!song || !isQuestCandidate(song)) {
    return NextResponse.json({ error: "invalid_song" }, { status: 400 });
  }

  // Best-effort rate limit: 20 votes per hour per IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const rlPath = `rl-quest/${sha(ip)}.json`;
    const found = (await list({ prefix: rlPath, limit: 1 })).blobs.find(
      (b) => b.pathname === rlPath
    );
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
    // Rate limiting must never block a legitimate vote.
  }

  try {
    const votePath = `song-votes/${song}/${sha(email)}.json`;
    const existing = (await list({ prefix: votePath, limit: 1 })).blobs.find(
      (b) => b.pathname === votePath
    );
    if (existing) {
      return NextResponse.json({ error: "already_voted" }, { status: 409 });
    }

    // Voting signs you up for show alerts too (one email per show).
    const subPath = `subscribers/${sha(email)}.json`;
    const sub = (await list({ prefix: subPath, limit: 1 })).blobs.find(
      (b) => b.pathname === subPath
    );
    let subscribed = false;
    if (!sub) {
      await put(
        subPath,
        JSON.stringify({ email, ts: Date.now(), src: "quest" }),
        {
          access: "private",
          allowOverwrite: true,
          contentType: "application/json",
        }
      );
      subscribed = true;
    }

    await put(votePath, JSON.stringify({ email, ts: Date.now() }), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return NextResponse.json({ ok: true, subscribed });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

// Show-alerts signup, backed by Vercel KV (REST). The KV store is connected
// in the Vercel dashboard; its URL/token arrive as KV_REST_API_URL and
// KV_REST_API_TOKEN. No new npm dependencies — plain fetch against the REST API.

const SUBSCRIBERS_KEY = "alerts:subscribers";
const RL_PREFIX = "alerts:rl:";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface KVStore {
  url: string;
  token: string;
}

function kv(): KVStore | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function kvCmd(
  store: KVStore,
  ...args: (string | number)[]
): Promise<unknown> {
  const path = args.map((a) => encodeURIComponent(String(a))).join("/");
  const res = await fetch(`${store.url}/${path}`, {
    headers: { Authorization: `Bearer ${store.token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`kv responded ${res.status}`);
  const data = (await res.json()) as { result?: unknown };
  return data.result;
}

export async function POST(req: NextRequest) {
  const store = kv();
  if (!store) {
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

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Best-effort rate limit: 10 signups per hour per IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const count = Number(await kvCmd(store, "INCR", `${RL_PREFIX}${ip}`));
    if (count === 1) await kvCmd(store, "EXPIRE", `${RL_PREFIX}${ip}`, 3600);
    if (count > 10) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  } catch {
    // Rate limiting must never block a legitimate signup.
  }

  try {
    const exists = Number(await kvCmd(store, "SISMEMBER", SUBSCRIBERS_KEY, email));
    if (exists) {
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    await kvCmd(store, "SADD", SUBSCRIBERS_KEY, email);
    await kvCmd(store, "HSET", `alerts:meta:${email}`, "ts", String(Date.now()));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// Admin read: GET /api/alerts?token=<ALERTS_ADMIN_TOKEN>
export async function GET(req: NextRequest) {
  const store = kv();
  const adminToken = process.env.ALERTS_ADMIN_TOKEN;
  const token = req.nextUrl.searchParams.get("token");
  if (!store || !adminToken || token !== adminToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const members = (await kvCmd(store, "SMEMBERS", SUBSCRIBERS_KEY)) as string[];
    return NextResponse.json({
      count: members.length,
      subscribers: [...members].sort(),
    });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

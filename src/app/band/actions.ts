"use server";

import { createHash } from "crypto";
import { list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {
  bandAuthConfigured,
  clearBandSession,
  getBandSession,
  setBandSession,
  verifyBandCode,
} from "@/lib/band-auth";
import {
  formatPollDate,
  readAvailability,
  writeAvailability,
  type AnswerValue,
  type AvailabilityPoll,
} from "@/lib/band-availability";

// Server actions for /band. Every action re-checks the session cookie;
// the client never decides who is allowed to do what.

function sha(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// Best-effort login rate limit, same shape as the alerts signup limit:
// 20 attempts per hour per IP. A Blob failure never blocks a real login.
async function loginRateLimited(ip: string): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    const path = `rl-band/${sha(ip)}.json`;
    const found = (await list({ prefix: path, limit: 1 })).blobs.find(
      (b) => b.pathname === path
    );
    const now = Date.now();
    let count = 0;
    let reset = now + 3_600_000;
    if (found) {
      const res = await fetch(found.url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const cur = (await res.json()) as { count?: unknown; reset?: unknown };
        if (
          typeof cur.count === "number" &&
          typeof cur.reset === "number" &&
          now < cur.reset
        ) {
          count = cur.count;
          reset = cur.reset;
        }
      }
    }
    count += 1;
    await put(path, JSON.stringify({ count, reset }), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return count > 20;
  } catch {
    return false;
  }
}

export async function loginBand(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  if (!bandAuthConfigured() || !process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, error: "not_configured" };
  }
  const code = formData.get("code");
  if (typeof code !== "string" || code.trim() === "") {
    return { ok: false, error: "invalid_code" };
  }
  if (await loginRateLimited(await clientIp())) {
    return { ok: false, error: "rate_limited" };
  }
  const slug = verifyBandCode(code);
  if (!slug) return { ok: false, error: "invalid_code" };
  await setBandSession(slug);
  revalidatePath("/band");
  return { ok: true };
}

export async function logoutBand(): Promise<void> {
  await clearBandSession();
  revalidatePath("/band");
}

function isAnswerValue(v: unknown): v is AnswerValue {
  return v === "yes" || v === "maybe" || v === "no";
}

export async function saveAvailability(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const member = await getBandSession();
  if (!member) return { ok: false, error: "unauthorized" };
  const pollId = formData.get("pollId");
  if (typeof pollId !== "string" || !pollId) {
    return { ok: false, error: "bad_request" };
  }
  const doc = await readAvailability();
  if (doc === null) return { ok: false, error: "server_error" };
  const poll = doc.polls.find((p) => p.id === pollId);
  if (!poll) return { ok: false, error: "not_found" };

  const mine = { ...(doc.answers[pollId]?.[member.slug] ?? {}) };
  const now = Date.now();
  for (const d of poll.dates) {
    const raw = formData.get(`answer-${d.id}`);
    const noteRaw = formData.get(`note-${d.id}`);
    const note =
      typeof noteRaw === "string" ? noteRaw.trim().slice(0, 200) : "";
    if (typeof raw === "string" && isAnswerValue(raw)) {
      mine[d.id] = { value: raw, note, updatedAt: now };
    } else {
      // Blank = no answer for that date; keep any previous note out too.
      delete mine[d.id];
    }
  }
  doc.answers[pollId] = { ...(doc.answers[pollId] ?? {}), [member.slug]: mine };
  if (!(await writeAvailability(doc))) {
    return { ok: false, error: "server_error" };
  }
  revalidatePath("/band");
  return { ok: true };
}

export async function addPoll(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const member = await getBandSession();
  if (!member || !member.admin) return { ok: false, error: "unauthorized" };
  const titleRaw = formData.get("title");
  const venueRaw = formData.get("venue");
  const title = typeof titleRaw === "string" ? titleRaw.trim().slice(0, 120) : "";
  const venue = typeof venueRaw === "string" ? venueRaw.trim().slice(0, 120) : "";
  if (!title) return { ok: false, error: "bad_request" };
  const rawDates = formData
    .getAll("date")
    .filter((v): v is string => typeof v === "string");
  const seen = new Set<string>();
  const dates: AvailabilityPoll["dates"] = [];
  for (const raw of [...rawDates].sort()) {
    const date = raw.trim();
    const label = formatPollDate(date);
    if (!label || seen.has(date)) continue;
    seen.add(date);
    dates.push({ id: `${date}`, date, label });
  }
  if (dates.length === 0 || dates.length > 12) {
    return { ok: false, error: "bad_request" };
  }
  const doc = await readAvailability();
  if (doc === null) return { ok: false, error: "server_error" };
  const poll: AvailabilityPoll = {
    id: `poll-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    venue,
    createdBy: member.slug,
    createdAt: Date.now(),
    dates,
  };
  doc.polls = [poll, ...doc.polls];
  if (!(await writeAvailability(doc))) {
    return { ok: false, error: "server_error" };
  }
  revalidatePath("/band");
  return { ok: true };
}

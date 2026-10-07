"use server";

import { list } from "@vercel/blob";
import {
  readSongProgress,
  writeSongProgress,
} from "@/lib/song-quest";
import { getQuestCandidates } from "@/lib/quest-candidates";

export interface Subscriber {
  email: string;
  venue?: string;
  src?: string;
}

interface SubscriberBlob {
  email?: unknown;
  venue?: unknown;
  src?: unknown;
}

async function readSubscribers(): Promise<Subscriber[] | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const out: Subscriber[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 100, cursor });
      for (const b of page.blobs) {
        try {
          const res = await fetch(b.url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });
          if (!res.ok) continue;
          const data = (await res.json()) as SubscriberBlob;
          if (typeof data.email === "string") {
            const v = data.venue;
            const venue =
              v && typeof v === "object"
                ? (v as { display?: unknown }).display
                : undefined;
            out.push({
              email: data.email,
              venue: typeof venue === "string" ? venue : undefined,
              src: typeof data.src === "string" ? data.src : undefined,
            });
          }
        } catch {
          // Skip blobs that can't be read; keep the rest.
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return out.sort((a, b) => a.email.localeCompare(b.email));
  } catch {
    return null;
  }
}

/** Returns the subscriber list only when the password matches. */
export async function unlockAdmin(
  password: string
): Promise<{ ok: true; subscribers: Subscriber[] | null } | { ok: false }> {
  const adminPassword = process.env.ALERTS_ADMIN_TOKEN;
  if (!adminPassword || password !== adminPassword) {
    return { ok: false };
  }
  const subscribers = await readSubscribers();
  return { ok: true, subscribers };
}

function adminAuthed(password: string): boolean {
  const adminPassword = process.env.ALERTS_ADMIN_TOKEN;
  return !!adminPassword && password === adminPassword;
}

/** Song-quest learning progress, for the admin editor. */
export async function getQuestProgressAdmin(
  password: string
): Promise<{ ok: true; progress: Record<string, number> | null } | { ok: false }> {
  if (!adminAuthed(password)) return { ok: false };
  return { ok: true, progress: await readSongProgress() };
}

/** Save song-quest learning progress from the admin editor form. */
export async function saveQuestProgressAdmin(
  password: string,
  formData: FormData
): Promise<{ ok: boolean }> {
  if (!adminAuthed(password)) return { ok: false };
  const entries: Record<string, number> = {};
  for (const c of getQuestCandidates()) {
    const raw = formData.get(`p-${c.slug}`);
    if (typeof raw !== "string" || raw.trim() === "") continue;
    const n = Math.round(Number(raw));
    if (Number.isFinite(n)) entries[c.slug] = n;
  }
  return { ok: await writeSongProgress(entries) };
}

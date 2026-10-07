import { list, put } from "@vercel/blob";
import { ALBUMS } from "./discography";
import {
  getQuestCandidates,
  isQuestCandidate,
  type QuestCandidate,
} from "./quest-candidates";

// Song quest: fans vote for which uncovered song the band learns next.
// One vote per song per email. The band's learning progress (0-100) is set
// in the admin and shown publicly. When a song hits 100%, it gets played
// at the top-voted bar on the Wanted leaderboard.

export type { QuestCandidate };
export { isQuestCandidate };

export interface QuestSong extends QuestCandidate {
  votes: number;
  /** Band's learning progress 0-100; null = not started. */
  progress: number | null;
}

const PROGRESS_PATH = "quest/progress.json";

async function readJson<T>(url: string, token: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getProgressMap(): Promise<Record<string, number>> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return {};
  try {
    const page = await list({ prefix: PROGRESS_PATH, limit: 1 });
    const found = page.blobs.find((b) => b.pathname === PROGRESS_PATH);
    if (!found) return {};
    const data = await readJson<Record<string, unknown>>(found.url, token);
    if (!data || typeof data !== "object") return {};
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "number" && v >= 0 && v <= 100) out[k] = Math.round(v);
    }
    return out;
  } catch {
    return {};
  }
}

/** Full quest board: candidates with vote counts and learning progress. */
export async function getQuestBoard(): Promise<QuestSong[] | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const candidates = getQuestCandidates();
    const progress = await getProgressMap();
    const songs = await Promise.all(
      candidates.map(async (c) => {
        let votes = 0;
        let cursor: string | undefined;
        do {
          const page = await list({
            prefix: `song-votes/${c.slug}/`,
            limit: 1000,
            cursor,
          });
          votes += page.blobs.length;
          cursor = page.hasMore ? page.cursor : undefined;
        } while (cursor);
        const p = progress[c.slug];
        return {
          ...c,
          votes,
          progress: typeof p === "number" ? p : null,
        };
      })
    );
    return songs;
  } catch {
    return null;
  }
}

/** Admin: read the raw progress map. */
export async function readSongProgress(): Promise<Record<string, number> | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    return await getProgressMap();
  } catch {
    return null;
  }
}

/** Admin: replace the progress map. Values are clamped 0-100. */
export async function writeSongProgress(
  entries: Record<string, number>
): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    const clean: Record<string, number> = {};
    for (const [k, v] of Object.entries(entries)) {
      if (!isQuestCandidate(k)) continue;
      const n = Math.round(Number(v));
      if (Number.isFinite(n)) clean[k] = Math.min(100, Math.max(0, n));
    }
    await put(PROGRESS_PATH, JSON.stringify(clean), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return false;
  }
}

/** Album coverage from the discography's covered flags (for the OKC 30 quest). */
export function getAlbumCoverage(albumSlug: string): {
  covered: number;
  total: number;
  pct: number;
} | null {
  const album = ALBUMS.find((a) => a.slug === albumSlug);
  if (!album || album.tracks.length === 0) return null;
  const covered = album.tracks.filter((t) => t.covered).length;
  return {
    covered,
    total: album.tracks.length,
    pct: Math.round((covered / album.tracks.length) * 100),
  };
}

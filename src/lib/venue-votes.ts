import { list } from "@vercel/blob";

// "Wanted at" leaderboard: fans vote for the Chicago bar they want us to
// play next. One vote per subscriber, stored on their subscriber blob.
// When a venue crosses PITCH_THRESHOLD we email its booker with the list.

export const PITCH_THRESHOLD = 15;

export interface VenueVote {
  key: string;
  display: string;
}

// Canonical names for rooms fans are likely to type (alias -> display).
const VENUE_ALIASES: Record<string, string> = {
  "montrose saloon": "Montrose Saloon",
  montrose: "Montrose Saloon",
  "cole's bar": "Cole's Bar",
  "coles bar": "Cole's Bar",
  "cole's": "Cole's Bar",
  coles: "Cole's Bar",
  "the burlington": "The Burlington",
  "burlington bar": "The Burlington",
  burlington: "The Burlington",
  "martyrs'": "Martyrs'",
  martyrs: "Martyrs'",
  bookclub: "Bookclub",
  "bookclub chi": "Bookclub",
  "beat kitchen": "Beat Kitchen",
  "uncommon ground": "Uncommon Ground",
  schubas: "Schubas",
  "schubas tavern": "Schubas",
  "sleeping village": "Sleeping Village",
  "color club": "Color Club",
  "the color club": "Color Club",
  "avondale music hall": "Avondale Music Hall",
  subterranean: "Subterranean",
  space: "SPACE",
  "space evanston": "SPACE",
  "space in evanston": "SPACE",
  "evanston space": "SPACE",
  "cubby bear": "Cubby Bear",
  "cubby bear wrigleyville": "Cubby Bear",
  "empty bottle": "Empty Bottle",
  "the empty bottle": "Empty Bottle",
  hideout: "Hideout",
  "the hideout": "Hideout",
  "lincoln hall": "Lincoln Hall",
  "thalia hall": "Thalia Hall",
  reggies: "Reggies",
  "reggie's": "Reggies",
  "gman tavern": "GMan Tavern",
  gman: "GMan Tavern",
  "carol's pub": "Carol's Pub",
  "carols pub": "Carol's Pub",
  "carol's": "Carol's Pub",
  "liar's club": "Liar's Club",
  "liars club": "Liar's Club",
  piece: "Piece",
  "piece pizza": "Piece",
  "piece brewery": "Piece",
  "joe's": "Joe's",
  joes: "Joe's",
};

function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Fans append the city to venue names ("SPACE in Evanston", "Empty Bottle,
// Chicago", "Schubas (Chicago)"). Strip trailing location qualifiers so
// those votes land on the venue itself. Loops so "Name, Chicago IL" and
// similar stacked suffixes fully come off.
function stripLocationSuffix(s: string): string {
  let out = s;
  for (;;) {
    const next = out
      .replace(/\s*\((chicago|evanston|il|illinois)[^)]*\)\s*$/i, "")
      .replace(
        /[\s,–—-]+(?:in\s+)?(chicago|evanston)(\s*,?\s*(il|illinois))?\s*$/i,
        "",
      )
      .replace(/[\s,]+(il|illinois)\s*$/i, "")
      .trim();
    if (next === out || next.length < 2) return out;
    out = next;
  }
}

/** Normalize a raw venue string; null when unusable. Never throws. */
export function normalizeVenue(raw: unknown): VenueVote | null {
  if (typeof raw !== "string") return null;
  const cleaned = stripLocationSuffix(raw.trim().replace(/\s+/g, " "));
  if (cleaned.length < 2 || cleaned.length > 80) return null;
  const display = VENUE_ALIASES[cleaned.toLowerCase()] ?? titleCase(cleaned);
  // Key off the canonical display so "the empty bottle" and "empty bottle"
  // land in the same leaderboard row.
  return { key: display.toLowerCase(), display };
}

export interface LeaderboardEntry {
  key: string;
  display: string;
  count: number;
  pitchReady: boolean;
}

interface SubscriberRecord {
  email?: unknown;
  venue?: unknown;
}

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

/** Aggregate venue votes across all subscriber blobs. Sorted by votes desc. */
export async function getVenueLeaderboard(): Promise<LeaderboardEntry[] | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const byKey = new Map<string, { display: string; count: number }>();
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 100, cursor });
      for (const b of page.blobs) {
        const data = await readJson<SubscriberRecord>(b.url, token);
        const v = data?.venue;
        if (v && typeof v === "object") {
          const { key, display } = v as { key?: unknown; display?: unknown };
          if (typeof key === "string" && typeof display === "string" && key) {
            // Re-canonicalize at read time: votes stored before a venue
            // gained an alias (or a suffix rule) still merge into the
            // canonical row instead of splitting the count.
            const re = normalizeVenue(display) ?? normalizeVenue(key);
            const k = re?.key ?? key;
            const d = re?.display ?? display;
            const cur = byKey.get(k) ?? { display: d, count: 0 };
            cur.count += 1;
            byKey.set(k, cur);
          }
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return [...byKey.entries()]
      .map(([key, { display, count }]) => ({
        key,
        display,
        count,
        pitchReady: count >= PITCH_THRESHOLD,
      }))
      .sort((a, b) => b.count - a.count || a.display.localeCompare(b.display));
  } catch {
    return null;
  }
}

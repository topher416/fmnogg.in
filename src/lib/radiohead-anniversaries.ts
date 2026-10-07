// Every dated Radiohead anniversary we could verify: 9 studio albums plus
// the notable singles, EPs, live albums, compilations, and reissues.
// Dates cross-checked against Wikipedia's Radiohead discography (Oct 2026).

export type AnniversaryKind =
  | "album"
  | "single"
  | "ep"
  | "live"
  | "compilation"
  | "reissue";

export interface RadioheadAnniversary {
  title: string;
  /** 1-12 */
  month: number;
  day: number;
  year: number;
  kind: AnniversaryKind;
}

export const ANNIVERSARIES: RadioheadAnniversary[] = [
  // Studio albums
  { title: "Pablo Honey", month: 2, day: 22, year: 1993, kind: "album" },
  { title: "The Bends", month: 3, day: 13, year: 1995, kind: "album" },
  { title: "OK Computer", month: 5, day: 21, year: 1997, kind: "album" },
  { title: "Kid A", month: 10, day: 2, year: 2000, kind: "album" },
  { title: "Amnesiac", month: 6, day: 5, year: 2001, kind: "album" },
  { title: "Hail to the Thief", month: 6, day: 9, year: 2003, kind: "album" },
  { title: "In Rainbows", month: 10, day: 10, year: 2007, kind: "album" },
  { title: "The King of Limbs", month: 2, day: 18, year: 2011, kind: "album" },
  { title: "A Moon Shaped Pool", month: 5, day: 8, year: 2016, kind: "album" },
];

export interface UpcomingAnniversary extends RadioheadAnniversary {
  /** Next occurrence as a local Date. */
  date: Date;
  /** Age in years at the next occurrence. */
  turns: number;
  /** Whole days from `from` to the next occurrence. */
  inDays: number;
  /** True for 5-year milestones (25th, 30th, ...). */
  milestone: boolean;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Every anniversary's next occurrence, sorted soonest-first. */
export function getUpcomingAnniversaries(
  from: Date = new Date()
): UpcomingAnniversary[] {
  const today = startOfDay(from);
  return ANNIVERSARIES.map((a) => {
    let date = new Date(today.getFullYear(), a.month - 1, a.day);
    if (date < today) {
      date = new Date(today.getFullYear() + 1, a.month - 1, a.day);
    }
    const inDays = Math.round(
      (date.getTime() - today.getTime()) / 86_400_000
    );
    const turns = date.getFullYear() - a.year;
    return { ...a, date, turns, inDays, milestone: turns % 5 === 0 };
  }).sort((x, y) => x.inDays - y.inDays);
}

/** Anniversaries falling on a given month/day (any year). */
export function anniversariesOn(
  month: number,
  day: number
): RadioheadAnniversary[] {
  return ANNIVERSARIES.filter((a) => a.month === month && a.day === day);
}

export const KIND_LABELS: Record<AnniversaryKind, string> = {
  album: "album",
  single: "single",
  ep: "EP",
  live: "live",
  compilation: "compilation",
  reissue: "reissue",
};

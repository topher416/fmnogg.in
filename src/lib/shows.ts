// Show archive data: every documented a thousand feet per second performance.
// Setlists resolve against LIVE_SETS in ./discography so the archive and the
// live-release player can never disagree about what was played.

import { LIVE_SETS, liveSetTracks } from "./discography";

export interface BillSlot {
  time: string;
  act: string;
}

export interface ArchiveShow {
  date: string;
  dateShort: string;
  venue: string;
  address?: string;
  city: string;
  status: "past" | "past";
  bill: BillSlot[];
  admission?: string;
  note?: string;
  youtubeUrl?: string;
  /** Index into LIVE_SETS for the recorded setlist. */
  liveSetIndex?: number;
}

export const SHOWS: ArchiveShow[] = [
  {
    date: "Friday, October 9, 2026",
    dateShort: "Oct 9, 2026",
    venue: "Montrose Saloon",
    address: "2933 W Montrose Ave",
    city: "Chicago, IL",
    status: "upcoming",
    bill: [
      { time: "8:00", act: "a thousand feet per second" },
      { time: "9:15", act: "Test Pattern" },
      { time: "10:30", act: "Three Men*" },
    ],
    admission: "$15 at the door · 21+",
  },
  {
    date: "Friday, September 25, 2026",
    dateShort: "Sep 25, 2026",
    venue: "Montrose Saloon",
    city: "Chicago, IL",
    status: "past",
    bill: [
      { time: "", act: "a thousand feet per second" },
      { time: "", act: "The Blue You Once Knew" },
    ],
    note: "On a bill with the Pink Floyd tribute The Blue You Once Knew. Recorded and released as a free live recording — intros, banter, and all.",
    youtubeUrl: "https://youtu.be/wnTnQ676_RU",
    liveSetIndex: 0,
  },
  {
    date: "Friday, July 17, 2026",
    dateShort: "Jul 17, 2026",
    venue: "Montrose Saloon",
    city: "Chicago, IL",
    status: "past",
    bill: [{ time: "", act: "a thousand feet per second" }],
    note: "Recorded and released as a free live recording.",
    youtubeUrl: "https://youtu.be/XJcWAbuCKhA",
    liveSetIndex: 1,
  },
];

/** Setlist entries for a show, each linking back to its track page. */
export function showSetlist(show: ArchiveShow): { title: string; href: string }[] {
  if (show.liveSetIndex === undefined) return [];
  const set = LIVE_SETS[show.liveSetIndex];
  if (!set) return [];
  return liveSetTracks(set).map(({ album, track }) => ({
    title: track.title,
    href: `/${album.slug}/${track.slug}`,
  }));
}

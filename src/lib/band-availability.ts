import { list, put } from "@vercel/blob";
import { BAND_MEMBERS } from "./band-members";

// Availability polls, stored as one private Blob JSON doc, following the
// show-alerts pattern (same store, same BLOB_READ_WRITE_TOKEN). Eight
// people, low contention: last write wins, and each save only rewrites
// the saving member's own answers, so concurrent saves don't clobber
// each other except on the exact same poll at the exact same second.

export const AVAILABILITY_PATH = "band/availability.json";

export type AnswerValue = "yes" | "maybe" | "no";

export interface PollDate {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  label: string;
}

export interface AvailabilityPoll {
  id: string;
  title: string;
  venue: string;
  createdBy: string;
  createdAt: number;
  dates: PollDate[];
}

export interface MemberAnswer {
  [dateId: string]: { value: AnswerValue; note: string; updatedAt: number };
}

export interface AvailabilityDoc {
  polls: AvailabilityPoll[];
  /** answers[pollId][memberSlug] */
  answers: Record<string, Record<string, MemberAnswer>>;
}

export const EMPTY_DOC: AvailabilityDoc = { polls: [], answers: {} };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-12-04" -> "Fri, Dec 4". Parsed as a calendar date, not a timestamp,
 *  so no timezone can shift it to the wrong day. */
export function formatPollDate(date: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const weekday = WEEKDAYS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()];
  return `${weekday}, ${MONTHS[mo - 1]} ${d}`;
}

function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readBlobJson<T>(url: string): Promise<T | null> {
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

function isValidAnswer(v: unknown): v is AnswerValue {
  return v === "yes" || v === "maybe" || v === "no";
}

function cleanDoc(raw: unknown): AvailabilityDoc {
  if (!raw || typeof raw !== "object") return EMPTY_DOC;
  const doc = raw as Partial<AvailabilityDoc>;
  const polls: AvailabilityPoll[] = [];
  if (Array.isArray(doc.polls)) {
    for (const p of doc.polls) {
      if (!p || typeof p !== "object") continue;
      const poll = p as Partial<AvailabilityPoll>;
      if (
        typeof poll.id !== "string" ||
        typeof poll.title !== "string" ||
        !Array.isArray(poll.dates)
      ) {
        continue;
      }
      polls.push({
        id: poll.id,
        title: poll.title,
        venue: typeof poll.venue === "string" ? poll.venue : "",
        createdBy: typeof poll.createdBy === "string" ? poll.createdBy : "",
        createdAt: typeof poll.createdAt === "number" ? poll.createdAt : 0,
        dates: poll.dates
          .filter(
            (d): d is PollDate =>
              !!d &&
              typeof d === "object" &&
              typeof (d as PollDate).id === "string" &&
              typeof (d as PollDate).date === "string" &&
              typeof (d as PollDate).label === "string"
          )
          .slice(0, 12),
      });
    }
  }
  const answers: AvailabilityDoc["answers"] = {};
  if (doc.answers && typeof doc.answers === "object") {
    for (const [pollId, byMember] of Object.entries(doc.answers)) {
      if (!byMember || typeof byMember !== "object") continue;
      const cleanByMember: Record<string, MemberAnswer> = {};
      for (const [slug, ans] of Object.entries(byMember)) {
        if (!BAND_MEMBERS.some((m) => m.slug === slug)) continue;
        if (!ans || typeof ans !== "object") continue;
        const cleanAns: MemberAnswer = {};
        for (const [dateId, entry] of Object.entries(ans)) {
          if (
            entry &&
            typeof entry === "object" &&
            isValidAnswer((entry as { value?: unknown }).value)
          ) {
            cleanAns[dateId] = {
              value: (entry as { value: AnswerValue }).value,
              note:
                typeof (entry as { note?: unknown }).note === "string"
                  ? ((entry as { note: string }).note as string).slice(0, 200)
                  : "",
              updatedAt:
                typeof (entry as { updatedAt?: unknown }).updatedAt === "number"
                  ? (entry as { updatedAt: number }).updatedAt
                  : 0,
            };
          }
        }
        cleanByMember[slug] = cleanAns;
      }
      answers[pollId] = cleanByMember;
    }
  }
  return { polls, answers };
}

export async function readAvailability(): Promise<AvailabilityDoc | null> {
  if (!blobConfigured()) return null;
  try {
    const page = await list({ prefix: AVAILABILITY_PATH, limit: 10 });
    const blobs = page.blobs
      .filter((b) => b.pathname.startsWith(AVAILABILITY_PATH))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    if (blobs.length === 0) return EMPTY_DOC;
    const data = await readBlobJson<unknown>(blobs[0].url);
    return cleanDoc(data);
  } catch {
    return null;
  }
}

export async function writeAvailability(doc: AvailabilityDoc): Promise<boolean> {
  if (!blobConfigured()) return false;
  try {
    await put(AVAILABILITY_PATH, JSON.stringify(doc), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return false;
  }
}

/** How many members answered each way for one date, and who hasn't answered. */
export function summarizeDate(
  doc: AvailabilityDoc,
  pollId: string,
  dateId: string
): { yes: number; maybe: number; no: number; missing: string[] } {
  const byMember = doc.answers[pollId] ?? {};
  let yes = 0;
  let maybe = 0;
  let no = 0;
  const missing: string[] = [];
  for (const m of BAND_MEMBERS) {
    const v = byMember[m.slug]?.[dateId]?.value;
    if (v === "yes") yes += 1;
    else if (v === "maybe") maybe += 1;
    else if (v === "no") no += 1;
    else missing.push(m.name);
  }
  return { yes, maybe, no, missing };
}

export function isAllYes(
  doc: AvailabilityDoc,
  pollId: string,
  dateId: string
): boolean {
  const s = summarizeDate(doc, pollId, dateId);
  return s.yes === BAND_MEMBERS.length;
}

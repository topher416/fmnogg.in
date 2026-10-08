import { NextRequest, NextResponse } from "next/server";
import { readSongProgress, writeSongProgress } from "@/lib/song-quest";

// TEMPORARY one-shot: mark 5 live-performed songs as 100% learned.
// Remove after use.
export async function POST(req: NextRequest) {
  const adminPassword = process.env.ALERTS_ADMIN_TOKEN;
  const { password } = await req.json().catch(() => ({}));
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const current = (await readSongProgress()) ?? {};
  const merged = {
    ...current,
    "optimistic": 100,
    "go-to-sleep": 100,
    "identikit": 100,
    "you-and-whose-army": 100,
    "2-2-5": 100,
  };
  const ok = await writeSongProgress(merged);
  return NextResponse.json({ ok, count: Object.keys(merged).length });
}

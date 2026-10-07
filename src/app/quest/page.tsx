import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import QuestBoard from "@/components/site/QuestBoard";
import { getQuestBoard, getAlbumCoverage, type QuestSong } from "@/lib/song-quest";

export const metadata: Metadata = {
  title: `Song quest — ${BAND.name}`,
  description: `Vote for the next Radiohead song ${BAND.name} learns. When a song hits 100%, we play it at the top-voted bar.`,
  alternates: { canonical: "/quest" },
};

export const revalidate = 3600;

interface AlbumGroup {
  album: string;
  albumSlug: string;
  songs: QuestSong[];
}

export default async function QuestPage() {
  const board = await getQuestBoard();
  const okc = getAlbumCoverage("ok-computer");

  const groups: AlbumGroup[] = [];
  if (board) {
    for (const song of board) {
      const last = groups[groups.length - 1];
      if (last && last.albumSlug === song.albumSlug) {
        last.songs.push(song);
      } else {
        groups.push({ album: song.album, albumSlug: song.albumSlug, songs: [song] });
      }
    }
  }

  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "quest" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Song quest
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          You pick the next song
        </h1>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
          Vote for the song we learn next — one vote per song. When a song
          hits 100%, we play it at whichever bar is winning the{" "}
          <a
            href="/alerts#wanted"
            className="underline underline-offset-2 decoration-white/25 hover:text-white/90 transition-colors"
          >
            Wanted leaderboard
          </a>
          . Voting signs you up for show alerts — one email per show, nothing
          else.
        </p>

        {okc ? (
          <div className="mt-8 border border-[#00ff9f]/25 bg-[#00ff9f]/[0.04] p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#00ff9f]/80">
              The big one
            </p>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-white/85">
              <em>OK Computer</em> turns 30 in May 2027. We&rsquo;re at{" "}
              {okc.pct}% — help us finish the album.
            </p>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              <a
                href="#album-ok-computer"
                className="font-mono text-[0.68rem] text-white/60 underline underline-offset-4 decoration-white/25 hover:text-white/90 transition-colors"
              >
                Vote for its remaining songs ↓
              </a>
              <a
                href="/anniversaries"
                className="font-mono text-[0.68rem] text-white/60 underline underline-offset-4 decoration-white/25 hover:text-white/90 transition-colors"
              >
                All upcoming Radiohead anniversaries →
              </a>
            </p>
          </div>
        ) : null}

        {board === null ? (
          <p className="mt-10 text-[0.95rem] text-white/55">
            The quest board isn&rsquo;t connected yet. Check back soon.
          </p>
        ) : (
          <QuestBoard groups={groups} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

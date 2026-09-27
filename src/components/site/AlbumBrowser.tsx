import Link from "next/link";
import { ALBUMS, recordedTracks } from "@/lib/discography";

/** Discography index: album, year, % of tracks covered. */
export default function AlbumBrowser() {
  return (
    <section aria-label="Discography" className="py-10">
      <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Discography
      </p>
      <ol className="divide-y divide-white/[0.05]">
        {ALBUMS.map((album) => {
          const covered = recordedTracks(album).length;
          const total = album.tracks.length;
          const pct = Math.round((covered / total) * 100);
          return (
            <li key={album.slug}>
              <Link
                href={`/${album.slug}`}
                className="group flex items-baseline gap-4 py-3.5"
                aria-label={`${album.name} (${album.year}) — ${pct}% covered`}
              >
                <span
                  className="h-2 w-2 shrink-0 self-center rounded-[2px]"
                  style={{ backgroundColor: album.color }}
                  aria-hidden
                />
                <span className="flex-1 text-[0.95rem] text-white/80 transition-colors group-hover:text-white">
                  {album.name}
                </span>
                <span className="font-mono text-[0.7rem] tabular-nums text-white/30">
                  {album.year}
                </span>
                <span className="w-11 text-right font-mono text-[0.7rem] tabular-nums text-white/45">
                  {pct}%
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

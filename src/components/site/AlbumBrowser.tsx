import Link from "next/link";
import { ALBUMS, recordedTracks } from "@/lib/discography";

/** Discography index: album, year, % of tracks covered.
 *  Each row's fill runs to the covered % in the album color;
 *  the text layer is duplicated in black and clipped to the fill
 *  (clip-path inset from the right), so letters invert — and split —
 *  exactly where the fill edge crosses them. */
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
          const row = (inverted: boolean) => (
            <span className="flex items-baseline gap-4 py-3.5">
              <span
                className={`flex-1 text-[0.95rem] ${
                  inverted ? "text-black" : "text-white/80 transition-colors group-hover:text-white"
                }`}
              >
                {album.name}
              </span>
              <span
                className={`font-mono text-[0.7rem] tabular-nums ${
                  inverted ? "text-black/60" : "text-white/30"
                }`}
              >
                {album.year}
              </span>
              <span
                className={`w-11 text-right font-mono text-[0.7rem] tabular-nums ${
                  inverted ? "text-black/80" : "text-white/45"
                }`}
              >
                {pct}%
              </span>
            </span>
          );
          return (
            <li key={album.slug}>
              <Link
                href={`/${album.slug}`}
                className="group relative block"
                aria-label={`${album.name} (${album.year}) — ${pct}% covered`}
              >
                {/* fill: album color out to the covered % */}
                <span
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${pct}%`, backgroundColor: album.color }}
                  aria-hidden
                />
                {/* base text: light on black */}
                <span className="relative block">{row(false)}</span>
                {/* inverted text: black, clipped to the fill */}
                <span
                  className="pointer-events-none absolute inset-0 block"
                  style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
                  aria-hidden
                >
                  {row(true)}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

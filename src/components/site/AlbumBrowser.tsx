import Link from "next/link";
import { ALBUMS, recordedTracks } from "@/lib/discography";

/** Discography index: album, year, % of tracks covered.
 *  Each row's fill runs to the covered % in the album color.
 *  The album title is set in SVG with textLength + spacingAndGlyphs,
 *  so its glyphs stretch to fill the full width of the title zone —
 *  edge to edge at any screen size — stopping before the year / %
 *  columns. The whole row (title + year + %) is duplicated in black
 *  and clipped to the fill (clip-path inset from the right), so
 *  letters and numbers invert — and split — exactly where the fill
 *  edge crosses them. */
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
            <span className="flex h-16 items-center gap-5">
              <span className="relative h-full flex-1">
                <svg
                  className={`absolute inset-0 block h-full w-full ${
                    inverted
                      ? "text-black"
                      : "text-white/85 transition-colors group-hover:text-white"
                  }`}
                  viewBox="0 0 1000 64"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <text
                    x="0"
                    y="44"
                    fill="currentColor"
                    fontSize="42"
                    fontWeight="700"
                    textLength="998"
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {album.name.toUpperCase()}
                  </text>
                </svg>
              </span>
              <span
                className={`font-mono text-base font-semibold tabular-nums ${
                  inverted ? "text-black/85" : "text-white/85"
                }`}
              >
                {album.year}
              </span>
              <span
                className={`w-[3.25rem] text-right font-mono text-base font-semibold tabular-nums ${
                  inverted ? "text-black/85" : "text-white/85"
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

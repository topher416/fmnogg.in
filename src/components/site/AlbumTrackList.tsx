import Link from "next/link";
import type { Album } from "@/lib/discography";

/** Full tracklist for one album: covered tracks link out, the rest render dimmed. */
export default function AlbumTrackList({ album }: { album: Album }) {
  return (
    <ol className="list-none">
      {album.tracks.map((track, i) => {
        const num = String(i + 1).padStart(2, "0");
        if (track.covered) {
          return (
            <li key={track.slug}>
              <Link
                href={`/${album.slug}/${track.slug}`}
                className="group grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-md px-3 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <span
                  className="font-mono text-sm text-right tabular-nums"
                  style={{ color: album.color }}
                >
                  {num}
                </span>
                <span
                  className="text-base leading-tight transition-colors text-white/85 group-hover:text-white"
                >
                  {track.title}
                </span>
                <span
                  className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors text-white/30 group-hover:text-white/70"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden>
                    <polygon points="7,5 19,12 7,19" />
                  </svg>
                  Watch
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li
            key={track.slug}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3 px-3 py-3"
          >
            <span className="font-mono text-sm text-right tabular-nums text-white/15">
              {num}
            </span>
            <span className="text-base leading-tight text-white/25">{track.title}</span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/15">
              not yet
            </span>
          </li>
        );
      })}
    </ol>
  );
}

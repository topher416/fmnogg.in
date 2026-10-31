"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Album } from "@/lib/discography";

/**
 * Full tracklist for one album.
 * - Covered tracks link to their video page.
 * - Tracks with a recording (but no video) get an inline player.
 *   Live recordings are labelled "Live"; other recordings get no label.
 * - Covered tracks that also have a recording show a dot.
 * - Uncovered tracks render quietly, without a label.
 */
export default function AlbumTrackList({ album }: { album: Album }) {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const toggleLive = (i: number) => {
    const el = audioRefs.current[i];
    if (!el) return;
    if (playing === i) {
      el.pause();
      setPlaying(null);
    } else {
      audioRefs.current.forEach((a, j) => {
        if (a && j !== i) a.pause();
      });
      el.play();
      setPlaying(i);
    }
  };

  return (
    <ol className="list-none">
      {album.tracks.map((track, i) => {
        const num = String(i + 1).padStart(2, "0");

        // Recording-only track (no video): inline player replaces "not yet".
        // liveAudio tracks keep the "Live" label; recording tracks get none.
        const audioSrc = track.liveAudio ?? track.recording;
        if (!track.covered && audioSrc) {
          const isPlaying = playing === i;
          return (
            <li
              key={track.slug}
              className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-md px-3 py-3 transition-colors ${
                isPlaying ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span
                className="font-mono text-sm text-right tabular-nums"
                style={{ color: album.color }}
              >
                {num}
              </span>
              <span className="text-base leading-tight text-white/85">
                {track.title}
              </span>
              <span className="flex items-center gap-2">
                {track.liveAudio && (
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#00ff9f]/80">
                    Live
                  </span>
                )}
                <button
                  onClick={() => toggleLive(i)}
                  aria-label={isPlaying ? `Pause ${track.title}${track.liveAudio ? " (live)" : ""}` : `Play ${track.title}${track.liveAudio ? " (live)" : ""}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00ff9f]/50 hover:text-[#00ff9f]"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden>
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden>
                      <polygon points="7,5 19,12 7,19" />
                    </svg>
                  )}
                </button>
                <audio
                  ref={(el) => {
                    audioRefs.current[i] = el;
                  }}
                  src={audioSrc}
                  preload="none"
                  onEnded={() => setPlaying(null)}
                  className="hidden"
                />
              </span>
            </li>
          );
        }

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
                <span className="text-base leading-tight transition-colors text-white/85 group-hover:text-white">
                  {track.title}
                  {(track.liveAudio || track.recording) && (
                    <span
                      className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#00ff9f]/70 align-middle"
                      title={track.liveAudio ? "Live recording available" : "Recording available"}
                    />
                  )}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors text-white/30 group-hover:text-white/70">
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
            className="grid grid-cols-[28px_1fr] items-center gap-3 px-3 py-2.5"
          >
            <span className="font-mono text-sm text-right tabular-nums text-white/15">
              {num}
            </span>
            <span className="text-[0.95rem] leading-tight text-white/25">
              {track.title}
            </span>
          </li>
        );
      })}
    </ol>
  );
}


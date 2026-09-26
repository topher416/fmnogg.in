"use client";

import { useRef, useState } from "react";
import { LIVE_SETS, liveSetTracks, type Track } from "@/lib/discography";

/**
 * Prominent homepage section: the Montrose Saloon live set.
 * Date + venue header, then a tracklist with inline audio players.
 * One player at a time: starting a track pauses the others.
 */
export default function LiveSet() {
  const set = LIVE_SETS[0];
  const entries = liveSetTracks(set);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const toggle = (i: number) => {
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
    <section className="border-b border-white/[0.06] bg-white/[0.012]">
      <div className="max-w-[1000px] mx-auto px-5 py-12 sm:py-16">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ff9f] animate-pulse" aria-hidden />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#00ff9f]">
            Live recording
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-playfair)] font-bold text-[#f0ece6] leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>
          {set.title}
        </h2>
        <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/50">
          {set.date} · {set.venue} · {set.city}
        </p>
        <p className="mt-4 max-w-[44rem] text-[0.95rem] leading-relaxed text-white/55 font-[family-name:var(--font-playfair)] italic">
          The full set, recorded from the room. Ten songs, no overdubs.
        </p>

        {/* Tracklist */}
        <ol className="mt-8 list-none rounded-lg border border-white/[0.07] overflow-hidden">
          {entries.map(({ album, track }, i) => (
            <TrackRow
              key={track.slug}
              index={i}
              track={track}
              albumName={album.name}
              albumColor={album.color}
              isPlaying={playing === i}
              onToggle={() => toggle(i)}
              audioRef={(el) => {
                audioRefs.current[i] = el;
              }}
              onEnded={() => setPlaying(null)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrackRow({
  index,
  track,
  albumName,
  albumColor,
  isPlaying,
  onToggle,
  audioRef,
  onEnded,
}: {
  index: number;
  track: Track;
  albumName: string;
  albumColor: string;
  isPlaying: boolean;
  onToggle: () => void;
  audioRef: (el: HTMLAudioElement | null) => void;
  onEnded: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <li
      className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 px-4 py-3 transition-colors ${
        index !== 0 ? "border-t border-white/[0.05]" : ""
      } ${isPlaying ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"}`}
    >
      <span
        className="font-mono text-sm text-right tabular-nums"
        style={{ color: albumColor }}
      >
        {num}
      </span>
      <div className="min-w-0">
        <p className="text-[0.95rem] leading-tight text-white/90 truncate">
          {track.title}
        </p>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/30 mt-0.5">
          {albumName}
        </p>
      </div>
      <button
        onClick={onToggle}
        aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00ff9f]/50 hover:text-[#00ff9f]"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
            <polygon points="7,5 19,12 7,19" />
          </svg>
        )}
      </button>
      {/* Hidden audio element; controlled by the play button above */}
      <audio
        ref={audioRef}
        src={track.liveAudio}
        preload="metadata"
        onEnded={onEnded}
        className="hidden"
      />
    </li>
  );
}

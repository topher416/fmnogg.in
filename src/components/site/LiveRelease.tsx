"use client";

import { useRef, useState } from "react";
import { LIVE_SETS, liveSetTracks } from "@/lib/discography";

/** A live recording, presented like a release: title, date, tracks. */
export default function LiveRelease() {
  const set = LIVE_SETS[0];
  const entries = liveSetTracks(set);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const toggle = (i: number) => {
    const el = audioRefs.current[i];
    if (!el) return;
    if (playing === i) {
      el.pause();
      setPlaying(null);
    } else {
      if (playing !== null) audioRefs.current[playing]?.pause();
      el.play().catch(() => {});
      setPlaying(i);
    }
  };

  return (
    <section
      aria-label="Live recording"
      className="border-b border-white/[0.06] py-10"
    >
      <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Live
      </p>
      <h2 className="text-[1.35rem] font-semibold leading-snug text-white/90">
        {set.title}
      </h2>
      <p className="mt-1 font-mono text-[0.72rem] text-white/40">
        {set.date} · {set.venue}, {set.city}
      </p>

      <ol className="mt-6 divide-y divide-white/[0.05]">
        {entries.map(({ track }, i) => {
          if (!track.liveAudio) return null;
          const isPlaying = playing === i;
          return (
            <li
              key={track.slug}
              className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-2.5"
            >
              <span className="text-right font-mono text-sm tabular-nums text-white/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[0.95rem] leading-tight transition-colors ${
                  isPlaying ? "text-white" : "text-white/75"
                }`}
              >
                {track.title}
              </span>
              <button
                onClick={() => toggle(i)}
                aria-label={
                  isPlaying ? `Pause ${track.title}` : `Play ${track.title}`
                }
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                  isPlaying
                    ? "border-[#00ff9f]/60 text-[#00ff9f]"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="13"
                    height="13"
                    aria-hidden
                  >
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="13"
                    height="13"
                    aria-hidden
                  >
                    <polygon points="7,5 19,12 7,19" />
                  </svg>
                )}
              </button>
              <audio
                ref={(el) => {
                  audioRefs.current[i] = el;
                }}
                src={track.liveAudio}
                preload="none"
                onEnded={() => setPlaying(null)}
                className="hidden"
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

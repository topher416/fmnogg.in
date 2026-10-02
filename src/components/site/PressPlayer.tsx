"use client";

import { useRef, useState } from "react";

export interface PressTrack {
  title: string;
  note: string;
  src: string;
}

/** Compact play/pause rows for the press kit's featured live tracks. */
export default function PressPlayer({ tracks }: { tracks: PressTrack[] }) {
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
    <ol className="mt-4 divide-y divide-white/[0.05]">
      {tracks.map((t, i) => {
        const isPlaying = playing === i;
        return (
          <li
            key={t.src}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-2.5"
          >
            <span className="text-right font-mono text-sm tabular-nums text-white/25">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span
                className={`block truncate text-[0.95rem] leading-tight transition-colors ${
                  isPlaying ? "text-white" : "text-white/75"
                }`}
              >
                {t.title}
              </span>
              <span className="block truncate font-mono text-[0.65rem] text-white/35">
                {t.note}
              </span>
            </span>
            <button
              onClick={() => toggle(i)}
              aria-label={isPlaying ? `Pause ${t.title}` : `Play ${t.title}`}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                isPlaying
                  ? "border-[#00ff9f]/60 text-[#00ff9f]"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <rect x="1" y="1" width="3.5" height="10" />
                  <rect x="7.5" y="1" width="3.5" height="10" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2 1l9 5-9 5z" />
                </svg>
              )}
            </button>
            <audio
              ref={(el) => {
                audioRefs.current[i] = el;
              }}
              src={t.src}
              preload="none"
              onEnded={() => setPlaying(null)}
              className="hidden"
            />
          </li>
        );
      })}
    </ol>
  );
}

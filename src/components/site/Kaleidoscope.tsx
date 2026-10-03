"use client";

import { useEffect, useState } from "react";

// Kaleidoscope: one moment mirrored. Two layouts:
// - square: 4x4 (desktop) / 2x2 (mobile) — the sidebar piece
// - strip: 8x2 (desktop) / 4x2 (mobile) — horizontal section dividers
// Every 5s the whole thing turns to a new moment. Animated WebP, just img tags.

const CLIPS = [
  "k-user-sing", "k-user-strum", "k-hannah", "k-drew", "k-singers",
  "k-head", "k-bass", "k-drums", "k-keys",
  "b-user-sing", "b-user-strum", "b-hannah", "b-drew", "b-singers",
  "b-head", "b-bass", "b-drums", "b-keys",
];

const webp = (f: string) => `/motion/candidates/webp/${f}.webp`;

// One image mirrored.
const MIRRORS_4X4 = [
  "", "scaleX(-1)", "scaleX(-1)", "",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleY(-1)",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleY(-1)",
  "", "scaleX(-1)", "scaleX(-1)", "",
];

const MIRRORS_2X2 = [
  "", "scaleX(-1)",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)",
];

// Strip: 2x2 block repeated horizontally — a mirrored ribbon.
const MIRRORS_STRIP_8X2 = [
  "", "scaleX(-1)", "", "scaleX(-1)", "", "scaleX(-1)", "", "scaleX(-1)",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleY(-1)", "scaleX(-1) scaleY(-1)",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleY(-1)", "scaleX(-1) scaleY(-1)",
];

const MIRRORS_STRIP_4X2 = [
  "", "scaleX(-1)", "", "scaleX(-1)",
  "scaleY(-1)", "scaleX(-1) scaleY(-1)", "scaleY(-1)", "scaleX(-1) scaleY(-1)",
];

const INITIALS = ["k-user-sing", "k-hannah", "k-drew", "k-singers", "k-bass", "k-drums"];

export default function Kaleidoscope({
  seed = 0,
  compact = false,
  strip = false,
}: {
  seed?: number;
  compact?: boolean;
  strip?: boolean;
}) {
  const MIRRORS = strip
    ? compact
      ? MIRRORS_STRIP_4X2
      : MIRRORS_STRIP_8X2
    : compact
      ? MIRRORS_2X2
      : MIRRORS_4X4;
  const cols = strip ? (compact ? "grid-cols-4" : "grid-cols-8") : compact ? "grid-cols-2" : "grid-cols-4";

  const [clip, setClip] = useState(INITIALS[seed % INITIALS.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setClip((prev) => {
        let next = prev;
        let guard = 0;
        while (next === prev && guard < 30) {
          next = CLIPS[Math.floor(Math.random() * CLIPS.length)];
          guard++;
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-label="Motion kaleidoscope from the July 17 set" className={`grid ${cols} gap-0 overflow-hidden bg-black`}>
      {MIRRORS.map((transform, i) => (
        <div key={i} className="aspect-square overflow-hidden bg-black">
          <img
            src={webp(clip)}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
            style={{ transform }}
          />
        </div>
      ))}
    </div>
  );
}

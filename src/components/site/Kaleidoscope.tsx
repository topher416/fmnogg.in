"use client";

import { useEffect, useState } from "react";

// Kaleidoscope: 4x4 mirrored grid of animated WebP slices from the July 17 set.
// Four base moments, mirrored into symmetry. Every 5s one position turns.
// WebP (not video): no decoders, instant first frame, just img tags.

const CLIPS = [
  "k-user-sing", "k-user-strum", "k-hannah", "k-drew", "k-singers",
  "k-head", "k-bass", "k-drums", "k-keys",
  "b-user-sing", "b-user-strum", "b-hannah", "b-drew", "b-singers",
  "b-head", "b-bass", "b-drums", "b-keys",
];

const webp = (f: string) => `/motion/candidates/webp/${f}.webp`;
const POOL = CLIPS.map(webp);

// [base index, transform] — TL normal, TR flipX, BL flipY, BR both.
const SLICES_4X4: Array<[number, string]> = [
  [0, ""], [1, ""], [1, "scaleX(-1)"], [0, "scaleX(-1)"],
  [2, ""], [3, ""], [3, "scaleX(-1)"], [2, "scaleX(-1)"],
  [2, "scaleY(-1)"], [3, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [2, "scaleX(-1) scaleY(-1)"],
  [0, "scaleY(-1)"], [1, "scaleY(-1)"], [1, "scaleX(-1) scaleY(-1)"], [0, "scaleX(-1) scaleY(-1)"],
];

const SLICES_2X2: Array<[number, string]> = [
  [0, ""], [1, "scaleX(-1)"],
  [2, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"],
];

const INITIAL = ["k-user-sing", "k-hannah", "k-drew", "k-singers"];

export default function Kaleidoscope({ seed = 0, compact = false }: { seed?: number; compact?: boolean }) {
  const SLICES = compact ? SLICES_2X2 : SLICES_4X4;
  const [base, setBase] = useState<string[]>(() => {
    const names = [...INITIAL];
    for (let i = 0; i < seed; i++) names.push(names.shift()!);
    return names;
  });

  useEffect(() => {
    let rotation = seed;
    const id = setInterval(() => {
      const p = rotation % 4;
      rotation++;
      setBase((prev) => {
        let next = prev[p];
        let guard = 0;
        while (prev.includes(next) && guard < 30) {
          next = CLIPS[Math.floor(Math.random() * CLIPS.length)];
          guard++;
        }
        const updated = [...prev];
        updated[p] = next;
        return updated;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [seed]);

  return (
    <figure aria-label="Motion kaleidoscope from the July 17 set" className="m-0">
      <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-4"} gap-0 overflow-hidden bg-black`}>
        {SLICES.map(([b, transform], i) => (
          <div key={i} className="aspect-square overflow-hidden bg-black">
            <img
              src={webp(base[b])}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
              style={{ transform }}
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        July 17, 2026 — Montrose Saloon
      </figcaption>
    </figure>
  );
}

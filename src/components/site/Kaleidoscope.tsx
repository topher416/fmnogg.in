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

// One image, mirrored. The kaleidoscope effect needs a single moment
// reflected — not four different clips.
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

const INITIAL = "k-user-sing";

export default function Kaleidoscope({ seed = 0, compact = false }: { seed?: number; compact?: boolean }) {
  const MIRRORS = compact ? MIRRORS_2X2 : MIRRORS_4X4;
  const [clip, setClip] = useState(INITIAL);

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
    <figure aria-label="Motion kaleidoscope from the July 17 set" className="m-0">
      <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-4"} gap-0 overflow-hidden bg-black`}>
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
    </figure>
  );
}

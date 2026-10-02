"use client";

import { useEffect, useRef, useState } from "react";

// Simplified kaleidoscope: 4x4 mirrored grid (16 slices) cut from the
// July 17 Montrose set. Four base moments, mirrored into perfect symmetry.
// Every 5 seconds one base position turns, rotating through all four.
// Uses lightweight 360px encodes + poster frames so there's never a black square.

const CLIPS = [
  "k-user-sing", "k-user-strum", "k-hannah", "k-drew", "k-singers",
  "k-head", "k-bass", "k-drums", "k-keys",
  "b-user-sing", "b-user-strum", "b-hannah", "b-drew", "b-singers",
  "b-head", "b-bass", "b-drums", "b-keys",
];

const vid = (f: string) => `/motion/candidates/k360/${f}-360.mp4`;
const poster = (f: string) => `/motion/candidates/posters/${f}.jpg`;
const POOL = CLIPS.map(vid);

// For each of the 16 slices: which base index (0-3) it mirrors, and the CSS transform.
const SLICES: Array<[number, string]> = [
  [0, ""], [1, "scaleX(-1)"], [1, "scaleX(-1)"], [0, ""],
  [2, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [2, "scaleY(-1)"],
  [2, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [2, "scaleY(-1)"],
  [0, ""], [1, "scaleX(-1)"], [1, "scaleX(-1)"], [0, ""],
];

const INITIAL_BASE = ["k-user-sing", "k-hannah", "k-drew", "k-singers"];

export default function Kaleidoscope({ seed = 0 }: { seed?: number }) {
  const [base, setBase] = useState<string[]>(() => {
    // Offset the initial clips by seed so scattered instances don't mirror each other.
    const names = [...INITIAL_BASE];
    for (let i = 0; i < seed; i++) names.push(names.shift()!);
    return names.map(vid);
  });
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const baseRef = useRef(base);
  baseRef.current = base;

  // Stagger start offsets so slices don't all wrap at once.
  useEffect(() => {
    videosRef.current.forEach((v) => {
      if (!v) return;
      const setOffset = () => {
        try {
          if (v.duration && isFinite(v.duration)) {
            v.currentTime = Math.random() * v.duration * 0.85;
          }
        } catch {}
      };
      if (v.readyState >= 1) setOffset();
      else v.addEventListener("loadedmetadata", setOffset, { once: true });
    });
  }, []);

  // Every 5s, rotate to the next base position and deal it a fresh clip.
  useEffect(() => {
    let rotation = seed;
    const id = setInterval(() => {
      const p = rotation % 4;
      rotation++;
      const current = baseRef.current;
      let next = current[p];
      let guard = 0;
      while (current.includes(next) && guard < 30) {
        next = POOL[Math.floor(Math.random() * POOL.length)];
        guard++;
      }
      const updated = [...current];
      updated[p] = next;
      baseRef.current = updated;
      setBase(updated);
    }, 5000);
    return () => clearInterval(id);
  }, [seed]);

  // When a base clip changes, swap its mirrors.
  useEffect(() => {
    videosRef.current.forEach((v, i) => {
      if (!v) return;
      const [b] = SLICES[i];
      const src = base[b];
      if (v.getAttribute("src") !== src) {
        // Update poster to match so there's never a black frame.
        const clip = src.split("/").pop()!.replace("-360.mp4", "");
        v.setAttribute("poster", poster(clip));
        v.src = src;
        v.play().catch(() => {});
      }
    });
  }, [base]);

  const clipName = (src: string) => src.split("/").pop()!.replace("-360.mp4", "");

  return (
    <figure aria-label="Motion kaleidoscope from the July 17 set" className="m-0">
      <div className="grid grid-cols-4 gap-0 overflow-hidden bg-black">
        {SLICES.map(([b, transform], i) => (
          <div key={i} className="aspect-square overflow-hidden bg-black">
            <video
              ref={(el) => {
                videosRef.current[i] = el;
              }}
              className="h-full w-full object-cover"
              style={{ transform }}
              src={base[b]}
              poster={poster(clipName(base[b]))}
              muted
              playsInline
              autoPlay
              preload="auto"
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

"use client";

import { useEffect, useRef, useState } from "react";

// Simplified kaleidoscope: 4x4 mirrored grid (16 slices) cut from the
// July 17 Montrose set. Four base moments, mirrored into perfect symmetry.
// Every 5 seconds one base position turns, rotating through all four.

const POOL = [
  "k-user-sing.mp4", "k-user-strum.mp4", "k-hannah.mp4", "k-drew.mp4", "k-singers.mp4",
  "k-head.mp4", "k-bass.mp4", "k-drums.mp4", "k-keys.mp4",
  "b-user-sing.mp4", "b-user-strum.mp4", "b-hannah.mp4", "b-drew.mp4", "b-singers.mp4",
  "b-head.mp4", "b-bass.mp4", "b-drums.mp4", "b-keys.mp4",
].map((f) => `/motion/candidates/${f}`);

// For each of the 16 slices: which base index (0-3) it mirrors, and the CSS transform.
const SLICES: Array<[number, string]> = [
  [0, ""], [1, "scaleX(-1)"], [1, "scaleX(-1)"], [0, ""],
  [2, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [2, "scaleY(-1)"],
  [2, "scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [3, "scaleX(-1) scaleY(-1)"], [2, "scaleY(-1)"],
  [0, ""], [1, "scaleX(-1)"], [1, "scaleX(-1)"], [0, ""],
];

const INITIAL_BASE = [
  "/motion/candidates/k-user-sing.mp4",
  "/motion/candidates/k-hannah.mp4",
  "/motion/candidates/k-drew.mp4",
  "/motion/candidates/k-singers.mp4",
];

export default function Kaleidoscope() {
  const [base, setBase] = useState<string[]>(INITIAL_BASE);
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
    let rotation = 0;
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
  }, []);

  // When a base clip changes, play its mirrors from the top.
  useEffect(() => {
    videosRef.current.forEach((v, i) => {
      if (!v) return;
      const [b] = SLICES[i];
      const src = base[b];
      if (v.getAttribute("src") !== src) {
        v.src = src;
        v.play().catch(() => {});
      }
    });
  }, [base]);

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

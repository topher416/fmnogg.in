import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion — candidates",
  description: "Internal preview: candidate motion-collage clips from the July 17, 2026 Montrose Saloon set.",
  robots: { index: false, follow: false },
};

const CLIPS = [
  { file: "c1-guitar-left.mp4", label: "c1 — stage-left guitar", sub: "set ~1:42 · tight on the electric, red wash" },
  { file: "c2-vocal-cluster.mp4", label: "c2 — vocal cluster", sub: "set ~7:27 · three singers, mics, curtain" },
  { file: "c3-guitar-mid.mp4", label: "c3 — mid three players", sub: "set ~14:47 · center-left, blown red" },
  { file: "c4-bass.mp4", label: "c4 — bass, head down", sub: "set ~18:12 · low over the instrument" },
  { file: "c5-vocal-light.mp4", label: "c5 — vocalist at mic", sub: "set ~23:57 · singing, band beside her" },
  { file: "c6-ensemble.mp4", label: "c6 — ensemble wide", sub: "set ~27:02 · full stage, everyone at once" },
  { file: "c7-guitar-tight.mp4", label: "c7 — guitar, tighter", sub: "set ~36:22 · stage-left, late set" },
  { file: "c8-vocal-blue.mp4", label: "c8 — vocalist + group", sub: "set ~39:22 · acoustic up front, late set" },
];

export default function MotionPreview() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e4dc] px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-2xl mb-3">site motion — candidate moments</h1>
        <p className="text-sm leading-relaxed text-[#a09a8e] max-w-2xl mb-2">
          Eight 25-second crops from the July 17 Montrose set, all graded the same blown-out
          treatment. Muted, looping. Which ones feel alive — and what&rsquo;s missing?
        </p>
        <p className="text-sm leading-relaxed text-[#a09a8e] max-w-2xl mb-8">
          Next round: the picks get cut from the <em>same</em> stretch of the set so every
          tile moves in sync.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIPS.map((c) => (
            <figure key={c.file} className="bg-[#111] border border-[#222]">
              <video
                src={`/motion/candidates/${c.file}`}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="block w-full aspect-[20/17] object-cover bg-black"
              />
              <figcaption className="px-3 py-3 text-[13px] leading-snug">
                <div>{c.label}</div>
                <div className="text-[#8a8478]">{c.sub}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}

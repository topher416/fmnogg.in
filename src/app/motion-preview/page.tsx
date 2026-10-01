import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion — candidates",
  description: "Internal preview: candidate motion-collage clips from the July 17, 2026 Montrose Saloon set.",
  robots: { index: false, follow: false },
};

const CLIPS = [
  { file: "x1-bass-hand.mp4", label: "x1 — bass, picking hand", sub: "set ~1:42 · low on the strings" },
  { file: "x2-acoustic-strum.mp4", label: "x2 — acoustic, strumming", sub: "set ~7:27 · hand on the body" },
  { file: "x3-electric-hands.mp4", label: "x3 — electrics, two players", sub: "set ~14:47 · hands on guitars" },
  { file: "x4-singer-face.mp4", label: "x4 — singers at the mics", sub: "set ~18:12 · three faces, red curtain" },
  { file: "x5-vocalist-face.mp4", label: "x5 — vocalist, close", sub: "set ~23:57 · singing, band beside her" },
  { file: "x6-guitar2-hands.mp4", label: "x6 — guitar, reaching arm", sub: "set ~27:02 · hand and neck" },
  { file: "x7-bassist-head.mp4", label: "x7 — bassist, head nodding", sub: "set ~36:22 · profile, keeping time" },
  { file: "x8-crowd-arm.mp4", label: "x8 — crowd, arm moving", sub: "set ~7:27 · foreground silhouette" },
];

export default function MotionPreview() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e4dc] px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-2xl mb-3">site motion — round 2, extreme close-ups</h1>
        <p className="text-sm leading-relaxed text-[#a09a8e] max-w-2xl mb-2">
          Eight 25-second crops, much tighter this time — hands, faces, one crowd arm.
          Blown out and chunky on purpose. Muted, looping.
        </p>
        <p className="text-sm leading-relaxed text-[#a09a8e] max-w-2xl mb-8">
          Tell me which ones feel alive. Next round: the picks get cut from the{" "}
          <em>same</em> stretch of the set so every tile moves in sync.
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
                className="block w-full aspect-square object-cover bg-black"
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

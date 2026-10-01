import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion — candidates",
  description: "Internal preview: candidate motion-collage clips from the July 17, 2026 Montrose Saloon set.",
  robots: { index: false, follow: false },
};

const CLIPS = [
  { file: "y1-bass-hand.mp4", label: "y1 — bassist, on the strings", sub: "set ~1:42 · picking hand, red shirt" },
  { file: "y2-acoustic-strum.mp4", label: "y2 — acoustic, strumming hand", sub: "set ~7:27 · tight on the hand" },
  { file: "y3-electric-hands.mp4", label: "y3 — electrics, two players", sub: "set ~14:47 · hands on guitars" },
  { file: "y4-singer-face.mp4", label: "y4 — singers at the mics", sub: "set ~18:12 · two faces, red curtain" },
  { file: "y5-vocalist-face.mp4", label: "y5 — vocalist, close", sub: "set ~23:57 · singing, band beside her" },
  { file: "y6-guitar-arm.mp4", label: "y6 — guitar, hand and neck", sub: "set ~27:02 · reaching arm" },
  { file: "y7-bassist-head.mp4", label: "y7 — bassist, head nodding", sub: "set ~36:22 · profile, keeping time" },
  { file: "y8-drums.mp4", label: "y8 — drums, sticks in motion", sub: "set ~25:00 · behind the guitars" },
  { file: "y9-keys.mp4", label: "y9 — keys, hands on the boards", sub: "set ~12:00 · darkest corner, runs a touch brighter" },
];

export default function MotionPreview() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e4dc] px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-2xl mb-3">site motion — round 3, closer + drums &amp; keys</h1>
        <p className="text-sm leading-relaxed text-[#a09a8e] max-w-2xl mb-2">
          Nine 25-second crops, tighter than round 2 — the drummer and the keys
          player are in this time, both half-hidden in the wide shot and pulled
          out close. Blown out and chunky on purpose. Muted, looping.
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

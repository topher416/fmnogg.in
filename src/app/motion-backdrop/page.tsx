import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion — backdrop studies",
  description: "Internal preview: fullscreen backdrop arrangements of the motion collage.",
  robots: { index: false, follow: false },
};

const SRC = (f: string) => `/motion/candidates/${f}`;

function Tile({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <div className={`relative min-h-0 min-w-0 overflow-hidden bg-black ${className}`}>
      <video
        src={SRC(src)}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute left-2 top-2 bg-black/45 px-1.5 py-0.5 text-[10px] tracking-[0.18em] text-white/60">
        {label}
      </span>
    </div>
  );
}

const TILES = [
  { src: "y8-drums.mp4", label: "DRUMS", cls: "drums" },
  { src: "y4-singer-face.mp4", label: "SINGERS", cls: "singers" },
  { src: "y2-acoustic-strum.mp4", label: "STRUM", cls: "strum" },
  { src: "y5-vocalist-face.mp4", label: "VOCALIST", cls: "vocalist" },
  { src: "y1-bass-hand.mp4", label: "BASS", cls: "bass" },
  { src: "y3-electric-hands.mp4", label: "ELECTRICS", cls: "electrics" },
  { src: "y6-guitar-arm.mp4", label: "GUITAR", cls: "guitar" },
  { src: "y7-bassist-head.mp4", label: "HEAD NOD", cls: "head" },
  { src: "y9-keys.mp4", label: "KEYS", cls: "keys" },
];

export default function MotionBackdrop() {
  return (
    <main className="bg-[#0a0a0a] text-[#e8e4dc]">
      <style>{`
        .wall { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(6, minmax(0, 1fr)); height: 100svh; gap: 2px; background: #000; }
        .wall .drums    { grid-area: 1 / 1 / 4 / 5; }
        .wall .singers  { grid-area: 1 / 5 / 3 / 10; }
        .wall .strum    { grid-area: 1 / 10 / 3 / 13; }
        .wall .vocalist { grid-area: 3 / 5 / 5 / 9; }
        .wall .bass     { grid-area: 3 / 9 / 5 / 13; }
        .wall .electrics{ grid-area: 4 / 1 / 7 / 5; }
        .wall .guitar   { grid-area: 5 / 5 / 7 / 8; }
        .wall .head     { grid-area: 5 / 8 / 7 / 10; }
        .wall .keys     { grid-area: 5 / 10 / 7 / 13; }
        @media (max-width: 768px) {
          .wall { grid-template-columns: repeat(2, 1fr); grid-template-rows: none; grid-auto-rows: 44svw; height: auto; min-height: 100svh; }
          .wall > div { grid-area: auto !important; }
          .wall .drums { grid-column: span 2; grid-row: span 2; }
        }
        .cluster { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .cluster > div { aspect-ratio: 1 / 1; }
      `}</style>

      {/* intro */}
      <div className="mx-auto max-w-3xl px-5 pb-10 pt-12">
        <h1 className="mb-3 font-serif text-2xl">backdrop studies</h1>
        <p className="mb-2 max-w-2xl text-sm leading-relaxed text-[#a09a8e]">
          Two ways the nine round-3 clips could live as a fullscreen site backdrop.
          These studies use the survey clips, each cut from a different moment —
          the real thing gets cut from a <em>single</em> window so every tile
          breathes in sync.
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-[#a09a8e]">
          Tiny labels are just so we can talk about tiles by name; they come off
          in the real build.
        </p>
      </div>

      {/* 01 — the wall */}
      <div className="px-5 pb-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-[11px] tracking-[0.25em] text-[#8a8478]">01 — THE WALL</div>
          <p className="mt-1 max-w-2xl text-sm text-[#a09a8e]">
            Full-bleed mosaic, edge to edge. Drums anchor the left, singers burn
            across the top. Type sits on top of the motion.
          </p>
        </div>
      </div>
      <section aria-label="study 1: full-bleed mosaic" className="relative">
        <div className="wall">
          {TILES.map((t) => (
            <Tile key={t.src} src={t.src} label={t.label} className={t.cls} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-5 py-4 text-[11px] tracking-[0.25em] text-white/70 md:px-8">
          <span>a thousand feet per second</span>
          <span className="hidden sm:inline">music&ensp;·&ensp;shows&ensp;·&ensp;about</span>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 pb-8 md:px-8 md:pb-10">
          <h2 className="font-serif text-[11vw] leading-[0.95] text-[#f2ede3] md:text-[6.5vw]">
            a thousand feet
            <br />
            per second
          </h2>
          <p className="mt-3 text-[11px] tracking-[0.25em] text-white/60">
            OCTOBER 9&ensp;·&ensp;MONTROSE SALOON&ensp;·&ensp;CHICAGO
          </p>
        </div>
      </section>

      {/* 02 — negative space */}
      <div className="px-5 pb-4 pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-[11px] tracking-[0.25em] text-[#8a8478]">02 — NEGATIVE SPACE</div>
          <p className="mt-1 max-w-2xl text-sm text-[#a09a8e]">
            The collage holds the right side as one tight block; the left stays
            empty for type. Quieter, more poster-like.
          </p>
        </div>
      </div>
      <section
        aria-label="study 2: collage with negative space"
        className="flex min-h-[100svh] flex-col justify-center gap-10 px-5 py-16 md:flex-row md:items-center md:gap-16 md:px-12"
      >
        <div className="md:w-[42%]">
          <p className="mb-4 text-[11px] tracking-[0.25em] text-white/60">
            OCTOBER 9&ensp;·&ensp;MONTROSE SALOON&ensp;·&ensp;CHICAGO
          </p>
          <h2 className="font-serif text-[13vw] leading-[0.95] text-[#f2ede3] md:text-[5.2vw]">
            a thousand feet
            <br />
            per second
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#a09a8e]">
            Eight musicians playing Radiohead loud in a small room, cut into
            nine pieces and set moving behind the words.
          </p>
        </div>
        <div className="md:w-[52%]">
          <div className="cluster">
            {TILES.map((t) => (
              <Tile key={t.src} src={t.src} label={t.label} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-sm leading-relaxed text-[#a09a8e]">
          Tell me which direction — or what to steal from each. Next step after
          that: one 25-second window, all nine tiles cut from it, playing in sync.
        </p>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('video').forEach(function(v){v.pause();});`,
        }}
      />
    </main>
  );
}

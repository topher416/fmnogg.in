import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion backdrop — study",
  robots: { index: false, follow: false },
};

// (subject, chunky, dither, smooth, height svh, width fr)
const SLICES: Array<[string, string, string, string, number, number]> = [
  ["drums", "y8-drums.mp4", "d8-drums.mp4", "e8-drums.mp4", 92, 1.5],
  ["singers", "y4-singer-face.mp4", "d4-singer-face.mp4", "e4-singer-face.mp4", 68, 1.0],
  ["strum", "y2-acoustic-strum.mp4", "d2-acoustic-strum.mp4", "e2-acoustic-strum.mp4", 100, 0.85],
  ["vocalist", "y5-vocalist-face.mp4", "d5-vocalist-face.mp4", "e5-vocalist-face.mp4", 76, 1.25],
  ["bass", "y1-bass-hand.mp4", "d1-bass-hand.mp4", "e1-bass-hand.mp4", 88, 0.95],
  ["electrics", "y3-electric-hands.mp4", "d3-electric-hands.mp4", "e3-electric-hands.mp4", 62, 1.35],
  ["guitar", "y6-guitar-arm.mp4", "d6-guitar-arm.mp4", "e6-guitar-arm.mp4", 96, 0.8],
  ["head", "y7-bassist-head.mp4", "d7-bassist-head.mp4", "e7-bassist-head.mp4", 72, 0.95],
  ["keys", "y9-keys.mp4", "d9-keys.mp4", "e9-keys.mp4", 84, 1.15],
];

const TREATMENTS = [
  ["chunky", "chunky"],
  ["dither", "dither"],
  ["smooth", "smooth"],
  ["blur", "blur"],
] as const;

export default function MotionBackdrop() {
  const cols = SLICES.map((s) => `${s[5]}fr`).join(" ");
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* intro */}
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          <a href="/" className="underline underline-offset-4 hover:text-white/70">home</a>
          {"  ·  "}motion backdrop — study 03
        </p>
        <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
          negative space, rebuilt as irregular vertical slices.
        </h1>
        <p className="mt-5 text-white/60 leading-relaxed">
          No labels. Nine slices of different widths and heights, bottom-aligned so the
          tops stagger. Flip between the four treatments below — chunky is the raw
          nearest-neighbor upscale, dither is 32-color ordered Bayer, smooth is a
          lanczos upscale with sharpening, blur is a soft CSS pass. The pixelation
          should read as a decision, not a limitation.
        </p>
        <p className="mt-3 text-white/40 text-sm leading-relaxed">
          Still survey clips from different moments — the final build gets cut from one
          25-second window so all nine slices move in sync.
        </p>
      </header>

      {/* treatment switcher */}
      <div className="sticky top-0 z-20 border-y border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-3">
          <span className="mr-2 text-[11px] uppercase tracking-[0.25em] text-white/40">treatment</span>
          {TREATMENTS.map(([key, label]) => (
            <button
              key={key}
              data-treat-btn={key}
              aria-pressed={key === "chunky" ? "true" : "false"}
              className="treat-btn rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors border-white/25 text-white/60 hover:border-white/60 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* the study */}
      <section id="study" className="flex min-h-[100svh] flex-col md:flex-row">
        {/* left: type */}
        <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-10 pt-24 md:w-[38%] md:px-12 md:pb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
            live at montrose saloon — july 17, 2026
          </p>
          <h2 className="mt-4 text-[13vw] font-black leading-[0.85] tracking-tight md:text-[6.5vw]">
            a thousand
            <br />
            feet per
            <br />
            second
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            eight musicians. radiohead, deep cuts.
            <br />
            <span className="text-white/90">friday october 9 — montrose saloon, chicago.</span>
          </p>
        </div>

        {/* right: slices */}
        <div className="relative w-full md:w-[62%]">
          <div
            id="slices"
            className="flex h-[72svh] gap-1 overflow-x-auto px-2 pb-2 md:grid md:h-[100svh] md:gap-[3px] md:overflow-visible md:px-0 md:pb-0"
            style={{ gridTemplateColumns: cols }}
          >
            {SLICES.map(([subject, chunky, dither, smooth, h]) => (
              <div
                key={subject}
                className="slice snap-center relative w-[62vw] shrink-0 self-end overflow-hidden bg-neutral-950 md:w-auto"
                style={{ height: `${h}svh` }}
              >
                <video
                  className="slice-video h-full w-full object-cover"
                  data-chunky={`/motion/candidates/${chunky}`}
                  data-dither={`/motion/candidates/${dither}`}
                  data-smooth={`/motion/candidates/${smooth}`}
                  data-blur={`/motion/candidates/${chunky}`}
                  src={`/motion/candidates/${chunky}`}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-white/40 leading-relaxed">
          Pick a treatment — or mix them (dither on the drums, blur on the faces, etc.).
          Once the treatment and the slice rhythm feel right, the final cut comes from
          one 25-second window, in sync.
        </p>
      </footer>

      <style>{`
        .slice-video.blurred { filter: blur(3px) saturate(1.3); }
        .treat-btn.active-treat { border-color: #fff !important; background: #fff; color: #000 !important; }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var btns = Array.prototype.slice.call(document.querySelectorAll('[data-treat-btn]'));
              var vids = Array.prototype.slice.call(document.querySelectorAll('#slices video'));
              function setTreatment(name){
                vids.forEach(function(v){
                  var src = v.getAttribute('data-' + name);
                  if (src && v.getAttribute('src') !== src) {
                    v.src = src;
                    try { v.load(); var p = v.play(); if (p && p.catch) p.catch(function(){}); } catch(e) {}
                  }
                  v.classList.toggle('blurred', name === 'blur');
                });
                btns.forEach(function(b){
                  var on = b.getAttribute('data-treat-btn') === name;
                  b.classList.toggle('active-treat', on);
                  b.setAttribute('aria-pressed', on ? 'true' : 'false');
                });
              }
              btns.forEach(function(b){
                b.addEventListener('click', function(){ setTreatment(b.getAttribute('data-treat-btn')); });
              });
              // reduced motion: pause everything
              if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                vids.forEach(function(v){ v.pause(); v.removeAttribute('autoplay'); });
              }
              setTreatment('chunky');
            })();
          `,
        }}
      />
    </main>
  );
}

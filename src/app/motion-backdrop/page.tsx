import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion backdrop — study",
  robots: { index: false, follow: false },
};

// Simplified kaleidoscope: 4x4 grid (16 slices), built from a 2x2 base
// of 4 clips, mirrored horizontally and vertically for perfect symmetry.
// [file, transform] — base has no transforms; buildKaleido applies the mirrors.
const KALEIDO_BASE: Array<[string, string]> = [
  ["k-user-sing.mp4", ""],
  ["k-hannah.mp4", ""],
  ["k-drew.mp4", ""],
  ["k-singers.mp4", ""],
];
// Mirror the 2x2 base into 4 quadrants: TL normal, TR flipX, BL flipY, BR flipXY
function buildKaleido(): Array<[string, string]> {
  const [a, b, c, d] = KALEIDO_BASE;
  const flipX = (t: string) => (t ? t + " scaleX(-1)" : "scaleX(-1)");
  const flipY = (t: string) => (t ? t + " scaleY(-1)" : "scaleY(-1)");
  // TL: a b / c d | TR: b' a' / d' c' | BL: c'' d'' / a'' b'' | BR: d''' c''' / b''' a'''
  return [
    a, b, [b[0], flipX(b[1])], [a[0], flipX(a[1])],
    c, d, [d[0], flipX(d[1])], [c[0], flipX(c[1])],
    [c[0], flipY(c[1])], [d[0], flipY(d[1])], [d[0], flipX(flipY(d[1]))], [c[0], flipX(flipY(c[1]))],
    [a[0], flipY(a[1])], [b[0], flipY(b[1])], [b[0], flipX(flipY(b[1]))], [a[0], flipX(flipY(a[1]))],
  ];
}
const KALEIDO = buildKaleido();

// Pool: every clip the deck can draw from (batch 1: 7:20 peak, batch 2: 14:40 peak)
const POOL = [
  "k-user-sing.mp4", "k-user-strum.mp4", "k-hannah.mp4", "k-drew.mp4", "k-singers.mp4",
  "k-head.mp4", "k-bass.mp4", "k-drums.mp4", "k-keys.mp4",
  "b-user-sing.mp4", "b-user-strum.mp4", "b-hannah.mp4", "b-drew.mp4", "b-singers.mp4",
  "b-head.mp4", "b-bass.mp4", "b-drums.mp4", "b-keys.mp4",
];

export default function MotionBackdrop() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* intro */}
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          <a href="/" className="underline underline-offset-4 hover:text-white/70">home</a>
          {"  ·  "}motion backdrop — study 03
        </p>
        <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
          a quiet kaleidoscope.
        </h1>
        <p className="mt-5 text-white/60 leading-relaxed">
          Sixteen slices from the set (7:12–7:37, 14:30–14:55) — four
          moments mirrored into perfect symmetry. Every five seconds the
          deck turns one slice, rotating through all four, so the
          kaleidoscope is always becoming. 24-color ordered Bayer dither
          throughout.
        </p>
      </header>

      {/* the collage */}
      <section id="study">
        <div className="px-6 pb-8 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
            live at montrose saloon — july 17, 2026
          </p>
          <h2 className="mt-4 text-[11vw] font-black leading-[0.85] tracking-tight md:text-[5vw]">
            a thousand feet per second
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            <span className="text-white/90">friday october 9 — montrose saloon, chicago.</span>
          </p>
        </div>
        <div className="mx-auto max-w-xl px-6">
          <div id="kaleido" className="grid grid-cols-4 gap-0 bg-black">
            {KALEIDO.map(([file, transform], i) => (
              <div key={i} className="overflow-hidden bg-black aspect-square">
                <video
                  className="deck-video h-full w-full object-cover"
                  style={{ transform }}
                  src={`/motion/candidates/${file}`}
                  muted playsInline autoPlay preload="auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">rotoscope tests</p>
        <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-tight">
          What if it's not video at all?
        </h2>
        <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
          Two 5-second animation tests, drawn from the singers clip — every frame
          restyled, held on twos like limited animation. If the footage becomes
          animation, resolution stops being a question. Paint is bold and stained-glass;
          pencil is lighter, more ethereal.
        </p>
        <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
          And two from the opposite direction — no transformation, just an honest,
          consistent grade with film grain: <em className="text-white/80 not-italic underline decoration-white/30 underline-offset-4">clean</em> keeps
          the stage color; <em className="text-white/80 not-italic underline decoration-white/30 underline-offset-4">noir</em> drops
          it, which unifies the red/purple light into something archival.
        </p>
        <style>{`
          @keyframes rotoGrain {
            0% { background-position: 0 0; }
            25% { background-position: -42px 28px; }
            50% { background-position: 30px -46px; }
            75% { background-position: -24px -18px; }
            100% { background-position: 0 0; }
          }
          .roto-grain {
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>");
            background-size: 160px 160px;
            animation: rotoGrain 0.9s steps(4) infinite;
          }
        `}</style>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/roto-paint-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">paint</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/roto-pencil-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">pencil</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/roto-clean-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
              <div className="roto-grain pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay" />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">clean</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/roto-noir-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
              <div className="roto-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">noir</figcaption>
          </figure>
        </div>
        <p className="mt-10 max-w-2xl text-white/60 leading-relaxed">
          Update: the resolution problem turned out to be solvable — the 1080p source
          is real. Same two grades, real pixels this time:
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/hd-clean-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
              <div className="roto-grain pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay" />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">hd clean</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-square w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/motion/candidates/hd-noir-test.mp4"
                muted loop playsInline autoPlay preload="auto"
              />
              <div className="roto-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
            </div>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">hd noir</figcaption>
          </figure>
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-white/40 leading-relaxed">
          Pick a treatment — or mix them (dither on the drums, blur on the faces, etc.).
          Dither throughout, one 25-second window, everything in sync. When the
          collage rhythm feels right, this becomes the site backdrop.
        </p>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var POOL = ${JSON.stringify(POOL.map(f => `/motion/candidates/${f}`))};
              var vids = Array.prototype.slice.call(document.querySelectorAll('.deck-video'));
              // base indices in the 4x4: TL 2x2 = [0,1,4,5] (a,b,c,d)
              var BASE_IDX = [0, 1, 4, 5];
              // mirror map: for each of the 16, which base index it mirrors
              var MIRROR_OF = [0,1,1,0, 2,3,3,2, 2,3,3,2, 0,1,1,0];
              vids.forEach(function(v){
                var setOffset = function(){
                  try {
                    if (v.duration && isFinite(v.duration)) {
                      v.currentTime = Math.random() * v.duration * 0.85;
                    }
                  } catch(e) {}
                };
                if (v.readyState >= 1) { setOffset(); }
                else { v.addEventListener('loadedmetadata', setOffset, { once: true }); }
              });
              // track the 4 base clips; every 5s rotate to the next base position
              // and deal it a fresh clip — its mirrors turn with it
              var baseClips = BASE_IDX.map(function(i){
                return vids[i] ? vids[i].getAttribute('src') : null;
              });
              var rotation = 0;
              setInterval(function(){
                var p = rotation % 4;
                rotation++;
                var next;
                var guard = 0;
                do {
                  next = POOL[Math.floor(Math.random() * POOL.length)];
                  guard++;
                } while (baseClips.indexOf(next) !== -1 && guard < 30);
                baseClips[p] = next;
                vids.forEach(function(v, i){
                  if (MIRROR_OF[i] === p) {
                    v.src = next;
                    try { var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); } catch(e) {}
                  }
                });
              }, 5000);
              if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                vids.forEach(function(v){ v.pause(); v.removeAttribute('autoplay'); });
              }
            })();
          `,
        }}
      />
    </main>
  );
}

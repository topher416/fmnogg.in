import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "motion backdrop — study",
  robots: { index: false, follow: false },
};

// Deck: 9 fixed positions (angular, overlapping), clips swap from the pool on ended.
// (initial_file, left%, top%, width%, z, shape)
const TILES: Array<[string, string, string, string, string, string]> = [
  ["k-user-sing.mp4", "6%", "8%", "34%", "10", "shard"],
  ["k-hannah.mp4", "38%", "4%", "26%", "20", "torn"],
  ["k-drew.mp4", "62%", "10%", "30%", "10", "wedge"],
  ["k-singers.mp4", "3%", "52%", "32%", "20", "slab"],
  ["k-head.mp4", "33%", "60%", "18%", "30", "splinter"],
  ["k-user-strum.mp4", "50%", "56%", "27%", "10", "shard"],
  ["k-bass.mp4", "74%", "58%", "21%", "20", "torn"],
  ["k-drums.mp4", "10%", "80%", "30%", "10", "wedge"],
  ["k-keys.mp4", "56%", "82%", "34%", "20", "slab"],
];

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
          a blossoming deck.
        </h1>
        <p className="mt-5 text-white/60 leading-relaxed">
          A full-band wide shot as the base — no blank backdrop — with nine
          angular shards cut from two peaks of the set (7:12–7:37, 14:30–14:55),
          1080p source, floating on top. Each tile plays its 25-second clip once,
          then draws the next random moment from the deck, so the collage never
          repeats. 24-color ordered Bayer dither throughout.
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
        <div id="deck" className="relative h-[130svh] md:h-[110svh] overflow-hidden bg-black">
          <style>{`
            .shape-shard { clip-path: polygon(8% 0%, 92% 6%, 100% 78%, 88% 100%, 4% 94%, 0% 22%); }
            .shape-torn { clip-path: polygon(0% 14%, 7% 0%, 93% 3%, 100% 18%, 97% 86%, 89% 100%, 9% 97%, 0% 82%); }
            .shape-wedge { clip-path: polygon(0% 0%, 100% 10%, 90% 100%, 10% 90%); }
            .shape-slab { clip-path: polygon(5% 6%, 95% 0%, 100% 94%, 0% 100%); }
            .shape-splinter { clip-path: polygon(15% 0%, 85% 8%, 100% 60%, 75% 100%, 20% 92%, 0% 40%); }
            .deck-base { position: absolute; inset: 0; }
            .deck-base video { width: 100%; height: 100%; object-fit: cover; display: block; }
            .deck-tile { position: absolute; overflow: hidden; background: #000; }
            .deck-tile video { width: 100%; height: 100%; object-fit: cover; display: block; }
          `}</style>
          {/* base layer: whole band, no blank backdrop */}
          <div className="deck-base">
            <video
              id="deck-base-video"
              src="/motion/candidates/k-wide.mp4"
              muted
              playsInline
              autoPlay
              preload="auto"
            />
          </div>
          {TILES.map(([file, left, top, width, z, shape]) => (
            <div
              key={file}
              className={`deck-tile shape-${shape}`}
              style={{ left, top, width, aspectRatio: "1/1", zIndex: z }}
            >
              <video
                className="deck-video"
                src={`/motion/candidates/${file}`}
                muted
                playsInline
                autoPlay
                preload="auto"
              />
            </div>
          ))}
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
              var WIDE = ["/motion/candidates/k-wide.mp4", "/motion/candidates/b-wide.mp4"];
              // base layer: swap wide shots on ended
              var base = document.getElementById('deck-base-video');
              if (base) {
                base.addEventListener('ended', function(){
                  var next = WIDE[Math.floor(Math.random() * WIDE.length)];
                  if (next === base.getAttribute('src') || next === base.src) {
                    next = WIDE[(WIDE.indexOf(next) + 1) % WIDE.length];
                  }
                  base.src = next;
                  try { var p = base.play(); if (p && p.catch) p.catch(function(){}); } catch(e) {}
                });
              }
              var vids = Array.prototype.slice.call(document.querySelectorAll('.deck-video'));
              vids.forEach(function(v){
                // stagger: start each tile at a random offset so they don't all wrap at once
                var setOffset = function(){
                  try {
                    if (v.duration && isFinite(v.duration)) {
                      v.currentTime = Math.random() * v.duration * 0.85;
                    }
                  } catch(e) {}
                };
                if (v.readyState >= 1) { setOffset(); }
                else { v.addEventListener('loadedmetadata', setOffset, { once: true }); }
                // when a clip wraps, bump to the next random one from the deck
                v.addEventListener('ended', function(){
                  var next;
                  var guard = 0;
                  do {
                    next = POOL[Math.floor(Math.random() * POOL.length)];
                    guard++;
                  } while ((next === v.getAttribute('src') || next === v.src) && guard < 20);
                  v.src = next;
                  try { var p = v.play(); if (p && p.catch) p.catch(function(){}); } catch(e) {}
                });
              });
              // reduced motion: pause everything
              if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                vids.forEach(function(v){ v.pause(); v.removeAttribute('autoplay'); });
                if (base) { base.pause(); base.removeAttribute('autoplay'); }
              }
            })();
          `,
        }}
      />
    </main>
  );
}

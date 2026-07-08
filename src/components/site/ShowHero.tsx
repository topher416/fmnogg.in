import { BAND, SHOW } from "@/lib/site";
import { COUNTS } from "@/lib/discography";
import AmbientViz from "@/components/site/AmbientViz";

/** Landing hero: full-bleed banner, ambient backdrop, band wordmark, show callout, mission blurb. */
export default function ShowHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Full-bleed banner at the very top of the hero */}
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-banner.png"
          alt="One Thousand Feet Per Second — live at Montrose Saloon, July 17"
          className="block w-full h-[42vh] sm:h-[52vh] md:h-[60vh] object-cover"
        />
        {/* fade banner bottom into the page background */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0) 0%, rgba(8,8,8,1) 100%)",
          }}
        />
      </div>

      {/* Hero content with ambient visualizer backdrop */}
      <div className="relative">
        <AmbientViz mode="ambient" rgb="0,255,159" className="absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 45%, rgba(8,8,8,0.92) 100%)",
          }}
        />

        <div className="relative max-w-[1000px] mx-auto px-5 pt-12 pb-12 sm:pt-16 sm:pb-16">
          {/* Show callout */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff9f]/30 bg-[#00ff9f]/[0.06] px-3.5 py-1.5 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff9f] animate-pulse" aria-hidden />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#00ff9f]">
              {SHOW.dateShort} · Live at {SHOW.venue}
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-playfair)] font-bold leading-[0.95] tracking-tight text-[#f0ece6]"
            style={{ fontSize: "clamp(2.6rem, 8vw, 5.5rem)", textShadow: "0 0 80px rgba(0,255,159,0.12)" }}
          >
            One Thousand
            <br />
            Feet Per Second
          </h1>

          <p className="mt-6 max-w-[44rem] text-[0.98rem] sm:text-lg leading-relaxed text-white/55 font-[family-name:var(--font-playfair)] italic">
            {BAND.blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/40">
            <span>
              <span className="text-white/75">{COUNTS.covered}</span> covers
            </span>
            <span aria-hidden className="text-white/15">
              ·
            </span>
            <span>
              <span className="text-white/75">{COUNTS.albums}</span> albums
            </span>
            <span aria-hidden className="text-white/15">
              ·
            </span>
            <span>the whole discography, eventually</span>
          </div>

          <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/35">
            {SHOW.date} · {SHOW.venue} · {SHOW.city}
          </p>
        </div>
      </div>
    </section>
  );
}

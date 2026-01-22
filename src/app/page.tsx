"use client";

import { useState, useEffect } from "react";
import ElasticLine from "@/components/fancy/physics/elastic-line";
import useScreenSize from "@/hooks/use-screen-size";
import PixelTrail from "@/components/fancy/background/pixel-trail";
import BreathingText from "@/components/fancy/text/breathing-text";

const tracks = [
  { num: "I", title: "Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Thief", album: "A Moon Shaped Pool", year: "2016", sheet: "/sheets/tinker-tailor.pdf" },
  { num: "II", title: "Myxomatosis", album: "Hail to the Thief", year: "2003", sheet: "/sheets/myxomatosis.pdf" },
  { num: "III", title: "All I Need", album: "In Rainbows", year: "2007", sheet: "/sheets/all-i-need.pdf" },
  { num: "IV", title: "I Might Be Wrong", album: "Amnesiac", year: "2001", sheet: "/sheets/i-might-be-wrong.pdf" },
  { num: "V", title: "The National Anthem", album: "Kid A", year: "2000", sheet: "/sheets/the-national-anthem.pdf" },
  { num: "VI", title: "Where I End And You Begin", album: "Hail to the Thief", year: "2003", sheet: "/sheets/where-i-end-and-you-begin.pdf" },
  { num: "VII", title: "Blow Out", album: "Pablo Honey", year: "1993", sheet: "/sheets/blow-out.pdf" },
  { num: "VIII", title: "Nude", album: "In Rainbows", year: "2007", sheet: "/sheets/nude.pdf" },
];

function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${className} ${isGlitching ? "glitch" : ""}`}>
      {children}
    </span>
  );
}

function Orbs() {
  return (
    <>
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #00ff9f 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
          animationDelay: "0s"
        }}
      />
      <div
        className="orb"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          bottom: "20%",
          right: "-5%",
          animationDelay: "2s"
        }}
      />
      <div
        className="orb"
        style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, #00ff9f 0%, transparent 70%)",
          top: "60%",
          left: "30%",
          animationDelay: "4s",
          opacity: "0.1"
        }}
      />
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
    const screenSize = useScreenSize();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]" />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Pixel trail - on top but allows clicks through */}
      <div className="fixed inset-0 z-50">
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 16 : 24}
          fadeDuration={500}
          pixelClassName="bg-[#00ff9f]"
        />
      </div>

      <Orbs />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16">

        {/* Header */}
        <header className="mb-16 md:mb-24 text-center">
          <div className="drift text-[5.6rem] md:text-[8.4rem] lg:text-[11.2rem] font-bold tracking-wide font-[family-name:var(--font-playfair)]">
            <BreathingText
              staggerDuration={0.08}
              fromFontVariationSettings="'wght' 100, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              className="flicker"
            >
              f.m. noggin
            </BreathingText>
          </div>
        </header>

        {/* Setlist */}
        <section className="warp max-w-2xl">
          <h2 className="text-xs tracking-[0.5em] uppercase text-[#444] mb-8">
            Set I — {tracks.length} Transmissions
          </h2>

          <ol>
            {tracks.map((track, i) => (
              <li key={i}>
                <div
                  className="track group py-3"
                  onMouseEnter={() => setHoveredTrack(i)}
                  onMouseLeave={() => setHoveredTrack(null)}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-[#333] font-mono w-8 shrink-0">
                      {track.num}
                    </span>
                    <div className="flex-1">
                      <span className={`text-lg md:text-xl transition-colors duration-300 ${
                        hoveredTrack === i ? "text-[#e8e8e8]" : "text-[#888]"
                      }`}>
                        {track.title}
                      </span>
                      <div className={`text-xs text-[#444] mt-1 transition-opacity duration-300 ${
                        hoveredTrack === i ? "opacity-100" : "opacity-0"
                      }`}>
                        {track.album} ({track.year})
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={track.sheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 mb-6 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#222] bg-[#111] hover:border-[#00ff9f]/50 hover:bg-[#0a0a0a] transition-all group"
                >
                  <svg className="w-5 h-5 text-[#00ff9f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-[#666] group-hover:text-[#888] transition-colors">
                    View Sheet Music (PDF)
                  </span>
                </a>
                {i < tracks.length - 1 && (
                  <div className="h-8 w-full text-[#00ff9f]/30 hover:text-[#00ff9f]/60 transition-colors">
                    <ElasticLine strokeWidth={1} grabThreshold={10} releaseThreshold={50} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Footer */}
        <footer className="mt-24 md:mt-32">
          <div className="h-px w-16 bg-[#222] mb-8" />
          <p className="text-xs text-[#333] tracking-wider font-mono">
            41.8781° N, 87.6298° W
          </p>
        </footer>
      </main>

      {/* Corner decoration */}
      <div className="fixed bottom-8 right-8 text-[#222] text-xs font-mono tracking-widest rotate-90 origin-bottom-right z-10">
        FMNOGG.IN
      </div>
    </div>
  );
}

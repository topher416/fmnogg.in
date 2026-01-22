"use client";

import { useState, useEffect } from "react";

const tracks = [
  { num: "I", title: "Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Thief", album: "A Moon Shaped Pool", year: "2016" },
  { num: "II", title: "Myxomatosis", album: "Hail to the Thief", year: "2003" },
  { num: "III", title: "All I Need", album: "In Rainbows", year: "2007" },
  { num: "IV", title: "I Might Be Wrong", album: "Amnesiac", year: "2001" },
  { num: "V", title: "The National Anthem", album: "Kid A", year: "2000" },
  { num: "VI", title: "Where I End And You Begin", album: "Hail to the Thief", year: "2003" },
  { num: "VII", title: "Blow Out", album: "Pablo Honey", year: "1993" },
  { num: "VIII", title: "Nude", album: "In Rainbows", year: "2007" },
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
          background: "radial-gradient(circle, #c41e3a 0%, transparent 70%)",
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
          background: "radial-gradient(circle, #1e3ac4 0%, transparent 70%)",
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
          background: "radial-gradient(circle, #3ac41e 0%, transparent 70%)",
          top: "60%",
          left: "30%",
          animationDelay: "4s"
        }}
      />
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

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
      <Orbs />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">

        {/* Header */}
        <header className="mb-16 md:mb-24">
          <div className="drift">
            <GlitchText className="block text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter flicker">
              FM
            </GlitchText>
            <GlitchText className="block text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#c41e3a] flicker">
              NOGGIN
            </GlitchText>
          </div>
          <p className="mt-8 text-sm md:text-base tracking-[0.3em] uppercase text-[#666] max-w-md">
            Deep cuts. Moody atmospheres. <br />
            No hits. No safety.
          </p>
        </header>

        {/* Setlist */}
        <section className="warp max-w-2xl">
          <h2 className="text-xs tracking-[0.5em] uppercase text-[#444] mb-8">
            Set I — {tracks.length} Transmissions
          </h2>

          <ol className="space-y-3 md:space-y-4">
            {tracks.map((track, i) => (
              <li
                key={i}
                className="track group"
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
              </li>
            ))}
          </ol>
        </section>

        {/* Footer */}
        <footer className="mt-24 md:mt-32">
          <div className="h-px w-16 bg-[#333] mb-8" />
          <p className="text-xs text-[#444] tracking-wider">
            Chicago, IL
          </p>
          <p className="text-xs text-[#333] tracking-wider mt-2">
            Coming 2025
          </p>
        </footer>
      </main>

      {/* Corner decoration */}
      <div className="fixed bottom-8 right-8 text-[#222] text-xs font-mono tracking-widest rotate-90 origin-bottom-right">
        FMNOGG.IN
      </div>
    </div>
  );
}

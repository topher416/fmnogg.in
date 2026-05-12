"use client";

import { useState, useEffect } from "react";
import ElasticLine from "@/components/fancy/physics/elastic-line";
import useScreenSize from "@/hooks/use-screen-size";
import BreathingText from "@/components/fancy/text/breathing-text";

const stems = ["bass", "drums", "other", "vocals"];
const practiceSpeeds = [
  { label: "90%", file: "90-percent", description: "Slightly slower" },
  { label: "70%", file: "70-percent", description: "Medium practice speed" },
  { label: "50%", file: "50-percent", description: "Half speed for learning" },
];

interface Track {
  num: string;
  title: string;
  album: string;
  year: string;
  sheet: string;
  lyrics: string;
  audio: string;
  key: string;
  tempo: number;
  timeSig: string;
  tuning?: string;
}

const tracks: Track[] = [
  {
    num: "I",
    title: "Optimistic",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/optimistic.pdf",
    lyrics: "https://genius.com/Radiohead-optimistic-lyrics",
    audio: "optimistic",
    key: "E Minor",
    tempo: 120,
    timeSig: "4/4",
  },
  {
    num: "II",
    title: "A Punch Up at a Wedding",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/a-punch-up-at-a-wedding.pdf",
    lyrics: "https://genius.com/Radiohead-a-punchup-at-a-wedding-no-no-no-no-no-no-no-no-lyrics",
    audio: "a-punch-up-at-a-wedding",
    key: "E Dorian",
    tempo: 79,
    timeSig: "4/4",
  },
  {
    num: "III",
    title: "I Might Be Wrong",
    album: "Amnesiac",
    year: "2001",
    sheet: "/sheets/i-might-be-wrong.pdf",
    lyrics: "https://genius.com/Radiohead-i-might-be-wrong-lyrics",
    audio: "i-might-be-wrong",
    key: "D Minor",
    tempo: 103,
    timeSig: "4/4",
    tuning: "Drop D",
  },
  {
    num: "IV",
    title: "Knives Out",
    album: "Amnesiac",
    year: "2001",
    sheet: "/sheets/knives-out.pdf",
    lyrics: "https://genius.com/Radiohead-knives-out-lyrics",
    audio: "knives-out",
    key: "C Minor",
    tempo: 137,
    timeSig: "4/4",
  },
  {
    num: "V",
    title: "Nude",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/nude.pdf",
    lyrics: "https://genius.com/Radiohead-nude-lyrics",
    audio: "nude",
    key: "E Major",
    tempo: 63,
    timeSig: "6/8",
  },
  {
    num: "VI",
    title: "Subterranean Homesick Alien",
    album: "OK Computer",
    year: "1997",
    sheet: "/sheets/subterranean-homesick-alien.pdf",
    lyrics: "https://genius.com/Radiohead-subterranean-homesick-alien-lyrics",
    audio: "subterranean-homesick-alien",
    key: "D Major",
    tempo: 132,
    timeSig: "4/4",
  },
  {
    num: "VII",
    title: "The National Anthem",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/the-national-anthem.pdf",
    lyrics: "https://genius.com/Radiohead-the-national-anthem-lyrics",
    audio: "the-national-anthem",
    key: "D Minor",
    tempo: 92,
    timeSig: "4/4",
  },
  {
    num: "VIII",
    title: "Idioteque",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/idioteque.pdf",
    lyrics: "https://genius.com/Radiohead-idioteque-lyrics",
    audio: "idioteque",
    key: "Gm / Eb Major",
    tempo: 138,
    timeSig: "4/4",
  },
  {
    num: "IX",
    title: "My Iron Lung",
    album: "The Bends",
    year: "1995",
    sheet: "/sheets/my-iron-lung.pdf",
    lyrics: "https://genius.com/Radiohead-my-iron-lung-lyrics",
    audio: "my-iron-lung",
    key: "G Major",
    tempo: 97,
    timeSig: "4/4",
  },
  {
    num: "X",
    title: "Give Up the Ghost",
    album: "The King of Limbs",
    year: "2011",
    sheet: "/sheets/give-up-the-ghost.pdf",
    lyrics: "https://genius.com/Radiohead-give-up-the-ghost-lyrics",
    audio: "give-up-the-ghost",
    key: "A Minor",
    tempo: 76,
    timeSig: "4/4",
    tuning: "Capo 2",
  },
  {
    num: "XI",
    title: "I Promise",
    album: "OKNOTOK",
    year: "2017",
    sheet: "/sheets/i-promise.pdf",
    lyrics: "https://genius.com/Radiohead-i-promise-lyrics",
    audio: "i-promise",
    key: "E Major",
    tempo: 70,
    timeSig: "4/4",
  },
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

function TrackInfo({ track }: { track: Track }) {
  return (
    <div className="mt-2 mb-3 font-mono text-sm text-[#ccc] flex flex-wrap gap-x-3 gap-y-1">
      <span>{track.key}</span>
      <span className="text-[#555]">•</span>
      <span>{track.tempo} BPM</span>
      <span className="text-[#555]">•</span>
      <span>{track.timeSig}</span>
      {track.tuning && (
        <>
          <span className="text-[#555]">•</span>
          <span className="text-[#00ff9f]">{track.tuning}</span>
        </>
      )}
    </div>
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
      <Orbs />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-16">

        {/* Header */}
        <header className="mb-16 md:mb-24 text-center">
          <div className="drift text-[3rem] sm:text-[4.5rem] md:text-[8.4rem] lg:text-[11.2rem] font-bold tracking-wide font-[family-name:var(--font-playfair)]">
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

        {/* Overview */}
        <section className="w-full max-w-3xl mb-16">
          <div className="p-6 bg-[#111] rounded-lg border border-[#222]">
            <p className="text-[#aaa] leading-relaxed mb-6">
              Practice materials for an 11-track Radiohead set. Each song includes isolated stems, slowed practice tracks, sheet music, lyrics, and detailed notes for guitar, bass, drums, and keys.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tracks.map((track, i) => (
                <a
                  key={i}
                  href={`#track-${i}`}
                  className="text-sm text-[#888] hover:text-[#00ff9f] transition-colors"
                >
                  <span className="text-[#555] font-mono mr-2">{track.num}</span>
                  {track.title.length > 20 ? track.title.slice(0, 20) + '...' : track.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Setlist */}
        <section className="w-full max-w-3xl">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#888] mb-8">
            Set I — {tracks.length} Tracks
          </h2>

          <ol>
            {tracks.map((track, i) => (
              <li key={i} id={`track-${i}`}>
                <div
                  className="track group py-4"
                  onMouseEnter={() => setHoveredTrack(i)}
                  onMouseLeave={() => setHoveredTrack(null)}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm text-[#666] font-mono w-10 shrink-0">
                      {track.num}
                    </span>
                    <div className="flex-1">
                      <span className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
                        hoveredTrack === i ? "text-[#fff]" : "text-[#ccc]"
                      }`}>
                        {track.title}
                      </span>
                      <div className="text-sm text-[#888] mt-1">
                        {track.album} ({track.year})
                      </div>
                    </div>
                  </div>
                </div>
                <TrackInfo track={track} />
                {track.audio && (
                  <div className="mt-4 mb-3 grid grid-cols-2 gap-3">
                    {stems.map((stem) => (
                      <div key={stem} className="flex flex-col gap-1">
                        <span className="text-sm text-[#888] capitalize">{stem}</span>
                        <audio
                          controls
                          preload="none"
                          className="w-full h-8 [&::-webkit-media-controls-panel]:bg-[#111]"
                          src={`/audio/${track.audio}/${stem}.mp3`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {track.audio && (
                  <div className="mt-4 mb-3">
                    <div className="text-xs tracking-[0.2em] uppercase text-[#666] mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Slowed Practice Tracks
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {practiceSpeeds.map((speed) => (
                        <div key={speed.file} className="flex flex-col gap-1 p-3 bg-[#111] rounded-lg border border-[#222]">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-mono text-[#00ff9f] font-semibold">{speed.label}</span>
                            <span className="text-xs text-[#555]">speed</span>
                          </div>
                          <span className="text-xs text-[#666] mb-2">{speed.description}</span>
                          <audio
                            controls
                            preload="none"
                            className="w-full h-8 [&::-webkit-media-controls-panel]:bg-[#0a0a0a]"
                            src={`/audio/${track.audio}/practice/${speed.file}.mp3`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 mb-4 flex flex-wrap gap-3">
                  <a
                    href={track.lyrics}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#444] bg-[#161616] hover:border-[#00ff9f] hover:bg-[#1a1a1a] transition-all text-sm text-[#aaa] hover:text-[#fff]"
                  >
                    <svg className="w-4 h-4 text-[#00ff9f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Lyrics
                  </a>
                  {/* Sheet music button — hidden until PDFs are added */}
                </div>
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

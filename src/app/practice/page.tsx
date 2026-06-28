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
    title: "Bodysnatchers",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/bodysnatchers.pdf",
    lyrics: "https://genius.com/Radiohead-bodysnatchers-lyrics",
    audio: "bodysnatchers",
    key: "Bm",
    tempo: 100,
    timeSig: "4/4",
  },

  {
    num: "II",
    title: "Paranoid Android",
    album: "OK Computer",
    year: "1997",
    sheet: "/sheets/paranoid-android.pdf",
    lyrics: "https://genius.com/Radiohead-paranoid-android-lyrics",
    audio: "paranoid-android",
    key: "Gm",
    tempo: 83, // varies: ~83 intro, ~140 mid-section
    timeSig: "4/4",
  },

  {
    num: "III",
    title: "There There",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/there-there.pdf",
    lyrics: "https://genius.com/Radiohead-there-there-lyrics",
    audio: "there-there",
    key: "Em",
    tempo: 100,
    timeSig: "4/4",
    tuning: "Open E",
  },

  {
    num: "IV",
    title: "Myxomatosis",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/myxomatosis.pdf",
    lyrics: "https://genius.com/Radiohead-myxomatosis-lyrics",
    audio: "myxomatosis",
    key: "Am",
    tempo: 110,
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
    key: "E",
    tempo: 63,
    timeSig: "6/8",
  },

  {
    num: "VI",
    title: "Reckoner",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/reckoner.pdf",
    lyrics: "https://genius.com/Radiohead-reckoner-lyrics",
    audio: "reckoner",
    key: "C#m",
    tempo: 77,
    timeSig: "4/4",
    tuning: "Open G",
  },

  {
    num: "VII",
    title: "Weird Fishes / Arpeggios",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/weird-fishes-arpeggios.pdf",
    lyrics: "https://genius.com/Radiohead-weird-fishes-arpeggi-lyrics",
    audio: "weird-fishes-arpeggios",
    key: "Em",
    tempo: 88,
    timeSig: "4/4",
  },

  {
    num: "VIII",
    title: "I Promise",
    album: "OKNOTOK",
    year: "2017",
    sheet: "/sheets/i-promise.pdf",
    lyrics: "https://genius.com/Radiohead-i-promise-lyrics",
    audio: "i-promise",
    key: "E",
    tempo: 70,
    timeSig: "4/4",
  },

  {
    num: "IX",
    title: "Street Spirit (Fade Out)",
    album: "The Bends",
    year: "1995",
    sheet: "/sheets/street-spirit-fade-out.pdf",
    lyrics: "https://genius.com/Radiohead-street-spirit-fade-out-lyrics",
    audio: "street-spirit-fade-out",
    key: "F#m",
    tempo: 100,
    timeSig: "4/4",
  },

  {
    num: "X",
    title: "The Numbers",
    album: "A Moon Shaped Pool",
    year: "2016",
    sheet: "/sheets/the-numbers.pdf",
    lyrics: "https://genius.com/Radiohead-the-numbers-lyrics",
    audio: "the-numbers",
    key: "C",
    tempo: 90,
    timeSig: "4/4",
  },

  {
    num: "XI",
    title: "No Surprises",
    album: "OK Computer",
    year: "1997",
    sheet: "/sheets/no-surprises.pdf",
    lyrics: "https://genius.com/Radiohead-no-surprises-lyrics",
    audio: "no-surprises",
    key: "C",
    tempo: 76,
    timeSig: "4/4",
  },

  {
    num: "XII",
    title: "Pyramid Song",
    album: "Amnesiac",
    year: "2001",
    sheet: "/sheets/pyramid-song.pdf",
    lyrics: "https://genius.com/Radiohead-pyramid-song-lyrics",
    audio: "pyramid-song",
    key: "Am",
    tempo: 70, // feel-based, complex subdivision
    timeSig: "4/4",
  },

  {
    num: "XIII",
    title: "2+2=5",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/2+2=5.pdf",
    lyrics: "https://genius.com/Radiohead-225-lyrics",
    audio: "2+2=5",
    key: "Am",
    tempo: 145,
    timeSig: "4/4",
  },

  {
    num: "XIV",
    title: "Just",
    album: "The Bends",
    year: "1995",
    sheet: "/sheets/just.pdf",
    lyrics: "https://genius.com/Radiohead-just-lyrics",
    audio: "just",
    key: "F#m",
    tempo: 150,
    timeSig: "4/4",
  },

  {
    num: "XV",
    title: "You and Whose Army?",
    album: "Amnesiac",
    year: "2001",
    sheet: "/sheets/you-and-whose-army.pdf",
    lyrics: "https://genius.com/Radiohead-you-and-whose-army-lyrics",
    audio: "you-and-whose-army",
    key: "Em",
    tempo: 75,
    timeSig: "4/4",
    tuning: "Drop D",
  },

  {
    num: "XVI",
    title: "Go to Sleep",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/go-to-sleep.pdf",
    lyrics: "https://genius.com/Radiohead-go-to-sleep-lyrics",
    audio: "go-to-sleep",
    key: "Am",
    tempo: 115,
    timeSig: "4/4",
  },

  {
    num: "XVII",
    title: "Everything in Its Right Place",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/everything-in-its-right-place.pdf",
    lyrics: "https://genius.com/Radiohead-everything-in-its-right-place-lyrics",
    audio: "everything-in-its-right-place",
    key: "Fm",
    tempo: 140,
    timeSig: "4/4",
  },

  {
    num: "XVIII",
    title: "How to Disappear Completely",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/how-to-disappear-completely.pdf",
    lyrics: "https://genius.com/Radiohead-how-to-disappear-completely-lyrics",
    audio: "how-to-disappear-completely",
    key: "Em",
    tempo: 100,
    timeSig: "4/4",
  },

  {
    num: "XIX",
    title: "Like Spinning Plates",
    album: "Amnesiac",
    year: "2001",
    sheet: "/sheets/like-spinning-plates.pdf",
    lyrics: "https://genius.com/Radiohead-like-spinning-plates-lyrics",
    audio: "like-spinning-plates",
    key: "Abm",
    tempo: 70, // reversed, feel-based
    timeSig: "4/4",
  },

  {
    num: "XX",
    title: "Lucky",
    album: "OK Computer",
    year: "1997",
    sheet: "/sheets/lucky.pdf",
    lyrics: "https://genius.com/Radiohead-lucky-lyrics",
    audio: "lucky",
    key: "Dm",
    tempo: 88,
    timeSig: "4/4",
  },

  {
    num: "XXI",
    title: "High and Dry",
    album: "The Bends",
    year: "1995",
    sheet: "/sheets/high-and-dry.pdf",
    lyrics: "https://genius.com/Radiohead-high-and-dry-lyrics",
    audio: "high-and-dry",
    key: "Em",
    tempo: 80,
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
              Practice materials for a 21-song Radiohead setlist. Each song includes isolated stems and slowed practice tracks at 90%, 70%, and 50% speed. Audio streamed from archive.org.
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
                          src={`https://archive.org/download/fmnoggin-${track.audio}/${stem}.mp3`}
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
                            src={`https://archive.org/download/fmnoggin-${track.audio}/${speed.file}.mp3`}
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

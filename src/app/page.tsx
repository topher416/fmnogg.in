"use client";

import { useState, useEffect } from "react";
import ElasticLine from "@/components/fancy/physics/elastic-line";
import useScreenSize from "@/hooks/use-screen-size";
import BreathingText from "@/components/fancy/text/breathing-text";

const stems = ["bass", "drums", "other", "vocals"];

interface TrackNotes {
  guitar: string;
  bass: string;
  drums: string;
  keys: string;
}

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
  critical: string;
  notes: TrackNotes;
  reference?: { label: string; url: string };
}

const tracks: Track[] = [
  {
    num: "I",
    title: "Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Thief",
    album: "A Moon Shaped Pool",
    year: "2016",
    sheet: "/sheets/tinker-tailor.pdf",
    lyrics: "https://genius.com/Radiohead-tinker-tailor-soldier-sailor-rich-man-poor-man-beggar-man-thief-lyrics",
    audio: "tinker-tailor",
    key: "Db Major",
    tempo: 89,
    timeSig: "4/4",
    tuning: "Capo 4",
    critical: "Electric piano motif drives the build; Ondes Martenot in outro.",
    notes: {
      guitar: "Arpeggiate, don't strum. Jonny: Tele clean. Ed: Freeze pedal for drones.",
      bass: "Supportive fingerstyle, leave space for orchestral elements.",
      drums: "Opens with drum machine, Phil layers in gradually. Need backing track or programmed intro.",
      keys: "Rhodes opens. Strings: Crumar/mellotron patches. Ondes in outro (sine wave + pitch bend)."
    }
  },
  {
    num: "II",
    title: "Myxomatosis",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/myxomatosis.pdf",
    lyrics: "https://genius.com/Radiohead-myxomatosis-lyrics",
    audio: "myxomatosis",
    key: "E Minor",
    tempo: 99,
    timeSig: "4/4",
    critical: "Fuzz bass (Big Cheese pedal) is non-negotiable—defines the entire track.",
    notes: {
      guitar: "Jonny: dissonant stabs, slight detuning. Ed: rhythmic choppy delays.",
      bass: "Colin's fuzz bass IS the song. Electro-Harmonix Big Cheese or similar. Aggressive attack.",
      drums: "Tight, mechanical feel. Emphasis on hi-hat patterns. Think motorik + punk.",
      keys: "Subtle Prophet pad underneath. Adds tension without competing with bass fuzz."
    },
    reference: { label: "From The Basement 2008", url: "https://www.youtube.com/watch?v=DgeKRbmUBns" }
  },
  {
    num: "III",
    title: "All I Need",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/all-i-need.pdf",
    lyrics: "https://genius.com/Radiohead-all-i-need-lyrics",
    audio: "all-i-need",
    key: "E Minor",
    tempo: 88,
    timeSig: "4/4",
    critical: "Prophet-5 synth bass (NOT electric bass)—the warm analog pulse IS the song.",
    notes: {
      guitar: "Minimal until climax. Delay swells, volume pedal work. Let the synth breathe.",
      bass: "NO BASS GUITAR. Prophet-5 handles all low end. Sit this one out or double synth higher.",
      drums: "Patient build. Brushes → sticks. Glockenspiel accent in finale is crucial.",
      keys: "Prophet-5 synth bass (critical). Warm, slightly detuned. Glockenspiel melody in climax."
    },
    reference: { label: "From The Basement In Rainbows", url: "https://www.youtube.com/watch?v=DV1hQSt2hSE" }
  },
  {
    num: "IV",
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
    critical: "Hypnotic Drop D guitar riff defines everything—lock in and never waver.",
    notes: {
      guitar: "DROP D essential. Main riff is hypnotic, repetitive. Slight overdrive, mostly clean.",
      bass: "Lock to the riff. Sparse but powerful. Low D pedal tone grounds everything.",
      drums: "Driving but not busy. Leave room for the riff's hypnotic quality.",
      keys: "Subtle textures. Rhodes stabs. Don't clutter the guitar's space."
    },
    reference: { label: "I Might Be Wrong: Live Recordings", url: "https://www.youtube.com/watch?v=vOa--FIrVEA" }
  },
  {
    num: "V",
    title: "The National Anthem",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/the-national-anthem.pdf",
    lyrics: "https://genius.com/Radiohead-the-national-anthem-lyrics",
    audio: "the-national-anthem",
    key: "D Major",
    tempo: 92,
    timeSig: "4/4",
    tuning: "Drop D",
    critical: "Relentless bass riff anchors chaos—never wavers, even when horns go free jazz.",
    notes: {
      guitar: "Ed: oscillating tremolo, feedback. Jonny: Ondes Martenot wails.",
      bass: "THE riff. Never stop, never vary. You are the anchor in the storm. Drop D.",
      drums: "Krautrock-inspired. Steady, driving, slightly mechanical. The heartbeat.",
      keys: "Ondes Martenot for alien textures. Alternatively: theremin-style synth patches."
    }
  },
  {
    num: "VI",
    title: "Where I End And You Begin",
    album: "Hail to the Thief",
    year: "2003",
    sheet: "/sheets/where-i-end-and-you-begin.pdf",
    lyrics: "https://genius.com/Radiohead-where-i-end-and-you-begin-the-sky-is-falling-in-lyrics",
    audio: "where-i-end-and-you-begin",
    key: "C Minor",
    tempo: 121,
    timeSig: "4/4",
    critical: "Peter Hook-style high bass melody + Ondes walls create the emotional weight.",
    notes: {
      guitar: "Arpeggiated figures, clean with modulation. Ed: delay-heavy ambience.",
      bass: "Peter Hook influence—play HIGH on the neck, melodic. The bass IS the lead.",
      drums: "Driving 8th note pulse. Urgent but controlled. Build intensity gradually.",
      keys: "Ondes Martenot creates haunting walls. Sine wave + expression pedal. Essential texture."
    },
    reference: { label: "From The Basement 2008", url: "https://www.youtube.com/watch?v=fGvPwkPmIYs" }
  },
  {
    num: "VII",
    title: "Blow Out",
    album: "Pablo Honey",
    year: "1993",
    sheet: "/sheets/blow-out.pdf",
    lyrics: "https://genius.com/Radiohead-blow-out-lyrics",
    audio: "blow-out",
    key: "E Dorian",
    tempo: 125,
    timeSig: "4/4",
    critical: "Bossa nova intro → apocalyptic crescendo. The contrast IS the song.",
    notes: {
      guitar: "Clean jazz chords in intro. Build to wall of distortion. Jonny's solo is climactic.",
      bass: "Walking bassline in verse. Becomes driving 8ths in climax. Dynamic range is huge.",
      drums: "Bossa brush work → explosive rock ending. The transition is everything.",
      keys: "Minimal. Occasional pad for atmosphere. Stay out of the guitar's way."
    },
    reference: { label: "Live at the Astoria 1994", url: "https://www.youtube.com/watch?v=HFoPvq_0Rdo" }
  },
  {
    num: "VIII",
    title: "Nude",
    album: "In Rainbows",
    year: "2007",
    sheet: "/sheets/nude.pdf",
    lyrics: "https://genius.com/Radiohead-nude-lyrics",
    audio: "nude",
    key: "E Maj / C#m",
    tempo: 64,
    timeSig: "6/8",
    tuning: "EAEGBE",
    critical: "High-register melodic bass transforms the song—Colin's finest moment.",
    notes: {
      guitar: "Sparse, clean arpeggios. Volume swells. Let the bass shine.",
      bass: "EAEGBE tuning. Play HIGH melodic lines. This is the lead instrument. Study Colin's part.",
      drums: "Brushes throughout. Gentle, swaying 6/8. Never overpower the delicacy.",
      keys: "String pads, subtle. Prophet for warmth. Support, don't lead."
    },
    reference: { label: "From The Basement In Rainbows", url: "https://www.youtube.com/watch?v=1ky1td3JQAI" }
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
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="mt-2 mb-3">
      {/* Quick Stats Bar */}
      <div className="font-mono text-xs text-[#999] flex flex-wrap gap-x-2 gap-y-1">
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

      {/* Critical Element */}
      <p className="mt-2 text-sm italic text-[#bbb] leading-relaxed">
        {track.critical}
      </p>

      {/* Role Notes Toggle */}
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="mt-2 text-xs text-[#777] hover:text-[#aaa] transition-colors flex items-center gap-1"
      >
        <svg
          className={`w-3 h-3 transition-transform ${showNotes ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Role Notes
      </button>

      {/* Role Notes Grid (collapsible) */}
      {showNotes && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#151515] rounded border border-[#333]">
            <span className="text-[#00ff9f] font-medium">Guitar</span>
            <p className="mt-1 text-[#999] leading-relaxed">{track.notes.guitar}</p>
          </div>
          <div className="p-2 bg-[#151515] rounded border border-[#333]">
            <span className="text-[#00ff9f] font-medium">Bass</span>
            <p className="mt-1 text-[#999] leading-relaxed">{track.notes.bass}</p>
          </div>
          <div className="p-2 bg-[#151515] rounded border border-[#333]">
            <span className="text-[#00ff9f] font-medium">Drums</span>
            <p className="mt-1 text-[#999] leading-relaxed">{track.notes.drums}</p>
          </div>
          <div className="p-2 bg-[#151515] rounded border border-[#333]">
            <span className="text-[#00ff9f] font-medium">Keys</span>
            <p className="mt-1 text-[#999] leading-relaxed">{track.notes.keys}</p>
          </div>
        </div>
      )}

      {/* Reference Link */}
      {track.reference && (
        <a
          href={track.reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs text-[#777] hover:text-[#00ff9f] transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {track.reference.label}
        </a>
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
                <TrackInfo track={track} />
                {track.audio && (
                  <div className="mt-3 mb-2 grid grid-cols-2 gap-2">
                    {stems.map((stem) => (
                      <div key={stem} className="flex flex-col gap-1">
                        <span className="text-xs text-[#444] capitalize">{stem}</span>
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
                <div className="mt-3 mb-4 flex flex-wrap gap-2">
                  <a
                    href={track.lyrics}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#333] bg-[#111] hover:border-[#00ff9f]/50 hover:bg-[#151515] transition-all text-sm text-[#666] hover:text-[#999]"
                  >
                    <svg className="w-4 h-4 text-[#00ff9f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Lyrics
                  </a>
                  <a
                    href={track.sheet}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#333] bg-[#111] hover:border-[#00ff9f]/50 hover:bg-[#151515] transition-all text-sm text-[#666] hover:text-[#999]"
                  >
                    <svg className="w-4 h-4 text-[#00ff9f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Sheet Music
                  </a>
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

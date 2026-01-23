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
  structure: string;
  chords: string;
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
    critical: "Orchestral build over 5 minutes from sparse piano to full crescendo. Patience is everything.",
    structure: "Intro (piano alone, 8 bars) → Verse 1 → Verse 2 (strings enter) → Bridge (builds) → Climax (full orchestra) → Outro (decays with Ondes)",
    chords: "Capo 4: Am → Em → F → C (verse). Bridge: Dm → Am → E → Am. All fingerpicked arpeggios.",
    notes: {
      guitar: "Clean tone, arpeggiate every chord—never strum. First guitar enters at verse 2 with tremolo-picked high notes. Second guitar: use freeze/sustain pedal for pad-like drones under the climax. Both guitars swell in volume as orchestration builds.",
      bass: "Enter at verse 2. Fingerstyle, whole notes following root motion. Leave massive space—you're supporting strings, not leading. In climax, shift to quarter notes on roots. Drop out for final outro.",
      drums: "Programmed beat opens (need backing track or drum machine). Live drums layer in at bridge with mallets on toms. Build to full kit in climax with cymbal swells. Brushes would work for softer sections if no backing track.",
      keys: "Rhodes/Wurlitzer carries the intro ALONE for 8 bars—this sets everything. Strings (mellotron or pad) enter verse 2, swell through bridge. Ondes Martenot (or sine wave synth with pitch bend) for the eerie outro melody. The keyboard arrangement IS the arrangement."
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
    critical: "Fuzz bass drives everything. Without the right distorted bass tone, the song doesn't exist.",
    structure: "Intro (bass riff, 4 bars) → Verse 1 → Chorus → Verse 2 → Chorus → Bridge (breakdown) → Build → Final Chorus → Outro (collapses)",
    chords: "Single-note riff based: E (verse/chorus riff centered on low E and G). Bridge moves to B → C → D → E. Guitars play stabs on the off-beats.",
    notes: {
      guitar: "Guitar 1: Dissonant two-note stabs (minor 2nds, tritones) on off-beats. Slight detuning helps the unsettling vibe. Guitar 2: Rhythmic choppy delays, slapback around 100ms, play percussive muted scratches. Both guitars back off in verses—let bass dominate. Full chord stabs only in choruses.",
      bass: "You ARE this song. Fuzz pedal required (Electro-Harmonix Big Cheese, or any gated fuzz). The riff: E-E-G-E-E-B-A-G pattern, aggressive 8th notes. Never clean up your tone. Attack hard, let notes decay into fuzz. Don't vary the riff—the hypnotic repetition is the point.",
      drums: "Tight, almost mechanical. Hi-hat drives 8th notes throughout. Snare on 2 and 4, kick locks with bass riff. Think motorik/krautrock meets punk. In breakdown, strip to kick and snare only. Build back with tom fills into final chorus.",
      keys: "Subtle synth pad (Prophet or similar analog) holds low E drone underneath everything. Creates sub-bass foundation without competing with fuzz bass. Optional: add high, thin synth line in breakdown for tension. Stay out of the mid frequencies—that's bass territory."
    }
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
    critical: "5-minute slow build from minimal to overwhelming. Synth bass (not electric) carries the low end. Glockenspiel melody in climax is iconic.",
    structure: "Intro (synth bass pulse, 8 bars) → Verse 1 (sparse) → Verse 2 (guitar enters) → Verse 3 (drums build) → Climax (everything crashes in, glockenspiel) → Outro (sustain and decay)",
    chords: "Em → Cmaj7 → Em → Cmaj7 (whole song). Synth bass plays roots as pulsing 8ths. Guitar arpeggios follow same progression.",
    notes: {
      guitar: "Don't play until verse 2. Clean tone with long delay (dotted 8th or quarter note). Volume swells—use a volume pedal to fade notes in. Arpeggiate Em and Cmaj7 high on neck. In climax, switch to full strummed chords with distortion and let it ring. The contrast between delicate verses and crushing climax is everything.",
      bass: "NO BASS GUITAR on this track. Synth bass handles all low end. If you must play, double the synth line an octave up with clean tone and volume pedal swells. Or: sit out verses, enter only in climax with sustained low E root. Seriously though—this song works because of the synth bass texture, not electric bass.",
      drums: "Extreme patience required. Brushes only for verses 1-2. Sticks enter verse 3, still sparse—ride cymbal and kick. Climax: crash cymbals, floor tom, full power. The glockenspiel hits need space, so leave room. Final section: cymbal swells that sustain into the outro.",
      keys: "Synth bass is CRITICAL—warm analog tone (Prophet, Moog, or soft synth equivalent). Slightly detuned, pulsing 8th notes on E. Filter opens slowly over the 5 minutes. Glockenspiel melody enters in climax: E-D#-E-F#-G-F#-E pattern (learn this, it's the hook). If no glockenspiel, use bell/celesta patch at high velocity."
    }
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
    critical: "The guitar riff loops hypnotically for 5 minutes. DROP D tuning required. Don't overcomplicate—the repetition IS the point.",
    structure: "Intro (riff alone, 8 bars) → Verse 1 → Verse 2 → Breakdown (sparse) → Build → Verse 3 → Extended Outro (riff continues as everything else drops)",
    chords: "Drop D: Main riff uses D5 → F5 → C5 → D5 pattern. The riff is melodic, not just power chords—learn the specific fingering. Breakdown uses Dm → Bb → F → A.",
    notes: {
      guitar: "DROP D REQUIRED. Main riff: D string fretted at 0-3-5-3, with open low D pedaling underneath. Slight crunch, not heavy distortion. Second guitar adds sparse high harmonics and feedback swells in verses. In breakdown, both guitars go clean and airy. Riff must stay LOCKED—if you rush or drag, the whole thing falls apart. This is a groove song.",
      bass: "Low D pedal tone is your home base. Follow the guitar riff's rhythm but simplify—mostly root notes. In verses, you can add the F and C movement. Breakdown: drop to whole notes, let it breathe. The bass grounds everything; don't get busy. Drop D tuning matches the guitar.",
      drums: "Driving straight 8ths on hi-hat, snare on 2 and 4. Keep it steady and slightly mechanical—think drum machine feel played by a human. DON'T fill too much; the hypnotic quality requires restraint. Breakdown: strip to kick and snare, half-time feel. Build back gradually. Floor tom accents in final section.",
      keys: "Stay minimal. Rhodes/electric piano stabs on off-beats, long sustained notes. Don't play through the whole riff—leave holes. Add texture, not melody. In breakdown, sustained pads that swell. Think: you're adding color to a black-and-white photo, not painting over it."
    }
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
    critical: "Bass riff NEVER changes for 5+ minutes. Everything else builds into free-jazz chaos around it. Without horns, guitars/keys must create the chaos.",
    structure: "Intro (bass riff, 8 bars) → Verse 1 (vocals enter) → Verse 2 → Instrumental Build (horns/chaos begins) → Peak Chaos → Outro (chaos subsides, bass remains)",
    chords: "Bass riff: D-D-D-D-F#-G-A-A (8th notes, relentless). Guitar: D5 stabs. The 'chord progression' is really just D major implied by the bass riff. Chaos sections are atonal.",
    notes: {
      guitar: "Guitar 1: Tremolo-picked single notes oscillating between D and F#. Volume swells, feedback manipulation. Guitar 2: Ondes Martenot-style wailing—use an EBow or slide with heavy reverb and delay, pitch-bending wildly. In chaos section, both guitars make NOISE—scrape strings, feedback, atonal stabs. You're replacing a horn section, so get weird. Earplugs recommended.",
      bass: "THE riff. D-D-D-D-F#-G-A-A in 8th notes. You play this identically for the ENTIRE song—never stop, never vary, never accent differently. You are the anchor while everything else goes insane. Drop D tuning. Tone: slight grit but mostly clean. Your consistency is what makes the chaos work.",
      drums: "Krautrock motorik beat. Steady, driving, almost mechanical. Kick on every beat, snare on 2 and 4, hi-hat 8ths. DO NOT react to the chaos around you—your job is to stay locked with the bass. The tension comes from the drums/bass being utterly steady while everything else freaks out. Only slight builds in intensity through cymbal choice.",
      keys: "Without a horn section, you're crucial for the chaos. Ondes Martenot (or pitch-bend synth with expression pedal) for eerie wailing. Alternatively: theremin app, or any synth set to sine wave with portamento. In chaos section, add dissonant clusters, random atonal stabs. Think free jazz—react to what others play. Noise is the point."
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
    critical: "Bass plays a HIGH melodic lead (Joy Division influence). Synth creates haunting sustained walls. Urgent, driving, emotionally huge.",
    structure: "Intro (bass melody + synth wall, 8 bars) → Verse 1 → Chorus ('I will eat you alive') → Verse 2 → Chorus → Bridge (intensity drops) → Final Chorus (biggest) → Outro",
    chords: "Cm → Ab → Eb → Bb (verse). Chorus: Fm → Cm → G → Cm. Bass plays melodic line over these changes, not root notes.",
    notes: {
      guitar: "Guitar 1: Clean arpeggiated figures, chorus or phaser modulation. Pick each note clearly. Guitar 2: Delay-heavy ambient swells (dotted 8th delay), volume pedal for fade-ins. In choruses, both guitars can hit full chords with some grit. Bridge: pull back to clean arpeggios only. Build back into final chorus with sustained power chords.",
      bass: "Play HIGH on the neck—12th fret and above. This is a melodic lead part, Joy Division/Peter Hook style. The bass line is the main hook: C-Eb-G-Bb-C pattern played high. Use a pick for clarity and brightness. Slight overdrive helps cut through. You're NOT playing root notes—you're playing a counter-melody. Study the original carefully; the bass is the song's signature.",
      drums: "Driving 8th notes on hi-hat, urgent feel. Snare on 2 and 4 with some ghost notes. Kick pattern syncs with bass accents. Build intensity through the song but stay controlled—this isn't thrash, it's controlled urgency. Bridge: half-time feel, floor tom accents. Final chorus: open hi-hat, crash cymbals, full power.",
      keys: "Synth pads create sustained 'walls' of sound. Use sine wave or soft saw with long attack and release. Ondes Martenot-style pitch bending adds the haunting quality—expression pedal for dynamics. Hold chord tones (Cm, Ab) and let them sustain under everything. In choruses, add higher octave doublings. This texture is what makes the song feel massive."
    }
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
    critical: "Quiet bossa nova verses explode into apocalyptic rock climax. The dynamic contrast is extreme—don't blow your load early.",
    structure: "Intro (bossa feel, 8 bars) → Verse 1 (quiet) → Verse 2 (building) → Pre-Chorus (tension) → Chorus (EXPLODES) → Verse 3 → Pre-Chorus → Final Chorus (extended, guitar solo) → Outro (crashes and burns)",
    chords: "Em7 → A7 → Dmaj7 → Gmaj7 (verse, jazzy). Chorus: E5 → G5 → D5 → A5 (power chords, distorted). The shift from jazz voicings to power chords IS the arrangement.",
    notes: {
      guitar: "Verses: CLEAN jazz chords—Em7, A7, Dmaj7, Gmaj7 voiced like a jazz guitarist. Fingerpick or hybrid pick. Chorus: SLAM into distorted power chords, full strumming. The contrast must be dramatic. Lead guitar in final chorus: pentatonic-based solo over E, start melodic and build to chaotic whammy bar dives and feedback. The solo should feel like the song is tearing itself apart.",
      bass: "Verses: Walking bassline, jazz style. E-G-A-B patterns, chromatic passing tones. Keep it smooth and bouncy—you're in a jazz trio. Chorus: SWITCH to driving distorted 8th notes on roots. E-E-E-E-G-G-D-D-A-A. The transition should feel like a different song. Huge dynamic range—compressor will help but don't squash it.",
      drums: "Verses: Brushes on snare, bossa nova feel. Kick on 1 and 3, snare on 2 and 4 but SOFT. Hi-hat keeping time gently. Pre-chorus: switch to sticks, build with tom fills. Chorus: FULL ROCK—crash cymbals, driving 8ths, everything you've got. The brush-to-sticks moment should feel like a dam breaking. Final chorus: extended, let it get messy.",
      keys: "Minimal role—this is a guitar song. Verses: optional Rhodes chords doubling guitar voicings, very soft. Chorus: you can add a distorted organ pad for thickness, or sit out entirely. If playing, match the dynamic shift—whisper to scream. Don't compete with the guitar solo."
    }
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
    critical: "Bass plays an iconic high melodic line (requires alternate tuning). The song floats in 6/8—count in 2, feel the sway. Delicate throughout.",
    structure: "Intro (bass melody alone, 4 bars) → Verse 1 → Chorus ('you'll go to hell') → Verse 2 → Chorus → Bridge (falsetto, builds slightly) → Final Chorus → Outro (bass melody fades)",
    chords: "E → C#m → A → B (verse). Chorus: F#m → A → E → B. The 6/8 feel means each chord gets 2 beats of 3—count '1-2-3, 2-2-3'.",
    notes: {
      guitar: "Sparse clean arpeggios, high on the neck. Use volume swells—notes should bloom, not attack. Dotted 8th delay helps create atmosphere. Play the chord tones but leave SPACE. In choruses, you can sustain full chords. This is not a guitar-forward song—support the bass and vocals. Reverb and delay are your friends.",
      bass: "ALTERNATE TUNING: EAEGBE (3rd string tuned down to E). This is THE bass part of In Rainbows. Play HIGH—12th-15th fret range. The melodic line: E-F#-G#-A-B-C#-B-A pattern over the verse. You're playing a lead melody, not bass lines. Use fingers, play gently. Let notes ring and overlap slightly. Study this part thoroughly—it makes the song.",
      drums: "Brushes entire song, 6/8 waltz feel. Swaying, gentle, like rocking a boat. Snare on beat 4 of each 6/8 bar (the 'and' of 2 if counting in 2). Keep the hi-hat wash continuous. NO fills, no crashes, no sticks. The delicacy is non-negotiable. If you overplay, you ruin the song.",
      keys: "String pad sustaining chord tones—warm, soft, lots of reverb. Synth bass can double the low end if needed (bass guitar is playing high). Let chords sustain and overlap. In bridge, swell slightly with expression. Think orchestral strings, not synth leads. Stay below the bass melody in the mix."
    }
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
    <div className="mt-3 mb-4 space-y-3">
      {/* Quick Stats Bar */}
      <div className="font-mono text-sm text-[#ccc] flex flex-wrap gap-x-3 gap-y-1">
        <span>{track.key}</span>
        <span className="text-[#666]">•</span>
        <span>{track.tempo} BPM</span>
        <span className="text-[#666]">•</span>
        <span>{track.timeSig}</span>
        {track.tuning && (
          <>
            <span className="text-[#666]">•</span>
            <span className="text-[#00ff9f]">{track.tuning}</span>
          </>
        )}
      </div>

      {/* Critical Element */}
      <p className="text-base text-[#ddd] leading-relaxed">
        {track.critical}
      </p>

      {/* Structure */}
      <div className="text-sm">
        <span className="text-[#00ff9f] font-semibold">Structure: </span>
        <span className="text-[#bbb]">{track.structure}</span>
      </div>

      {/* Chords */}
      <div className="text-sm">
        <span className="text-[#00ff9f] font-semibold">Chords: </span>
        <span className="text-[#bbb] font-mono">{track.chords}</span>
      </div>

      {/* Reference Link - prominent placement */}
      {track.reference && (
        <a
          href={track.reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#00ff9f] hover:text-[#00ffbf] underline underline-offset-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch: {track.reference.label}
        </a>
      )}

      {/* Role Notes Toggle */}
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="text-sm text-[#888] hover:text-[#ccc] transition-colors flex items-center gap-2"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showNotes ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {showNotes ? "Hide" : "Show"} Role Notes
      </button>

      {/* Role Notes Grid (collapsible) */}
      {showNotes && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-[#161616] rounded-lg border border-[#333]">
            <span className="text-[#00ff9f] font-semibold">Guitar</span>
            <p className="mt-2 text-[#bbb] leading-relaxed">{track.notes.guitar}</p>
          </div>
          <div className="p-3 bg-[#161616] rounded-lg border border-[#333]">
            <span className="text-[#00ff9f] font-semibold">Bass</span>
            <p className="mt-2 text-[#bbb] leading-relaxed">{track.notes.bass}</p>
          </div>
          <div className="p-3 bg-[#161616] rounded-lg border border-[#333]">
            <span className="text-[#00ff9f] font-semibold">Drums</span>
            <p className="mt-2 text-[#bbb] leading-relaxed">{track.notes.drums}</p>
          </div>
          <div className="p-3 bg-[#161616] rounded-lg border border-[#333]">
            <span className="text-[#00ff9f] font-semibold">Keys</span>
            <p className="mt-2 text-[#bbb] leading-relaxed">{track.notes.keys}</p>
          </div>
        </div>
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
        <section className="w-full max-w-3xl">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[#888] mb-8">
            Set I — {tracks.length} Tracks
          </h2>

          <ol>
            {tracks.map((track, i) => (
              <li key={i}>
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
                  <a
                    href={track.sheet}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#444] bg-[#161616] hover:border-[#00ff9f] hover:bg-[#1a1a1a] transition-all text-sm text-[#aaa] hover:text-[#fff]"
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

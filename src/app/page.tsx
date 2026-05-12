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
  vocals: string;
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
    title: "Optimistic",
    album: "Kid A",
    year: "2000",
    sheet: "/sheets/optimistic.pdf",
    lyrics: "https://genius.com/Radiohead-optimistic-lyrics",
    audio: "optimistic",
    key: "E Minor",
    tempo: 120,
    timeSig: "4/4",
    critical: "The riff is a driving, syncopated E minor pattern that must feel urgent and relentless — not a plodding rock groove. Keep it tight, percussive, and slightly aggressive, almost punk-adjacent in energy.",
    structure: "Intro (driving guitar riff) → Verse 1 → Chorus → Verse 2 → Chorus → Bridge/breakdown (quieter, spacious) → Verse 3 → Extended guitar-driven outro (repetitive riff builds to noise)",
    chords: "Verses: Em5 power chord riff, chromatic approach notes. Chorus: Em → C → G → D (i-VI-III-VII). Bridge: strips down to sparse Em with space between chords. Outro: Em riff repeats with increasing distortion and feedback.",
    notes: {
      vocals: "Mid-range (E4 to B4), urgent and biting with a sneering quality. Verses are clipped and rhythmic, almost barking. Chorus opens up into a fuller, more melodic delivery but still aggressive. 'Optimistic is a curse' is the hook — deliver it with bitter irony. No falsetto, no softness. Heavy compression, close-mic'd. The outro vocal becomes fragmented and repetitive, fading into the noise.",
      guitar: "Drop D or standard — the riff is power-chord driven with chromatic movement. Heavily distorted, tight palm-muted chugging on the low strings. Telecaster bridge pickup or humbucker, Marshall-style overdrive (not fuzz). Intro riff is the signature — short, punchy, syncopated power chord stabs with rests between groups. Chorus: fuller Em/C/G/D strumming. Bridge: sparse single-note picking. Outro: repeat the riff, let feedback take over, volume swells, controlled chaos.",
      bass: "Driving, locked with the guitar riff's syncopation. Root notes dominate — E and chromatic passing tones. Pick for attack, slightly overdriven amp. No fills, no melodic wandering — be the engine. Stay in the pocket with the kick drum. During the chorus, walk through C → G → D with solid quarter notes. This is Colin Greenwood at his most straightforward and effective.",
      drums: "Heavy, driving 4/4 — kick on 1 and 3, snare on 2 and 4, tight closed hi-hats or ride during verses. Chorus opens up with crash cymbal and more aggressive snare hits. Bridge: pull back to just rim clicks or cross-stick with sparse kick. Outro: build to full assault — open hats, crash accents, heavy snare and floor tom hits. Think 'rock-solid groove' not 'prog complexity.' Phil Selway keeping it simple and devastating.",
      keys: "No prominent keyboard on the original. If adding keys for a live cover, use a subtle distorted organ pad (like a Leslie-wound B3) doubling the guitar riff during the outro for extra weight. Otherwise, sit out — guitars and rhythm section carry this entirely."
    }
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
    critical: "This song lives or dies on the GROOVE — the rhythm section must lock into a deep, hip-hop-influenced pocket at 79 BPM. If it feels stiff instead of heavy and hypnotic, the whole thing falls apart.",
    structure: "Intro (drum machine + electric piano groove) → Verse 1 → Verse 2 → Chorus → Verse 3 → Chorus → Bridge/Breakdown → Verse 4 → Outro (long, gradual fade with layered textures)",
    chords: "Em7 → Bm7 (verse/chorus vamp, Dorian flavor). Chorus adds Am7 → Em7 for the only real harmonic movement. Outro: Em7 vamp dissolving into texture.",
    notes: {
      vocals: "Low-to-mid chest voice (Bb3 to F4), sneering and venomous. Almost spoken-word delivery through the verses, monotone and bitter, building into shouted phrases. Heavy compression and grit — sing through clenched teeth, not prettily. The 'no no no no no' refrain should feel like you're swatting someone away. Sit slightly behind the beat with your phrasing and let the groove carry you.",
      guitar: "NOT a guitar-forward song. Sparse, clean Em7 and Bm7 stabs high on the neck (7th-9th frets), muted and rhythmic. Touch of chorus or tremolo on a clean amp. Your role is textural — short, choppy chord stabs that sit inside the groove, not on top of it. Second guitar can add ambient swells or single-note delay lines, entering only in the second half.",
      bass: "Syncopated, funky line rooted around E and B — the feel is closer to hip-hop or neo-soul than rock. Think D'Angelo's rhythm section. Warm, round tone (flatwounds or roll off the tone knob). Stay locked in the pocket with the drum pattern. The bass and drums ARE this song; every other instrument is decoration.",
      drums: "The studio track uses a drum machine foundation with live drums layered on top. For live cover: internalize that mechanical, locked-in feel. Deep pocket half-time groove. Brushes or hot rods for the first half, sticks for the build. Add fills and ride cymbal work after the 3-minute mark. The groove must feel programmed even when played by a human.",
      keys: "THIS IS THE LEAD INSTRUMENT. Fender Rhodes or Wurlitzer playing the Em7-Bm7 vamp with jazzy, soulful comping — broken voicings with rhythmic variation, not block chords. Think a Rhodes player on a D'Angelo record. Add tremolo effect for authenticity. Left hand can double bass root movement. This part carries the song from start to finish."
    }
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
    critical: "The groove is everything — the riff must feel like a locked, hypnotic loop with a slightly behind-the-beat swagger, not a stiff mechanical repetition. DROP D tuning is non-negotiable.",
    structure: "Intro riff (8 bars) → Verse 1 → Chorus → Verse 2 → Chorus → Bridge/Breakdown ('open your mouth') → Extended riff outro with gradual build → End",
    chords: "Drop D: Main riff orbits Dm using D5 → F5 shapes. Riff pattern: D (open) — hammer to F (3rd fret) — slide to G — back to D. Chorus: Bb → C → Dm. Bridge stays on Dm, sparser.",
    notes: {
      vocals: "Mid-range chest voice (C4 to G4) with restless, muttering energy. Dry and close-mic'd in verses — nearly whispered — then blooms with room reverb as it lifts. Toggle between barely-there mumbling and sudden conviction. 'I might be wrong' lands like a confession every time. The repeated outro ('open up, begin again') is a mantra, not a crescendo — sustain the energy without escalating.",
      guitar: "Drop D tuning, no exceptions. Clean-ish tone with subtle overdrive — slightly broken-up amp, not distortion pedal. Neck pickup Telecaster tone. Riff sits around 3rd-5th fret, hammering and pulling off against the open D string drone. Chorus: fuller chord stabs (Bb power chord at 8th fret in Drop D, C at 10th). Breakdown: strip to single notes, let delay trails breathe.",
      bass: "Simple, deep foundation — mostly root notes following the riff on D. During chorus, walk up to Bb and C with smooth quarter notes. Warm, round tone, no brightness. Stay in the pocket and resist getting busy — the guitar riff is the star. Drop D tuning matches the guitar.",
      drums: "Tight, almost hip-hop-influenced groove. Kick on 1 and the 'and' of 2, snare on 3, hi-hats in steady 8ths with occasional open hat accents. Dry and contained — no big fills, no cymbal washes. Think programmed beat played by a human. Breakdown: pull back to just hi-hat and ghost notes on snare.",
      keys: "Minimal role. Sustained Dm and Bb/C pads very quietly underneath, adding body without competing with the riff. A tremolo effect on a Rhodes tone works well. Stay out of the way — the guitar riff owns this song."
    }
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
    critical: "This song requires THREE independent, interlocking guitar parts working like clockwork — if any one is wrong or out of time, the whole Smiths-inspired tapestry unravels. Rehearse the guitar parts together extensively before adding vocals.",
    structure: "Intro (interlocking guitars) → Verse 1 → Chorus 1 → Verse 2 → Chorus 2 → Instrumental Bridge → Verse 3 → Chorus 3 → Outro (extended, guitars build and layer)",
    chords: "Verse: Cm → Bb → Ab → Gm (descending natural minor). Chorus: Cm → Gm → F → Em (the F and Em create harmonic surprise, pulling briefly outside the key). Outro: returns to verse progression with layered guitars building.",
    notes: {
      vocals: "Narrow mid-range (D4 to G4), flat and detached — harder to pull off than it sounds. Almost no vibrato, very little dynamic variation. The coldness IS the emotion. 'If you'd been a dog, they would have drowned you at birth' should be delivered like reading a fact off a page. Do not add emotion that isn't there. Subtle double-tracked vocals thicken the chorus on the record — performing solo, lean into the phrases more to compensate.",
      guitar: "Guitar 1 (Jonny — Lead): Signature descending arpeggiated riff on the B and high E strings. Clean tone with slight overdrive — Telecaster or Jazzmaster chime. This part weaves through the entire song and never stops. Think Johnny Marr on 'How Soon Is Now.' Guitar 2 (Ed — Rhythm): Strummed Cm barre (3rd fret), Bb (1st fret), Ab (4th fret) shapes. Clean-to-slightly-overdriven, compression and short delay. Guitar 3 (Thom — Foundation): Acoustic or clean electric, gentle quarter/eighth-note strumming of the basic progression. Steady and understated.",
      bass: "Melodic, wandering line inspired by Bernard Edwards (Chic) — not just root notes. Move through Cm-Bb-Ab-Gm with passing tones and chromatic movement, giving the song a sense of drift. Pick for definition or fingerstyle for rounder sound. Warm but present tone. You're the glue between three guitar parts and the drums.",
      drums: "Driving, steady 4/4 with ride cymbal and ghost notes on snare. Propulsive but not aggressive — you're the engine underneath the guitars. Medium-weight stick, relatively simple kick pattern. Hi-hat/ride work provides forward motion. Do NOT add flashy fills — this song is about hypnotic repetition.",
      keys: "Minimal to none in the original. If covering with keys, double the chord progression with sustained pad sounds (string synth or organ) sitting very low in the mix, entering only in the second half for added weight. Do not compete with the guitar parts."
    }
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
    critical: "The descending chromatic bass line IS the song — if the bass player does not nail that smooth, singing, high-register melody, nothing else matters. Count in 6/8: ONE-two-three-FOUR-five-six.",
    structure: "Intro (bass melody alone, 8 bars) → Verse 1 (voice + bass + light guitar) → Verse 2 (drums enter gently) → Chorus ('don't get any big ideas') → Instrumental build → Verse 3/Climax (full band, falsetto peak) → Outro/decay",
    chords: "Verse: E → Emaj7/D# → G#m7 → A → Amaj7 → E/G# → F#m7 → B7sus4 (8-bar cycle with chromatic bass descent). Chorus: A → Amaj7 → E/G# → G#m → C#m → F#m → B7.",
    notes: {
      vocals: "One of the most vocally demanding Radiohead songs. Verse sits in comfortable low-mid chest voice (Bb3 to Eb4), but the chorus climbs into pure, exposed falsetto reaching Bb5. That falsetto must be pristine — no breathiness, no wobble, just clean floating tone. Heavy reverb with long spacious decay. 'Don't get any big ideas, they're not gonna happen' needs to ache with resignation, not anger. If your falsetto isn't reliable up to Bb5, transpose down. A cracked note in the chorus destroys the spell.",
      guitar: "Clean tone, lots of reverb and delay. Sparse, chiming arpeggios — not full strumming. Voice chords high on the neck: Emaj7 as x-x-9-8-9-7, G#m7 as x-x-6-4-4-4. Fingerpick or hybrid pick exclusively. The guitar is atmospheric texture, not rhythm. During the climax, allow controlled feedback and volume swells to add intensity without playing more notes.",
      bass: "LEAD bass part. Play HIGH on the neck — 7th to 12th fret range — with a smooth, almost vocal tone. The line descends chromatically: E (7th fret A string) → D# → D-natural → C#, creating a counter-melody against the chords. Neck pickup, roll off tone knob, fingers only (no pick). Every note should sing and sustain. This is the Peter Hook / melodic bass approach. Practice this more than anything else.",
      drums: "Brushes for the first half, possibly sticks for the climax. 6/8 waltz feel — kick gently on 1 and 4 (dotted quarters), snare ghost notes on backbeats. Swaying, like rocking a boat. No fills until the climax, where you can open up with cymbal swells and more aggressive snare. Cross-stick works for early sections. Restraint is the entire job.",
      keys: "Warm piano or Rhodes playing arpeggiated figures that outline chord extensions — the major 7th of E, the #11 of A. Keep sustain pedal down, let notes bleed into each other. During climax, play fuller voicings and octave doublings for intensity. A synth pad with portamento (slow pitch glide) approximates the Ondes Martenot textures on the record."
    }
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
    critical: "The Fender Rhodes electric piano defines this song's DNA — without that specific warm, wobbly, Miles Davis 'Bitches Brew'-era tone, you lose the entire atmosphere. A standard piano or generic synth patch will NOT work.",
    structure: "Intro (Rhodes + guitar, chromatic descent) → Verse 1 → Chorus 1 → Verse 2 → Chorus 2 → Bridge/Guitar Solo (Jonny's Whammy solo) → Verse 3 → Outro (extended jam)",
    chords: "Intro/Chorus: Dm → Ab → D/F# → Db/F → G7 → G6 → Cm/G → G (chromatic bass descent is the defining feature). Verse: G7 → G6 → Cm → G (cycling, with Cm creating bittersweet surprise against G major).",
    notes: {
      vocals: "Dreamy, detached, floating. Mid-register (D4 to A4) using a soft head-voice blend that sounds like narrating a dream. Run your vocal through a light chorus or ensemble effect if possible for the shimmering, alien quality. Delivery is legato and unhurried — every phrase drifts into the next. Do not punch consonants. The emotional register is wistful loneliness — you're watching the world from outside of it. Layered harmonies in the second half; a harmony voice a third above is ideal if available.",
      guitar: "Rhythm: CLEAN jazz-influenced chords — G7 (3x3400 or xx5767), G6 (3x2000 or xx5757). Extended voicings, not basic open chords. Fingerpick or hybrid pick, clean amp (Fender Twin-style) with chorus and warm analog delay. Gentle, behind-the-beat strumming. NO distortion anywhere. Lead (Jonny): Fender Starcaster through DigiTech Whammy (octave up), phaser, and Memory Man delay. Solo is loose and spacey, using D major/G Mixolydian, sliding and warbling pitch-shifted notes.",
      bass: "Smooth, melodic line following the chromatic descents — walking from D through Db to C, resolving to G. Warm, round tone with no pick attack. Flatwounds or P-Bass tone. Play legato, connecting notes smoothly. Jazz walking bass adapted for rock. Do not dig in aggressively — this song floats.",
      drums: "Subtle, brushed-feeling pattern with a lilting, swaying quality. Light touch — brushes or light sticks on ride cymbal. Ghost notes on snare are essential. Sparse, carefully placed kick. Think jazz drummer sitting in with a rock band. The tempo is relaxed; do not rush. Drums should feel slightly behind the beat at all times.",
      keys: "THIS IS YOUR SONG. Fender Rhodes Mark I Suitcase (or best emulation). Extended jazz voicings: G7 with the 9th, G6, Cm with added tones. Use tremolo effect (built-in or external pedal) for the characteristic warble. Play broken chords, let notes ring and overlap. Inspired by Miles Davis 'Bitches Brew' sessions. Must sound warm, dreamy, and slightly out-of-focus."
    }
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
    critical: "The bass riff must be absolutely metronomic and unyielding — the whole song depends on that one riff holding steady while everything else spirals into controlled anarchy around it.",
    structure: "Intro (bass riff alone, 4 bars) → Bass + drums build → Verse 1 (vocal enters over riff) → Verse 2 → Transition (chaos creeps in) → Extended horn chaos section (builds in intensity and dissonance) → Climax → Abrupt end",
    chords: "No chord changes in the traditional sense. Bass riff: D-D-F-D-A-G-F-D in driving 8th notes. Harmony is Dm throughout. Vocals imply occasional F major and C major movement above the static bass. Chaos sections are atonal.",
    notes: {
      vocals: "Heavy processing required — distortion, lo-fi filtering, megaphone or overdriven preamp effect on the vocal mic. Range is narrow (Eb4 to Ab4) and the delivery is frantic, like a news broadcast from a collapsing building. You need to sound like you're shouting through a broken PA system. Without a distortion effect on your mic, you lose the entire character. Phrasing is repetitive and hypnotic — 'everyone is so near, everyone has got the fear' — and should feel like a loop slowly coming unhinged. No tenderness here. This is anxiety broadcast at volume.",
      guitar: "Fuzz pedal required — gated fuzz or aggressive overdrive (Shin-Ei FY-2 style, or EHX Big Muff). First half: textural noise — stabs, scrapes, atonal bursts over the bass riff. No conventional chords. Second half: Whammy pedal set to random intervals, controlled feedback, pitch-shifted chaos. Approximate the Ondes Martenot with heavy fuzz and whammy. Your job is to be unsettling, not melodic. With one guitarist, play sparse aggressive D5 stabs on 1 and 3 during verses, then go full noise in the breakdown.",
      bass: "THIS is your song. The riff: D-D-F-D-A-G-F-D as driving 8th notes, all on D and A strings (5th-10th fret area). Pick attack, bridge pickup, slight overdrive. Do NOT vary the riff. Do NOT add fills. Play it identically 100+ times with machine-like precision and intensity. The relentless, almost punk simplicity is the entire point.",
      drums: "Massive, heavy groove — kick and snare hitting hard on standard 4/4 backbeat (kick on 1 and 3, snare on 2 and 4), hi-hat driving 8ths. As chaos builds: open hi-hats, crash cymbals on every beat, floor tom accents. You are the anchor with the bass. If the noise goes haywire, drums and bass must remain locked and unshakeable. Hit hard. Keep time. Do not get pulled into the chaos.",
      keys: "On the record, textures come from electronics and Ondes Martenot. In a cover: low droning synth pad on D (dark analog patch, sawtooth with filter mostly closed). During chaos section, add dissonant clusters and pitch-bent stabs to simulate horn mayhem. A Moog-style bass synth doubling the bass riff an octave lower adds devastating weight. If you have a second keyboard, play free-jazz horn lines in D minor — as aggressively and dissonantly as you dare."
    }
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
    critical: "The challenge is not the notes — it is recreating the FEELING of claustrophobic, machine-driven urgency with a live band. If you play this like a normal rock song with guitars and drums, it will sound like a bad cover. Commit to the electronic aesthetic.",
    structure: "Intro (synth chord loop + modular drum pattern, ~30 sec build) → Verse 1 → Chorus ('ice age coming') → Verse 2 → Chorus 2 → Breakdown (frantic energy) → Chorus 3 (climax) → Outro (loop decays)",
    chords: "The ENTIRE song is one repeating chord loop (5 bars): Gm → Eb → Eb → Ebmaj7 → Ebmaj7. All inversions of Ebmaj7 (Eb, G, Bb, D). Sampled from Paul Lansky's 1973 composition 'Mild und Leise.' The harmonic content never changes — drama comes from dynamics and vocal intensity.",
    notes: {
      vocals: "Narrow range (E4 to A4), tense and clipped chest voice with compressed, urgent quality. Verses are rhythmically precise, almost chanted — phrasing locks to the electronic pulse and must not drift. 'Women and children first' delivered with escalating panic. Chorus ('ice age coming') explodes into desperate, almost shouted repetition. Start contained, end unhinged — the song accelerates emotionally even though tempo stays constant. The 'here I'm alive, everything all of the time' outro is a mantra; deliver it like you're trying to convince yourself.",
      guitar: "There is NO guitar in the original recording. If you must include guitar, use it ONLY for textural volume swells with heavy reverb and delay, sitting far back in the mix. Better option: switch to a synth or sampler for this song. Do NOT strum the chords on guitar — it destroys the vibe completely.",
      bass: "No traditional bass guitar in the original. Low end comes from synth chord voicings and modular kick. If you must play, run through an octave-down synth effect (EHX Bass Micro Synthesizer or similar) or use a synth bass pedal. Play root notes G → Eb in pulsing 8th-note pattern. Keep it mechanical and repetitive. No fills, no melodic movement.",
      drums: "Original pattern created on an Analog Systems modular synth — self-oscillating filters for kick, envelope-triggered noise for snare/hi-hat. For live: (1) trigger samples from electronic kit, tight and mechanical, or (2) acoustic drums VERY simply — locked-in robotic four-on-the-floor kick, clipped tight snare on 2 and 4, rigid 8th-note hi-hats. No swing, no fills, no humanity. Live Radiohead versions are ~146 BPM (faster than studio).",
      keys: "This is the ENTIRE song — your responsibility almost completely. Recreate the Ebmaj7 inversion loop using an FM synth patch (Arturia DX7, Ableton Operator, or real DX7). Chords should sound cold, digital, slightly metallic — NOT warm analog pads. Trigger each chord from a sampler or keyboard. Also need the Ondes Martenot-style swooping lead in the chorus: synth with portamento, sine or triangle wave, slow attack. You carry everything."
    }
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
    critical: "The quiet-LOUD-quiet dynamic contrast is EVERYTHING — quiet sections must be genuinely delicate (falsetto barely above a whisper), loud sections must be genuinely savage and chaotic. If the contrast is not extreme, the song has no drama.",
    structure: "Intro (clean arpeggiated guitar, falsetto) → Verse 1 (quiet) → LOUD Bridge/Chorus (wall of distortion) → Verse 2 (quiet again) → LOUD Bridge/Chorus 2 → Quiet Interlude → Final LOUD section → Outro (quiet, then final noise burst)",
    chords: "Verse (quiet): G → Cm → G → Cm (Cm borrowed from G minor, bittersweet tension). Chorus/Bridge (LOUD): G5 → C5 → E5 → open dissonance (power chords with Whammy octave chaos). Outro returns to quiet G → Cm.",
    notes: {
      vocals: "Two completely different modes. Quiet sections: breathy, low register (B3 to E4), almost whispering — fragile and intimate. Loud sections: full-throated screaming (G4 to B4) at maximum volume. You must make the transition cleanly and commit fully to both extremes. There's a sneering, self-aware quality — 'this is our new song, just like the last one' — mocking yourself and the audience simultaneously. The dynamic contrast is the entire point. If you smooth it out, you've killed the song.",
      guitar: "Guitar 1 (Jonny — Lead): TWO different sounds. QUIET: clean arpeggiated G and Cm, possibly with EBow sustain. LOUD: DigiTech Whammy (octave up) into Marshall Shred Master distortion — glitchy, shrieking, lo-fi wall of pitch-shifted noise. Aggressive power chords meant to sound broken and furious. Guitar 2 (Ed — Texture): EBow generating sustained drone during quiet sections (bowed string tone). LOUD sections: heavy rhythm guitar with distorted barre chords. You need an EBow (~$100) or volume pedal swells as substitute.",
      bass: "Melodic, foundational line in quiet sections following G → Cm with warm round tone (Music Man StingRay vibe). LOUD sections: lock in with kick drum on aggressive root-note power, dig in HARD. Use a pick for loud parts if you normally play fingerstyle — you need that attack. The contrast between gentle verse bass and punishing bridge bass is as important as the guitar contrast.",
      drums: "Mirror the song's bipolar personality. QUIET: light, delicate — brushes or cross-stick, gentle ride, minimal kick, tempo relaxes to ~90 BPM. LOUD: absolute assault — crashing cymbals, heavy kick, tempo pushes to ~105-110 BPM. Transitions must be INSTANT — one bar whispering, next bar demolishing. Practice the transitions specifically; they're the hardest part.",
      keys: "No prominent keyboard in the original. Sit out or add very subtle pad textures (organ or string synth) during quiet sections ONLY, dropping out completely during loud sections. Do not fill space — the quiet sections derive their power from emptiness."
    }
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
    critical: "This song is built entirely on LOOPED acoustic guitar layers — if you cannot replicate the layering (via a loop pedal or two guitarists), it will sound empty and incomplete.",
    structure: "Intro (single guitar loop, ~8 bars) → Loop layers build (second guitar pattern added) → Verse 1 (vocal enters, spare) → Chorus ('don't haunt me') → Verse 2 → Chorus → Extended outro with layered vocal loops ('don't hurt me' stacked) → Fade",
    chords: "Am → C → Em → Am (played as arpeggiated fingerpicking, capo 2 shapes). Same progression throughout — dynamics and texture do all the work. Harmonic content never changes.",
    notes: {
      vocals: "Built on looped vocal layers — you NEED a loop pedal for your mic. Record a phrase, loop it, sing over yourself. Main vocal sits in gentle mid-register (D4 to G4) with soft ghostly falsetto floating above (up to D5). Delivery is fragile and repetitive, like a lullaby sung to yourself in an empty room. Heavy reverb and delay. Each 'don't haunt me' is slightly different in weight, building a choir of yourself. The delicacy is non-negotiable — no drums, no distortion, nowhere to hide. If your pitch or timing wavers, it's exposed immediately. Practice loop timing until it's second nature.",
      guitar: "You NEED a loop pedal (Boss RC, TC Ditto, or similar). Build from two looped parts: (1) fingerpicked arpeggios on Am → C → Em → Am on higher strings (1-3), and (2) a lower rhythmic pattern on same chords emphasizing strings 3-5. Layer loops, then play a third live part for accents. Steel-string acoustic, warm woody tone. Fingerpick exclusively — no pick. If two guitarists, divide the loops and skip the pedal.",
      bass: "There is essentially NO bass on the studio recording. If you must play, use extremely sparse root notes — A and C as whole notes, felt more than heard, soft round tone. Less is more. Honestly consider sitting this one out or switching to supplementary percussion.",
      drums: "No conventional drums on the studio recording. Rhythm comes from looped guitar patterns. If drumming live, use brushes on a single snare or cajon — very gentle pulse on beats 2 and 4. No hi-hat, no fills. Your job is the faintest skeleton of pulse without disrupting the intimate, ghostly atmosphere. Consider a shaker instead of any kit instrument.",
      keys: "Not prominent on the record. Add a high, ethereal pad — slow-attack string synth or shimmer reverb pad sustaining the root note (A). Keep volume extremely low, just warmth underneath the acoustic guitars. A reverse-reverb pad triggered at chord changes adds beautiful ghostly quality. Mellotron strings or choir patch is ideal. No melodic lines — purely atmospheric."
    }
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
    critical: "This is Radiohead at their most emotionally direct — the vocal delivery must be sincere and vulnerable, not detached or ironic, which is the opposite instinct most Radiohead cover bands have.",
    structure: "Intro (guitar arpeggios, 4 bars) → Verse 1 → Pre-Chorus ('I won't run away') → Chorus ('I promise') → Verse 2 → Pre-Chorus → Chorus → Bridge (builds intensity) → Final Chorus (extended, vocal peak) → Outro (arpeggios fade)",
    chords: "Verse: E → B/D# → C#m → A (classic descending bass). Pre-Chorus: F#m → A → E → B. Chorus: A → E → B → C#m, then A → E → B. Bridge: C#m → A → E → B → C#m → A → F#m → B.",
    notes: {
      vocals: "Earnest and open in a way Thom rarely allows — mid-range chest voice (D4 to A4), straightforward, almost pleading. No hiding behind effects, no detachment, no irony. Light reverb, clean signal. 'I promise I won't run away' needs to sound like you mean every word, which is harder than it sounds if you're used to Radiohead's usual emotional armor. Stacked harmonies in the chorus fill out the sound — a third above on the main hook adds the warmth this track needs. Sing it like a love letter you were too afraid to send for two decades.",
      guitar: "Clean tone with chorus and delay — late-90s Radiohead shimmer (CE-2 chorus, ~400ms delay with moderate repeats). Arpeggiate through chord shapes using open strings to let notes ring (open E and B strings are your friends). During chorus, switch to gentle full strumming for dynamic lift. Second guitar adds slide or volume-swelled sustained notes — EBow or volume pedal ambient washes for texture.",
      bass: "Straightforward root-note playing with warm, round tone. Follow chord roots: E → D# → C# → A in verse (D# as chromatic passing tone, smooth and connected). Chorus: switch to driving 8th-note pattern on roots to push energy forward. Supportive, not flashy — warm foundation under a delicate vocal. Fingers, not pick, for softer attack.",
      drums: "Patient mid-tempo ballad groove. Kick on 1 and 3, snare on 2 and 4, hi-hat in steady 8ths. During verse, keep light — ghost notes on snare, soft kick. Build into chorus with harder snare hits and open hi-hat on 'and' of 4. Ride cymbal during chorus adds shimmer. One or two simple fills (snare roll into crash) at transitions. Start gentle, peak at final chorus, pull back for outro.",
      keys: "Warm piano or Wurlitzer/Rhodes playing sustained chord voicings in mid-register. Verse: whole-note or half-note pads — Emaj7, B/D#, C#m7, Amaj7 — with sustain pedal held, creating harmonic wash. Chorus: more rhythmic quarter-note chord stabs for propulsion. Subtle string pad layered underneath during bridge and final chorus adds the emotional weight this song needs. Stay in mid-to-low range, avoid competing with guitar arpeggios."
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
  const [showNotes, setShowNotes] = useState(true);

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
          <div className="p-3 bg-[#161616] rounded-lg border border-[#333] md:col-span-2">
            <span className="text-[#00ff9f] font-semibold">Vocals</span>
            <p className="mt-2 text-[#bbb] leading-relaxed">{track.notes.vocals}</p>
          </div>
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

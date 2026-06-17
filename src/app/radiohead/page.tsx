"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import VizCanvas from "@/components/VizCanvas";

interface Album {
  name: string;
  year: number;
  color: string;
  rgb: string;
  bg: string;
  mode: string;
  tracks: string[];
}

const ALBUMS: Album[] = [
  { name: "Pablo Honey", year: 1993, color: "#D4A840", rgb: "212,168,64", bg: "#0a0905", mode: "ambient", tracks: ["Anyone Can Play Guitar"] },
  { name: "The Bends", year: 1995, color: "#C45050", rgb: "196,80,80", bg: "#0a0505", mode: "pulse", tracks: ["Planet Telex", "My Iron Lung", "The Bends", "High and Dry", "Just", "Bones", "Street Spirit (Fade Out)"] },
  { name: "OK Computer", year: 1997, color: "#6A8AB0", rgb: "106,138,176", bg: "#05080a", mode: "bars", tracks: ["Airbag", "Paranoid Android", "Subterranean Homesick Alien", "Exit Music (For a Film)", "Let Down", "Karma Police", "Electioneering", "Climbing Up the Walls", "Lucky", "The Tourist", "I Promise"] },
  { name: "Kid A", year: 2000, color: "#D46A2A", rgb: "212,106,42", bg: "#0a0603", mode: "mountain", tracks: ["Everything In Its Right Place", "Idioteque", "National Anthem"] },
  { name: "Amnesiac", year: 2001, color: "#C43020", rgb: "196,48,32", bg: "#0a0302", mode: "rain", tracks: ["I Might Be Wrong", "Knives Out"] },
  { name: "Hail to the Thief", year: 2003, color: "#4A8AAA", rgb: "74,138,170", bg: "#05080a", mode: "crystals", tracks: ["There There", "A Punch Up at a Wedding", "Myxomatosis"] },
  { name: "In Rainbows", year: 2007, color: "#E86445", rgb: "232,100,69", bg: "#0a0603", mode: "drip", tracks: ["Bodysnatchers", "Nude", "Weird Fishes / Arpeggi", "Reckoner", "House of Cards", "Jigsaw Falling Into Place"] },
  { name: "The King of Limbs", year: 2011, color: "#8AAA5A", rgb: "138,170,90", bg: "#060a03", mode: "tree", tracks: ["Lotus Flower", "Give Up the Ghost"] },
  { name: "A Moon Shaped Pool", year: 2016, color: "#8AA0C0", rgb: "138,160,192", bg: "#05050a", mode: "moon", tracks: ["Burn the Witch", "Decks Dark"] },
];

const R2_AUDIO = "https://pub-2aed276eaa394a1bb824300549e693cb.r2.dev/audio/";
const R2_VIDEO = "https://pub-2aed276eaa394a1bb824300549e693cb.r2.dev/video/";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="7,5 19,12 7,19"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/></svg>`;
const SKIP_PREV = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
const SKIP_NEXT = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
const VIDEO_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="7,5 19,12 7,19"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export default function RadioheadPage() {
  const [activeAlbum, setActiveAlbum] = useState<string>(slugify("OK Computer"));
  const [curTrack, setCurTrack] = useState<string>("");
  const [curIdx, setCurIdx] = useState(0);
  const [curAlbumData, setCurAlbumData] = useState<Album | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [showProgress, setShowProgress] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const aCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqDataRef = useRef<Uint8Array | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Audio context setup — called on user gesture
  const setupAudio = useCallback(() => {
    const el = document.getElementById("audioEl") as HTMLAudioElement | null;
    if (!el) return;
    if (!aCtxRef.current) {
      const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      aCtxRef.current = actx;
      try {
        const analyser = actx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        freqDataRef.current = new Uint8Array(analyser.frequencyBinCount);
        actx.createMediaElementSource(el).connect(analyser);
        analyser.connect(actx.destination);
        analyserRef.current = analyser;
      } catch (e) {
        // If createMediaElementSource fails (CORS), still set up analyser for viz
        analyserRef.current = null;
      }
    }
    if (aCtxRef.current.state === "suspended") {
      aCtxRef.current.resume();
    }
  }, []);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    if (analyserRef.current && freqDataRef.current) {
      analyserRef.current.getByteFrequencyData(freqDataRef.current as unknown as Uint8Array<ArrayBuffer>);
      return freqDataRef.current;
    }
    return null;
  }, []);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const playTrack = useCallback((albumSlug: string, trackName: string) => {
    const audio = document.getElementById("audioEl") as HTMLAudioElement | null;
    if (!audio) return;
    const album = ALBUMS.find(a => slugify(a.name) === albumSlug);
    if (!album) return;

    const idx = album.tracks.indexOf(trackName);
    if (curTrack === trackName && isPlaying) {
      audio.pause();
      return;
    }

    // Setup audio context on user gesture
    setupAudio();

    setCurAlbumData(album);
    setCurTrack(trackName);
    setCurIdx(idx);

    const fileName = trackName === "Weird Fishes / Arpeggi" ? "Weird Fishes _ Arpeggi" : trackName;
    audio.src = R2_AUDIO + encodeURIComponent(fileName + ".mp3");
    audio.play();
    setIsPlaying(true);
    setShowProgress(true);
  }, [curTrack, isPlaying, setupAudio]);

  const playNext = useCallback(() => {
    const audio = document.getElementById("audioEl") as HTMLAudioElement | null;
    if (!curAlbumData) return;
    if (curIdx + 1 < curAlbumData.tracks.length) {
      playTrack(activeAlbum, curAlbumData.tracks[curIdx + 1]);
    } else {
      if (audio) { audio.pause(); audio.src = ""; }
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00 / 0:00");
    }
  }, [curIdx, curAlbumData, activeAlbum, playTrack]);

  const playPrev = useCallback(() => {
    if (!curAlbumData || curIdx <= 0) return;
    playTrack(activeAlbum, curAlbumData.tracks[curIdx - 1]);
  }, [curIdx, curAlbumData, activeAlbum, playTrack]);

  const openVideo = useCallback((albumSlug: string, trackName: string) => {
    const fileName = trackName === "Weird Fishes / Arpeggi" ? "Weird Fishes _ Arpeggi" : trackName;
    setVideoTitle(albumSlug + " — " + trackName);
    setVideoUrl(R2_VIDEO + encodeURIComponent(fileName + ".mp4"));
    setVideoOpen(true);
  }, []);

  const closeVideo = useCallback(() => {
    const v = videoRef.current;
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    setVideoOpen(false);
    setVideoUrl("");
  }, []);

  // Audio events
  useEffect(() => {
    const a = document.getElementById("audioEl") as HTMLAudioElement | null;
    if (!a) return;

    const onTime = () => {
      if (a.duration && isFinite(a.duration)) {
        setProgress((a.currentTime / a.duration) * 100);
        setCurrentTime(fmtTime(a.currentTime) + " / " + fmtTime(a.duration));
      }
    };
    const onEnd = () => {
      if (!curAlbumData) return;
      if (curIdx + 1 < curAlbumData.tracks.length) playTrack(activeAlbum, curAlbumData.tracks[curIdx + 1]);
      else { setIsPlaying(false); setProgress(0); setCurrentTime("0:00 / 0:00"); }
    };

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("pause", () => setIsPlaying(false));
    a.addEventListener("play", () => setIsPlaying(true));

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("pause", () => setIsPlaying(false));
      a.removeEventListener("play", () => setIsPlaying(true));
    };
  }, [curIdx, curAlbumData, activeAlbum, playTrack]);

  // Keyboard esc for video
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeVideo(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeVideo]);

  // Update CSS vars when album changes
  const currentAlbum = ALBUMS.find(a => slugify(a.name) === activeAlbum) || null;
  useEffect(() => {
    if (currentAlbum) {
      document.documentElement.style.setProperty("--rh-color", currentAlbum.color);
      document.documentElement.style.setProperty("--rh-rgb", currentAlbum.rgb);
      document.documentElement.style.setProperty("--rh-bg", currentAlbum.bg);
    }
  }, [currentAlbum]);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--rh-bg, #080808)", color: "#c8c0b8" }}>
      {/* Album tabs */}
      <div className="sticky top-0 z-10 bg-[color:var(--rh-bg,#080808)]/92 backdrop-blur-sm border-b border-white/[0.04] py-1.5 px-2.5">
        <div className="max-w-[960px] mx-auto flex gap-1.5 overflow-x-auto [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
          {ALBUMS.map(a => (
            <button
              key={slugify(a.name)}
              onClick={() => setActiveAlbum(slugify(a.name))}
              className={`flex-shrink-0 px-3 py-1 rounded-full border text-[0.58rem] font-mono tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                activeAlbum === slugify(a.name)
                  ? "text-white"
                  : "border-white/[0.08] bg-transparent text-white/[0.28] hover:text-white/[0.55] hover:border-white/[0.15]"
              }`}
              style={activeAlbum === slugify(a.name) ? { background: a.color, borderColor: a.color } : {}}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stage / Canvas */}
      <div className="max-w-[960px] mx-auto px-4 pt-4">
        <div id="vizStage" className="relative w-full h-[48vh] min-h-[260px] rounded-md overflow-hidden transition-colors duration-500"
             style={{ background: "var(--rh-bg, #080808)" }}>
          <VizCanvas mode={currentAlbum?.mode || "bars"} rgb={currentAlbum?.rgb || "106,138,176"} getFrequencyData={getFrequencyData} />
          <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none z-10"
               style={{ background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.25) 35%, transparent 60%)" }}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-500"
                style={{ color: "var(--rh-color)", textShadow: "0 0 50px rgba(var(--rh-rgb,106,138,176),0.2)" }}>
              {currentAlbum?.name || "Radiohead"}
            </h1>
            <p className="font-mono text-sm text-white/22 tracking-[0.12em] uppercase mt-1">
              {currentAlbum ? `${currentAlbum.year} · ${currentAlbum.tracks.length} track${currentAlbum.tracks.length > 1 ? "s" : ""}` : "Select an album"}
            </p>
          </div>
        </div>
      </div>

      {/* Track lists */}
      <div className="max-w-[960px] mx-auto px-4 py-5 pb-28">
        {ALBUMS.map(album => {
          const aSlug = slugify(album.name);
          const isActive = activeAlbum === aSlug;
          return (
            <div key={aSlug} className={isActive ? "block" : "hidden"}>
              <ul className="list-none">
                {album.tracks.map((track) => {
                  const isPlaying = curTrack === track;
                  return (
                    <li key={track}
                        className={`grid grid-cols-[22px_1fr_auto_auto] gap-2 items-center py-3 px-3.5 rounded-md transition-all duration-200 ${
                          isPlaying ? "bg-white/[0.04] border-l-2 border-[var(--rh-color)]" : "hover:bg-white/[0.03]"
                        }`}
                        style={isPlaying ? { borderLeftColor: "var(--rh-color)" } : {}}
                    >
                      <span className={`font-mono text-sm text-right transition-colors ${
                        isPlaying ? "text-[var(--rh-color)] font-bold" : "text-white/18"
                      }`}>
                        {album.tracks.indexOf(track) + 1}
                      </span>
                      <span className={`text-base leading-tight transition-colors ${
                        isPlaying ? "text-[var(--rh-color)] font-semibold" : "text-white/65"
                      }`}>
                        {track}
                      </span>
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => playTrack(aSlug, track)}
                          className="flex items-center justify-center flex-shrink-0 transition-all duration-200 border-none rounded-full"
                          style={{ width: 34, height: 34, borderWidth: 1.5, borderStyle: "solid",
                            background: isPlaying ? "var(--rh-color)" : "transparent",
                            borderColor: isPlaying ? "var(--rh-color)" : "rgba(255,255,255,0.1)",
                            color: isPlaying ? "#fff" : "rgba(255,255,255,0.38)"
                          }}
                          onMouseEnter={e => { if (!isPlaying) { e.currentTarget.style.borderColor = "var(--rh-color)"; e.currentTarget.style.color = "var(--rh-color)"; }}}
                          onMouseLeave={e => { if (!isPlaying) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}}
                          dangerouslySetInnerHTML={{ __html: isPlaying ? PAUSE_ICON : PLAY_ICON }}
                          aria-label={isPlaying ? "Pause" : "Play"}
                        />
                        <button
                          onClick={() => openVideo(aSlug, track)}
                          className="flex items-center justify-center flex-shrink-0 transition-all duration-200 border-none rounded-lg"
                          style={{ width: 30, height: 30, borderWidth: 1.5, borderStyle: "solid",
                            background: "rgba(255,255,255,0.03)",
                            borderColor: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.3)"
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--rh-color)"; e.currentTarget.style.color = "var(--rh-color)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                          dangerouslySetInnerHTML={{ __html: VIDEO_ICON }}
                          aria-label="Watch video"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-[100] bg-[#080808]/95 backdrop-blur-sm border-t border-white/[0.06] ${
        showProgress ? "block" : "hidden"
      }`}>
        <div className="max-w-[960px] mx-auto flex items-center gap-2.5 px-4 py-2">
          <button onClick={playPrev} className="flex items-center justify-center flex-shrink-0 bg-transparent border-none cursor-pointer text-white/35 hover:text-white transition-colors"
                  style={{ width: 28, height: 28 }}
                  dangerouslySetInnerHTML={{ __html: SKIP_PREV }} aria-label="Previous" />
          <span className="italic text-sm truncate text-[var(--rh-color)] flex-shrink-1 max-w-[110px] overflow-hidden text-ellipsis">
            {curTrack || "—"}
          </span>
          <div className="flex-1 h-1 bg-white/[0.06] rounded-sm cursor-pointer overflow-hidden relative"
               onClick={(e) => {
                 const a = document.getElementById("audioEl") as HTMLAudioElement | null;
                 if (a?.duration && isFinite(a.duration)) {
                   const rect = e.currentTarget.getBoundingClientRect();
                   a.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * a.duration;
                 }
               }}>
            <div className="h-full rounded-sm transition-[width] duration-150" style={{ width: `${progress}%`, background: "var(--rh-color)" }} />
          </div>
          <span className="font-mono text-xs text-white/28 min-w-16 text-right flex-shrink-0">{currentTime}</span>
          <button onClick={playNext} className="flex items-center justify-center flex-shrink-0 bg-transparent border-none cursor-pointer text-white/35 hover:text-white transition-colors"
                  style={{ width: 28, height: 28 }}
                  dangerouslySetInnerHTML={{ __html: SKIP_NEXT }} aria-label="Next" />
        </div>
      </div>

      {/* Video modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[200] bg-[#060606]/96 flex items-center justify-center p-5" style={{ display: "flex" }}>
          <div className="relative w-full max-w-[1100px] max-h-[80vh] flex flex-col items-center">
            <video ref={videoRef} src={videoUrl} controls autoPlay playsInline className="w-full max-h-[72vh] rounded-lg bg-black" />
            <p className="italic mt-3 text-white/50 text-center">{videoTitle}</p>
            <button onClick={closeVideo}
                    className="absolute -top-12 right-0 flex items-center justify-center cursor-pointer rounded-full border border-white/[0.15] bg-white/[0.06] hover:bg-white/[0.15] transition-all"
                    style={{ width: 40, height: 40, color: "#fff" }}
                    aria-label="Close video"
                    dangerouslySetInnerHTML={{ __html: CLOSE_ICON }}
            />
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio id="audioEl" preload="metadata" style={{ display: "none" }} />
    </div>
  );
}

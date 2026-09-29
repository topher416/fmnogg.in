"use client";
import Link from "next/link";
import { BAND } from "@/lib/site";

// Module-level audio survives header remounts during client-side navigation,
// so the snippet keeps playing even as the page changes.
let audio: HTMLAudioElement | null = null;
function getAudio() {
  if (!audio) {
    audio = new Audio("/audio/snippets/thousand-feet-per-second.m4a");
    audio.preload = "auto";
  }
  return audio;
}

/**
 * Band wordmark in the header. Looks and behaves like the normal home link,
 * but clicking it also plays the hidden "a thousand feet per second" lyric
 * snippet from The Tourist (Montrose Saloon, Sep 25 2026). Easter egg.
 */
export default function EasterEggName() {
  return (
    <Link
      href="/"
      className="text-white/55 hover:text-white transition-colors whitespace-nowrap"
      onClick={() => {
        const a = getAudio();
        a.currentTime = 0;
        a.play().catch(() => {});
      }}
    >
      {BAND.name}
    </Link>
  );
}

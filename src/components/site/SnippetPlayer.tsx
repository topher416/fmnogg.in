"use client";
import { useEffect, useRef } from "react";

/**
 * Autoplays the "a thousand feet per second" lyric snippet from The Tourist
 * (Montrose Saloon, Sep 25 2026) on site load. Browsers block autoplay with
 * sound until the user interacts, so if the initial attempt is rejected we
 * retry on the first click/tap.
 */
export default function SnippetPlayer() {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onFirstInteract = () => {
      el.play().catch(() => {});
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
    };

    el.play().catch(() => {
      window.addEventListener("click", onFirstInteract);
      window.addEventListener("touchstart", onFirstInteract);
    });

    return () => {
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
    };
  }, []);

  return (
    <audio
      ref={ref}
      src="/audio/snippets/thousand-feet-per-second.m4a"
      preload="auto"
      aria-hidden="true"
      className="hidden"
    />
  );
}

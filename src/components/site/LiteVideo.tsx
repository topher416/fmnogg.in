"use client";

import { useState } from "react";

/**
 * Lite YouTube embed: thumbnail + a plain play button up front —
 * no title, channel, or YouTube chrome. The real player (autoplaying)
 * loads only on click.
 */
export default function LiteVideo({ id }: { id: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label="Play video"
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/45 backdrop-blur-sm transition-colors group-hover:bg-black/65">
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="ml-1 h-6 w-6 fill-white/90"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

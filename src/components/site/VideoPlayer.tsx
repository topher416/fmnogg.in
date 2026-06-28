"use client";

interface VideoPlayerProps {
  src: string;
  title: string;
  /** Album accent for the focus ring / glow. */
  color: string;
}

export default function VideoPlayer({ src, title, color }: VideoPlayerProps) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      aria-label={`${title} — One Thousand Feet Per Second`}
      className="w-full rounded-lg bg-black aspect-video"
      style={{ boxShadow: `0 0 80px -20px ${color}66` }}
    />
  );
}

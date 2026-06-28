import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALBUMS, getTrack, coveredTracks, r2Video } from "@/lib/discography";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import VideoPlayer from "@/components/site/VideoPlayer";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALBUMS.flatMap((album) =>
    coveredTracks(album).map((track) => ({ album: album.slug, track: track.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ album: string; track: string }>;
}): Promise<Metadata> {
  const { album: albumSlug, track: trackSlug } = await params;
  const found = getTrack(albumSlug, trackSlug);
  if (!found) return {};
  const { album, track } = found;
  const title = `${track.title} — ${BAND.name}`;
  const description = `${BAND.name} cover "${track.title}" by Radiohead (${album.name}, ${album.year}).`;
  return {
    title,
    description,
    alternates: { canonical: `/${album.slug}/${track.slug}` },
    openGraph: { title, description, type: "video.other" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ album: string; track: string }>;
}) {
  const { album: albumSlug, track: trackSlug } = await params;
  const found = getTrack(albumSlug, trackSlug);
  if (!found) notFound();
  const { album, track } = found;

  // Prev / next within the album's covered tracks (album order).
  const covered = coveredTracks(album);
  const idx = covered.findIndex((tr) => tr.slug === track.slug);
  const prev = idx > 0 ? covered[idx - 1] : null;
  const next = idx < covered.length - 1 ? covered[idx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: album.bg, color: "#c8c0b8" }}>
      <SiteHeader
        crumbs={[
          { label: album.name, href: `/${album.slug}`, color: album.color },
          { label: track.title },
        ]}
      />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-5 py-8">
        <p
          className="font-mono text-[0.62rem] uppercase tracking-[0.16em] mb-3"
          style={{ color: album.color }}
        >
          {album.name} · {album.year}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] font-bold leading-tight tracking-tight text-[#f0ece6] mb-6"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}>
          {track.title}
        </h1>

        <VideoPlayer src={r2Video(track)} title={track.title} color={album.color} />

        {/* Prev / next */}
        <nav className="mt-6 flex items-center justify-between gap-3 font-mono text-[0.64rem] uppercase tracking-[0.12em]">
          {prev ? (
            <Link
              href={`/${album.slug}/${prev.slug}`}
              className="group flex flex-col gap-0.5 text-white/40 hover:text-white transition-colors max-w-[45%]"
            >
              <span className="text-white/25">← Prev</span>
              <span className="truncate normal-case tracking-normal text-sm">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${album.slug}/${next.slug}`}
              className="group flex flex-col gap-0.5 items-end text-right text-white/40 hover:text-white transition-colors max-w-[45%]"
            >
              <span className="text-white/25">Next →</span>
              <span className="truncate normal-case tracking-normal text-sm">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-10">
          <Link
            href={`/${album.slug}`}
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35 hover:text-white/70 transition-colors"
          >
            ← All of {album.name}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

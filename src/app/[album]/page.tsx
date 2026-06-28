import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALBUMS, getAlbum, coveredTracks } from "@/lib/discography";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AmbientViz from "@/components/site/AmbientViz";
import AlbumTrackList from "@/components/site/AlbumTrackList";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ album: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ album: string }>;
}): Promise<Metadata> {
  const { album: albumSlug } = await params;
  const album = getAlbum(albumSlug);
  if (!album) return {};
  const covered = coveredTracks(album).length;
  const title = `${album.name} (${album.year}) — ${BAND.name}`;
  const description = `${covered} of ${album.tracks.length} tracks from ${album.name} covered by ${BAND.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/${album.slug}` },
    openGraph: { title, description, type: "music.album" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const { album: albumSlug } = await params;
  const album = getAlbum(albumSlug);
  if (!album) notFound();

  const covered = coveredTracks(album).length;
  const total = album.tracks.length;

  return (
    <div className="min-h-screen" style={{ background: album.bg, color: "#c8c0b8" }}>
      <SiteHeader crumbs={[{ label: album.name, color: album.color }]} />

      {/* Album header with ambient backdrop */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <AmbientViz mode={album.mode} rgb={album.rgb} className="absolute inset-0 opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${album.bg}66 0%, ${album.bg}40 40%, ${album.bg}f0 100%)`,
          }}
        />
        <div className="relative max-w-[1000px] mx-auto px-5 pt-14 pb-10">
          <h1
            className="font-[family-name:var(--font-playfair)] font-bold leading-[0.95] tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
              color: album.color,
              textShadow: `0 0 70px rgba(${album.rgb},0.18)`,
            }}
          >
            {album.name}
          </h1>
          <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/45">
            {album.year} · {covered} of {total} covered
          </p>
        </div>
      </section>

      {/* Tracklist */}
      <main className="max-w-[1000px] mx-auto px-5 py-8">
        <AlbumTrackList album={album} />
      </main>

      <div className="max-w-[1000px] mx-auto px-5">
        <Link
          href="/"
          className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35 hover:text-white/70 transition-colors"
        >
          ← All albums
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}

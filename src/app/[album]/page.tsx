import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALBUMS, getAlbum, coveredTracks } from "@/lib/discography";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
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
  const pct = Math.round((covered / total) * 100);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: album.bg, color: "#c8c0b8" }}
    >
      <SiteHeader crumbs={[{ label: album.name, color: album.color }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <Link
          href="/"
          className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35 hover:text-white/70 transition-colors"
        >
          ← All albums
        </Link>
        <h1
          className="mt-4 text-[1.6rem] font-bold leading-tight tracking-tight"
          style={{ color: album.color }}
        >
          {album.name}
        </h1>
        <p className="mt-1 font-mono text-[0.68rem] text-white/40">
          {album.year} · {covered} of {total} covered ({pct}%)
        </p>

        <div className="mt-8">
          <AlbumTrackList album={album} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

import { ALBUMS, getTrack, coveredTracks } from "@/lib/discography";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const dynamicParams = false;
export const alt = "One Thousand Feet Per Second";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ALBUMS.flatMap((album) =>
    coveredTracks(album).map((track) => ({ album: album.slug, track: track.slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ album: string; track: string }>;
}) {
  const { album: albumSlug, track: trackSlug } = await params;
  const found = getTrack(albumSlug, trackSlug);
  if (!found) return ogCard({ title: "One Thousand Feet Per Second", subtitle: "", color: "#00ff9f", rgb: "0,255,159" });
  const { album, track } = found;
  return ogCard({
    title: track.title,
    subtitle: `${album.name} · ${album.year}`,
    color: album.color,
    rgb: album.rgb,
  });
}

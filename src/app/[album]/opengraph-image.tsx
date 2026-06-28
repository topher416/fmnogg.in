import { ALBUMS, getAlbum, coveredTracks } from "@/lib/discography";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const dynamicParams = false;
export const alt = "One Thousand Feet Per Second";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ album: a.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ album: string }>;
}) {
  const { album: albumSlug } = await params;
  const album = getAlbum(albumSlug);
  if (!album) return ogCard({ title: "One Thousand Feet Per Second", subtitle: "", color: "#00ff9f", rgb: "0,255,159" });
  const covered = coveredTracks(album).length;
  return ogCard({
    title: album.name,
    subtitle: `${album.year} · ${covered} of ${album.tracks.length} covered`,
    color: album.color,
    rgb: album.rgb,
  });
}

import type { MetadataRoute } from "next";
import { ALBUMS, coveredTracks } from "@/lib/discography";
import { BAND } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BAND.domain;
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/onethousandfeetpersecond`, priority: 0.5 },
  ];
  for (const album of ALBUMS) {
    routes.push({ url: `${base}/${album.slug}`, priority: 0.8 });
    for (const track of coveredTracks(album)) {
      routes.push({ url: `${base}/${album.slug}/${track.slug}`, priority: 0.7 });
    }
  }
  return routes;
}

import Link from "next/link";
import { ALBUMS, coveredTracks } from "@/lib/discography";

/** Landing browser: a card per album, covered-count badge conveys the mission. */
export default function AlbumBrowser() {
  return (
    <section className="max-w-[1000px] mx-auto px-5 py-12">
      <h2 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/35 mb-6">
        The Discography
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ALBUMS.map((album) => {
          const covered = coveredTracks(album).length;
          const total = album.tracks.length;
          const pct = Math.round((covered / total) * 100);
          return (
            <Link
              key={album.slug}
              href={`/${album.slug}`}
              className="group relative flex flex-col justify-between rounded-lg border border-white/[0.07] bg-white/[0.015] p-4 transition-all duration-300 hover:bg-white/[0.04] overflow-hidden"
              style={{ minHeight: 124 }}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: album.color }}
                aria-hidden
              />
              <div>
                <h3
                  className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-tight transition-colors"
                  style={{ color: album.color }}
                >
                  {album.name}
                </h3>
                <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/35">
                  {album.year}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/45 mb-1.5">
                  <span>
                    {covered} / {total} covered
                  </span>
                  <span className="text-white/25">{pct}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-white/[0.07] overflow-hidden">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${pct}%`, background: album.color }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

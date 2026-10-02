import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import { SHOWS } from "@/lib/shows";
import { AUDIO_CDN } from "@/lib/discography";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PressPlayer, { type PressTrack } from "@/components/site/PressPlayer";

export const metadata: Metadata = {
  title: `Press kit — ${BAND.name}`,
  description: `Press kit for ${BAND.name}: bio, photos, live recordings, shows, and contact.`,
  alternates: { canonical: "/press" },
};

const PHOTOS = [
  { name: "Hannah Enenbach", src: "/images/members/hannah-enenbach-portrait.png" },
  { name: "Eric Gorscak", src: "/images/members/eric-gorscak-portrait.png" },
  { name: "Drew Kelly", src: "/images/members/drew-kelly-portrait.png" },
  { name: "Peter Manis", src: "/images/members/peter-manis-portrait.png" },
  { name: "Jeff Mauricio", src: "/images/members/jeff-mauricio-portrait.png" },
  { name: "Topher Rasmussen", src: "/images/members/topher-rasmussen-portrait.png" },
  { name: "Andrew Schneider", src: "/images/members/andrew-schneider-portrait.png" },
  { name: "Jim", src: "/images/members/jim-portrait.png" },
];

const FEATURED: PressTrack[] = [
  {
    title: "The Tourist",
    note: "Live at Montrose Saloon · Sep 25, 2026",
    src: `${AUDIO_CDN}/live/montrose-saloon-2026-09-25/05-the-tourist.m4a`,
  },
  {
    title: "Paranoid Android",
    note: "Live at Montrose Saloon · Jul 17, 2026",
    src: `${AUDIO_CDN}/live/montrose-saloon-2026-07-17/09-paranoid-android.m4a`,
  },
  {
    title: "Identikit",
    note: "Live at Montrose Saloon · Sep 25, 2026",
    src: `${AUDIO_CDN}/live/montrose-saloon-2026-09-25/06-identikit.m4a`,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[1.2rem] font-semibold text-white/90">{children}</h2>
  );
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "press" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <SectionLabel>Press kit</SectionLabel>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          a thousand feet per second
        </h1>
        <p className="mt-3 max-w-[60ch] text-[1.05rem] leading-relaxed text-white/80">
          It&rsquo;s just eight good musicians doing good Radiohead covers.
        </p>

        <section aria-label="Bio" className="mt-10 border-t border-white/[0.06] pt-8">
          <SectionLabel>Bio</SectionLabel>
          <SectionTitle>The short version</SectionTitle>
          <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-white/65">
            a thousand feet per second is an eight-piece Radiohead cover band
            from Chicago, formed in 2026 out of the Old Town School of Folk
            Music&rsquo;s Radiohead ensemble. The band plays the catalog
            straight — no costumes, no impersonation — and documents every
            show as a free live recording on its website. The name comes from
            the closing lyric of &ldquo;The Tourist&rdquo;:{" "}
            <em>
              they ask me where the hell I&rsquo;m going / at a thousand feet
              per second.
            </em>
          </p>
          <p className="mt-4">
            <a
              href="/wiki"
              className="font-mono text-[0.68rem] text-white/40 underline underline-offset-4 decoration-white/20 hover:text-white/70 transition-colors"
            >
              The full story
            </a>
          </p>
        </section>

        <section aria-label="Listen" className="mt-10 border-t border-white/[0.06] pt-8">
          <SectionLabel>Listen</SectionLabel>
          <SectionTitle>Live at Montrose Saloon</SectionTitle>
          <PressPlayer tracks={FEATURED} />
          <p className="mt-3 font-mono text-[0.65rem] text-white/30">
            Full sets on the <a href="/" className="underline underline-offset-2 decoration-white/20 hover:text-white/60">homepage</a>.
          </p>
        </section>

        <section aria-label="Photos" className="mt-10 border-t border-white/[0.06] pt-8">
          <SectionLabel>Photos</SectionLabel>
          <SectionTitle>The band</SectionTitle>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PHOTOS.map((p) => (
              <li key={p.src}>
                <a
                  href={p.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-square w-full border border-white/10 object-cover transition-opacity group-hover:opacity-85"
                  />
                  <span className="mt-1.5 block truncate font-mono text-[0.62rem] text-white/40">
                    {p.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[0.65rem] text-white/30">
            Click for full size. Free to use with credit.
          </p>
        </section>

        <section aria-label="Shows" className="mt-10 border-t border-white/[0.06] pt-8">
          <SectionLabel>Shows</SectionLabel>
          <SectionTitle>Past &amp; upcoming</SectionTitle>
          <ol className="mt-4 space-y-2.5">
            {SHOWS.map((s) => (
              <li key={s.dateShort} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-[0.72rem] tabular-nums text-white/40">
                  {s.dateShort}
                </span>
                <span className="text-[0.9rem] text-white/75">
                  {s.venue}, {s.city}
                </span>
                {s.status === "upcoming" && (
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#00ff9f]/80">
                    Upcoming
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3">
            <a
              href="/shows"
              className="font-mono text-[0.68rem] text-white/40 underline underline-offset-4 decoration-white/20 hover:text-white/70 transition-colors"
            >
              Full archive with setlists
            </a>
          </p>
        </section>

        <section aria-label="Contact" className="mt-10 border-t border-white/[0.06] pt-8">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Booking &amp; press</SectionTitle>
          <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-white/65">
            Start at the front door —{" "}
            <a
              href={BAND.domain}
              className="underline underline-offset-2 decoration-white/25 hover:text-white/90 transition-colors"
            >
              athousandfeetpersecond.com
            </a>{" "}
            — or find any member on the{" "}
            <a
              href="/members"
              className="underline underline-offset-2 decoration-white/25 hover:text-white/90 transition-colors"
            >
              members
            </a>{" "}
            page.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

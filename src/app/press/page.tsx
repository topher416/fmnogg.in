import type { Metadata } from "next";
import { Suspense } from "react";
import { BAND } from "@/lib/site";
import { SHOWS } from "@/lib/shows";
import { AUDIO_CDN } from "@/lib/discography";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PressPlayer, { type PressTrack } from "@/components/site/PressPlayer";
import BookerFacts from "@/components/site/BookerFacts";

export const metadata: Metadata = {
  title: `Press kit — ${BAND.name}`,
  description: `Press kit for ${BAND.name}: bio, photos, live recordings, shows, and contact.`,
  alternates: { canonical: "/press" },
};

export const revalidate = 3600;

const BOOKING_EMAIL = "booking@athousandfeetpersecond.com";

const PHOTOS = [
  { name: "Hannah Enenbach", src: "/images/members/hannah-enenbach-portrait.png" },
  { name: "Eric Gorscak", src: "/images/members/eric-gorscak-portrait.png" },
  { name: "Drew Kelly", src: "/images/members/drew-kelly-portrait.png" },
  { name: "Peter Manis", src: "/images/members/peter-manis-portrait.png" },
  { name: "Jeff Mauricio", src: "/images/members/jeff-mauricio-portrait.png" },
  { name: "Topher Rasmussen", src: "/images/members/topher-rasmussen-portrait.png" },
  { name: "Andrew Schneider", src: "/images/members/andrew-schneider-portrait.png" },
  { name: "Jim Svajgl", src: "/images/members/jim-portrait.png" },
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

const STANCE = [
  "Radiohead has a deep catalog of songs worthy of exploration beyond the chart toppers.",
  "Playing the thorniest Radiohead songs pushes good musicians to be even better musicians.",
  "Polish is less important than passion and vigor.",
  "Radiohead's recorded tracks should not be treated as holy texts.",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-white/55">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[1.25rem] font-semibold text-white/95">{children}</h2>
  );
}

export default function PressPage() {
  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "press" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <SectionLabel>Press kit</SectionLabel>
        <h1 className="mt-2 lowercase text-[2rem] font-bold leading-tight tracking-tight text-white/95">
          a thousand feet per second
        </h1>
        <p className="mt-3 max-w-[60ch] lowercase text-[1.1rem] leading-relaxed text-white/75">
          eight musicians exploring the catalog of a beloved and transgressive
          band. chicago, illinois.
        </p>
        <p className="mt-5 text-[1rem] text-white/85">
          Booking &amp; press:{" "}
          <a
            href={`mailto:${BOOKING_EMAIL}`}
            className="underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/70 transition-colors"
          >
            {BOOKING_EMAIL}
          </a>
        </p>

        <section
          aria-label="For bookers"
          className="mt-10 border border-white/10 bg-white/[0.02] p-6"
        >
          <SectionLabel>For bookers</SectionLabel>
          <Suspense
            fallback={
              <p className="mt-6 font-mono text-[0.75rem] text-white/60">
                Loading…
              </p>
            }
          >
            <BookerFacts />
          </Suspense>
        </section>

        <section aria-label="Listen" className="mt-12 border-t border-white/[0.06] pt-8">
          <SectionLabel>Listen</SectionLabel>
          <SectionTitle>Live at Montrose Saloon</SectionTitle>
          <PressPlayer tracks={FEATURED} />
          <p className="mt-3 font-mono text-[0.75rem] text-white/55">
            Full sets on the{" "}
            <a href="/" className="underline underline-offset-2 decoration-white/30 hover:text-white/85">
              homepage
            </a>
            .
          </p>
        </section>

        <section aria-label="The stance" className="mt-12 border-t border-white/[0.06] pt-8">
          <SectionLabel>The stance</SectionLabel>
          <SectionTitle>Radiohead heretics</SectionTitle>
          <p className="mt-3 max-w-[62ch] text-[1rem] leading-relaxed text-white/75">
            We are radiohead heretics who freely tweak and alter our renderings
            of their songs to fit our vision — not to imitate or mimic the work
            they did, but to tap into the current of their sounds and choices,
            and to examine what happens when works from 1993–2016 are revived
            and reinterpreted in the current turbulent era.
          </p>
          <ul className="mt-5 space-y-2.5">
            {STANCE.map((s) => (
              <li
                key={s}
                className="max-w-[62ch] border-l-2 border-white/15 pl-4 text-[0.98rem] leading-relaxed text-white/75"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Bio" className="mt-12 border-t border-white/[0.06] pt-8">
          <SectionLabel>Bio</SectionLabel>
          <p className="mt-3 max-w-[62ch] text-[1rem] leading-relaxed text-white/75">
            a thousand feet per second is an eight-piece band from Chicago,
            formed in 2026 out of the Old Town School of Folk Music&rsquo;s
            Radiohead ensemble. The band set out to explore Radiohead&rsquo;s
            catalog — the deep cuts beyond the chart toppers, taken on with
            extra harmonies and its own arrangements — and documents every
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
              className="font-mono text-[0.75rem] text-white/60 underline underline-offset-4 decoration-white/25 hover:text-white/90 transition-colors"
            >
              The full story
            </a>
          </p>
        </section>

        <section aria-label="Photos" className="mt-12 border-t border-white/[0.06] pt-8">
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
                  <span className="mt-1.5 block truncate font-mono text-[0.72rem] text-white/60">
                    {p.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[0.75rem] text-white/55">
            Click for full size. Free to use with credit.
          </p>
        </section>

        <section aria-label="Shows" className="mt-12 border-t border-white/[0.06] pt-8">
          <SectionLabel>Shows</SectionLabel>
          <ol className="mt-4 space-y-2.5">
            {SHOWS.map((s) => (
              <li key={s.dateShort} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-[0.8rem] tabular-nums text-white/60">
                  {s.dateShort}
                </span>
                <span className="text-[0.95rem] text-white/85">
                  {s.venue}, {s.city}
                </span>
                {s.status === "upcoming" && (
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#00ff9f]/90">
                    Upcoming
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3">
            <a
              href="/shows"
              className="font-mono text-[0.75rem] text-white/60 underline underline-offset-4 decoration-white/25 hover:text-white/90 transition-colors"
            >
              Full archive with setlists
            </a>
          </p>
        </section>

        <section aria-label="Contact" className="mt-12 border-t border-white/[0.06] pt-8 pb-4">
          <SectionLabel>Contact</SectionLabel>
          <p className="mt-3 max-w-[62ch] text-[1rem] leading-relaxed text-white/75">
            We would like to perform for you. Booking and press go through one
            front door:{" "}
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="underline underline-offset-2 decoration-white/30 hover:text-white transition-colors"
            >
              {BOOKING_EMAIL}
            </a>
            . The band is on{" "}
            <a
              href="https://www.instagram.com/athousandfeetpersecond"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 decoration-white/30 hover:text-white transition-colors"
            >
              Instagram
            </a>
            ,{" "}
            <a
              href="https://www.youtube.com/@athousandfeetpersecond"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 decoration-white/30 hover:text-white transition-colors"
            >
              YouTube
            </a>
            , and{" "}
            <a
              href="https://www.tiktok.com/@athousandfeetpersecond"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 decoration-white/30 hover:text-white transition-colors"
            >
              TikTok
            </a>
            ; the members are on the{" "}
            <a
              href="/members"
              className="underline underline-offset-2 decoration-white/30 hover:text-white transition-colors"
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

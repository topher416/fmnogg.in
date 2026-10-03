import type { Metadata } from "next";
import { BAND, SHOW } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Kaleidoscope from "@/components/site/Kaleidoscope";
import AlertForm from "@/components/site/AlertForm";

/**
 * Standalone text-able invite for the Oct 9 Montrose show.
 * Deliberately unlinked from the homepage — shared by text/DM only.
 */
export const metadata: Metadata = {
  title: `Oct 9 at Montrose Saloon — ${BAND.name}`,
  description:
    "Friday, October 9, 2026. Montrose Saloon, Chicago. 8:00 PM, $15 at the door, 21+. A thousand feet per second with Test Pattern and Three Men*.",
  openGraph: {
    title: "a thousand feet per second — Fri Oct 9, Montrose Saloon",
    description: "8:00 PM · 2933 W Montrose Ave, Chicago · $15 · 21+",
    images: [
      {
        url: "https://www.athousandfeetpersecond.com/og/invite-card.jpg",
        width: 1200,
        height: 630,
        alt: "a thousand feet per second — Friday, October 9, 2026 at Montrose Saloon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "a thousand feet per second — Fri Oct 9, Montrose Saloon",
    description: "8:00 PM · 2933 W Montrose Ave, Chicago · $15 · 21+",
    images: ["https://www.athousandfeetpersecond.com/og/invite-card.jpg"],
  },
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=2933+W+Montrose+Ave+Chicago+IL";

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "invite" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
        {/* Kaleidoscope opener */}
        <div className="pt-8 pb-2">
          <div className="md:hidden">
            <Kaleidoscope seed={0} strip compact />
          </div>
          <div className="hidden md:block">
            <Kaleidoscope seed={0} strip />
          </div>
        </div>

        {/* The facts, nothing else */}
        <section aria-label="Show details" className="py-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            You&apos;re invited
          </p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight tracking-tight text-white/90">
            a thousand feet per second
          </h1>
          <p className="mt-1 text-[1.05rem] text-white/60">
            Radiohead covers, eight players
          </p>

          <dl className="mt-8 space-y-3 text-[0.95rem]">
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/30 pt-1">
                When
              </dt>
              <dd className="text-white/85">{SHOW.date} — 8:00 PM</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/30 pt-1">
                Where
              </dt>
              <dd className="text-white/85">
                {SHOW.venue}
                <br />
                <span className="text-white/50">
                  {SHOW.address}, {SHOW.city}
                </span>
                <br />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block border border-white/25 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
                >
                  Get directions
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/30 pt-1">
                Door
              </dt>
              <dd className="text-white/85">$15 · 21+ with ID</dd>
            </div>
          </dl>

          <ol className="mt-8 space-y-1.5 border-t border-white/[0.06] pt-6">
            {SHOW.lineup.map((slot) => (
              <li
                key={slot.time}
                className="flex items-baseline gap-3 font-mono text-[0.78rem]"
              >
                <span className="tabular-nums text-white/30">{slot.time}</span>
                <span
                  className={
                    slot.act === BAND.name ? "text-white/85" : "text-white/45"
                  }
                >
                  {slot.act}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Kaleidoscope divider */}
        <div className="border-t border-white/[0.06] py-8">
          <div className="md:hidden">
            <Kaleidoscope seed={1} strip compact />
          </div>
          <div className="hidden md:block">
            <Kaleidoscope seed={1} strip />
          </div>
        </div>

        {/* Mailing list */}
        <section aria-label="Mailing list" className="py-10 border-t border-white/[0.06]">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Mailing list
          </p>
          <h2 className="mt-2 text-[1.4rem] font-bold leading-tight tracking-tight text-white/90">
            Show alerts
          </h2>
          <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
            One email when a show is announced. Nothing else.
          </p>
          <AlertForm />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

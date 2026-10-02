import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import { SHOWS, showSetlist } from "@/lib/shows";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: `Shows — ${BAND.name}`,
  description: `Every show played by ${BAND.name}: dates, bills, setlists, and live recordings.`,
  alternates: { canonical: "/shows" },
};

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "shows" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Archive
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          Shows
        </h1>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
          Every date, bill, and setlist — with the live recordings where they
          exist.
        </p>

        <ol className="mt-10">
          {SHOWS.map((show) => {
            const setlist = showSetlist(show);
            return (
              <li
                key={show.dateShort}
                className="border-t border-white/[0.06] py-8 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-[1.2rem] font-semibold text-white/90">
                    {show.date}
                  </h2>
                  {show.status === "upcoming" && (
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#00ff9f]/80">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[0.95rem] text-white/60">
                  {show.venue}
                  {show.address ? ` — ${show.address}` : ""} · {show.city}
                </p>

                <ol className="mt-4 space-y-1.5">
                  {show.bill.map((slot, i) => (
                    <li
                      key={`${slot.act}-${i}`}
                      className="flex items-baseline gap-3 font-mono text-[0.72rem]"
                    >
                      {slot.time ? (
                        <span className="tabular-nums text-white/30">
                          {slot.time}
                        </span>
                      ) : null}
                      <span className="text-white/55">{slot.act}</span>
                    </li>
                  ))}
                </ol>

                {show.admission ? (
                  <p className="mt-3 font-mono text-[0.72rem] text-white/45">
                    {show.admission}
                  </p>
                ) : null}

                {show.note ? (
                  <p className="mt-3 max-w-[62ch] text-[0.88rem] leading-relaxed text-white/50">
                    {show.note}
                  </p>
                ) : null}

                {setlist.length > 0 ? (
                  <div className="mt-5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                      Setlist
                    </p>
                    <ol className="mt-2 grid gap-x-8 sm:grid-cols-2">
                      {setlist.map((s, i) => (
                        <li
                          key={s.href}
                          className="flex items-baseline gap-3 border-b border-white/[0.04] py-1.5"
                        >
                          <span className="font-mono text-[0.7rem] tabular-nums text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={s.href}
                            className="text-[0.9rem] text-white/75 hover:text-white transition-colors"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                {show.youtubeUrl ? (
                  <p className="mt-4">
                    <a
                      href={show.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.68rem] text-white/40 underline underline-offset-4 decoration-white/20 hover:text-white/70 transition-colors"
                    >
                      Watch the video
                    </a>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        <p className="mt-4 font-mono text-[0.65rem] text-white/30">
          Earlier 2026 sets to be archived.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

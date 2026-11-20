import Link from "next/link";
import { SHOW, BAND } from "@/lib/site";

/** Next show: date, venue, lineup. Mascot on the right. */
export default function NextShow() {
  return (
    <section aria-label="Next show" className="border-b border-white/[0.06] py-10">
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0">
          <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Next show
          </p>
          <h2 className="text-[1.9rem] font-semibold leading-tight text-white/90 sm:text-[2.4rem]">
            {SHOW.date}
          </h2>
          <p className="mt-2 text-[1.05rem] text-white/75">
            {SHOW.venue} — {SHOW.city}
          </p>
          <p className="mt-1 text-[0.95rem] text-white/55">{SHOW.detail}</p>
          <ol className="mt-5 space-y-1.5">
            {SHOW.lineup.map((slot) => (
              <li
                key={slot.act}
                className="flex items-baseline gap-3 font-mono text-[0.72rem]"
              >
                <span className="tabular-nums text-white/30">{slot.time}</span>
                <span
                  className={
                    slot.act === BAND.name ? "text-white/80" : "text-white/45"
                  }
                >
                  {slot.act}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-[0.72rem] text-white/40">
            {SHOW.admission}
          </p>
          <p className="mt-5 flex gap-5">
            <Link
              href="/shows"
              className="font-mono text-[0.68rem] text-white/60 underline underline-offset-4 decoration-white/25 hover:text-white/85 transition-colors"
            >
              All shows
            </Link>
            <Link
              href="/alerts"
              className="font-mono text-[0.68rem] text-white/40 underline underline-offset-4 decoration-white/20 hover:text-white/70 transition-colors"
            >
              Get show alerts
            </Link>
          </p>
        </div>
        <img
          src="/mascot.png"
          alt=""
          aria-hidden
          draggable={false}
          className="w-32 shrink-0 select-none sm:w-44"
        />
      </div>
    </section>
  );
}

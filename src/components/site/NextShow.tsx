import { SHOW, BAND } from "@/lib/site";

/** Next show: date, venue, lineup. Nothing else. */
export default function NextShow() {
  return (
    <section aria-label="Next show" className="border-b border-white/[0.06] py-10">
      <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Next show
      </p>
      <h2 className="text-[1.35rem] font-semibold leading-snug text-white/90">
        {SHOW.date}
      </h2>
      <p className="mt-1 text-[0.95rem] text-white/60">
        {SHOW.venue} — {SHOW.city}
      </p>
      <ol className="mt-4 space-y-1.5">
        {SHOW.lineup.map((slot) => (
          <li
            key={slot.time}
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
    </section>
  );
}

import { SHOW } from "@/lib/site";

/** Next show: logo, date, album, neighborhood. Nothing else. */
export default function NextShow() {
  return (
    <section aria-label="Next show" className="border-b border-white/[0.06] py-10">
      <p className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Next show
      </p>
      <img
        src="/images/reggies-logo.png"
        alt="Reggies"
        className="w-64 rounded-[4px] bg-[#e8e2d9] px-3 py-2 sm:w-80"
      />
      <h2 className="mt-6 text-[2.2rem] font-semibold leading-none text-white/90 sm:text-[2.8rem]">
        {SHOW.shortDate}
      </h2>
      <p className="mt-3 text-[1.05rem] text-white/75">{SHOW.detail}</p>
      <p className="mt-1 text-[0.95rem] text-white/45">
        reggies, {SHOW.area}
      </p>
    </section>
  );
}

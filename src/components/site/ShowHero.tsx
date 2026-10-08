import { BAND } from "@/lib/site";
import Kaleidoscope from "./Kaleidoscope";
import AlertForm from "./AlertForm";

/**
 * Show-night hero for QR/business-card traffic: kaleidoscope up front,
 * show-alert signup as the main call to action.
 */
export default function ShowHero() {
  return (
    <section aria-label={BAND.name} className="border-b border-white/[0.06]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-45" aria-hidden>
          <Kaleidoscope seed={7} />
        </div>
        <div className="relative px-1 py-12 sm:py-16">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/50">
            Chicago · Eight-piece · Radiohead
          </p>
          <h1 className="mt-3 max-w-[12ch] text-[2.2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[3.2rem]">
            {BAND.name}
          </h1>

          <div className="mt-9 max-w-[520px]">
            <h2 className="text-[1.1rem] font-semibold text-white/90">
              Show alerts
            </h2>
            <p className="mt-1 text-[0.9rem] text-white/55">
              One email when a show is announced.
            </p>
            <AlertForm />
          </div>
        </div>
      </div>
    </section>
  );
}

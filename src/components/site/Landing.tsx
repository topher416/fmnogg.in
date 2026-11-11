import { Suspense } from "react";
import { BAND } from "@/lib/site";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import LiveRelease from "./LiveRelease";
import AlbumBrowser from "./AlbumBrowser";
import Kaleidoscope from "./Kaleidoscope";
import ShowAlerts from "./ShowAlerts";
import LiteVideo from "./LiteVideo";
import MinotaurCharm from "./MinotaurCharm";
import VenueLeaderboard from "./VenueLeaderboard";

function KaleidoStrip({ seed }: { seed: number }) {
  return (
    <div className="border-b border-white/[0.06] py-6">
      <div className="md:hidden">
        <Kaleidoscope seed={seed} strip compact />
      </div>
      <div className="hidden md:block">
        <Kaleidoscope seed={seed} strip />
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
        <div className="relative mt-10 overflow-hidden border border-white/10">
          <img
            src="/images/live/montrose-live-full.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
          <div className="relative flex items-center justify-between gap-6 px-5 py-14 sm:px-8 sm:py-20">
            <div>
              <h1 className="lowercase text-[1.9rem] font-bold leading-tight tracking-tight text-white/95 sm:text-[2.5rem]">
                {BAND.name}
              </h1>
              <p className="mt-3 max-w-[42ch] lowercase leading-snug text-white/85 text-[1.02rem] sm:text-[1.15rem]">
                eight musicians exploring the catalog of a beloved and
                transgressive band. chicago, illinois.
              </p>
            </div>
            <MinotaurCharm className="w-24 shrink-0 sm:w-36" />
          </div>
        </div>
        <KaleidoStrip seed={1} />
        <LiveRelease />
        <section aria-label="Video" className="py-10">
          <LiteVideo id="LmZ3yCyWoTI" />
        </section>
        <AlbumBrowser />
        <KaleidoStrip seed={0} />
        <ShowAlerts />
        <div className="pb-10 [&>section]:mt-10">
          <Suspense
            fallback={
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/60">
                Loading…
              </p>
            }
          >
            <VenueLeaderboard />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

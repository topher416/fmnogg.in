import { BAND } from "@/lib/site";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import LiveRelease from "./LiveRelease";
import AlbumBrowser from "./AlbumBrowser";
import Kaleidoscope from "./Kaleidoscope";
import ShowAlerts from "./ShowAlerts";
import LiteVideo from "./LiteVideo";

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
        <div className="flex items-center justify-between gap-6 py-10">
          <h1 className="lowercase text-[1.9rem] font-bold leading-tight tracking-tight text-white/90 sm:text-[2.5rem]">
            {BAND.name}
          </h1>
          <img
            src="/mascot.png"
            alt=""
            aria-hidden
            draggable={false}
            className="w-24 shrink-0 select-none sm:w-36"
          />
        </div>
        <KaleidoStrip seed={1} />
        <ShowAlerts />
        <AlbumBrowser />
        <KaleidoStrip seed={0} />
        <LiveRelease />
        <section aria-label="Video" className="py-10">
          <LiteVideo id="LmZ3yCyWoTI" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

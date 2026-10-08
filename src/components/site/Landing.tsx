import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import NextShow from "./NextShow";
import LiveRelease from "./LiveRelease";
import AlbumBrowser from "./AlbumBrowser";
import Kaleidoscope from "./Kaleidoscope";
import HomeGate from "./HomeGate";
import Countdown from "./Countdown";
import ShowHero from "./ShowHero";
import AboutBand from "./AboutBand";

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
      <HomeGate
        before={
          <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
            <NextShow />
            <Countdown />
            <KaleidoStrip seed={0} />
            <AlbumBrowser />
            <KaleidoStrip seed={1} />
            <LiveRelease />
            <div className="py-10">
              <div className="md:hidden">
                <Kaleidoscope seed={2} strip compact />
              </div>
              <div className="hidden md:block">
                <Kaleidoscope seed={2} strip />
              </div>
            </div>
          </main>
        }
        live={
          <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
            <ShowHero />
            <AboutBand />
            <AlbumBrowser />
            <KaleidoStrip seed={1} />
            <LiveRelease />
            <div className="py-10">
              <div className="md:hidden">
                <Kaleidoscope seed={2} strip compact />
              </div>
              <div className="hidden md:block">
                <Kaleidoscope seed={2} strip />
              </div>
            </div>
          </main>
        }
      />
      <SiteFooter />
    </div>
  );
}

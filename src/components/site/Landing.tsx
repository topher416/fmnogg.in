import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import NextShow from "./NextShow";
import LiveRelease from "./LiveRelease";
import AlbumBrowser from "./AlbumBrowser";
import Kaleidoscope from "./Kaleidoscope";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
        <NextShow />
        <div className="border-b border-white/[0.06] py-6">
          <div className="md:hidden">
            <Kaleidoscope seed={0} strip compact />
          </div>
          <div className="hidden md:block">
            <Kaleidoscope seed={0} strip />
          </div>
        </div>
        <AlbumBrowser />
        <div className="border-b border-white/[0.06] py-6">
          <div className="md:hidden">
            <Kaleidoscope seed={1} strip compact />
          </div>
          <div className="hidden md:block">
            <Kaleidoscope seed={1} strip />
          </div>
        </div>
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
      <SiteFooter />
    </div>
  );
}

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
        {/* Mobile: kaleidoscope right beneath the next show */}
        <div className="md:hidden py-8 border-b border-white/[0.06]">
          <Kaleidoscope seed={0} />
        </div>
        <LiveRelease />
        <div className="md:grid md:grid-cols-[1fr_300px] md:gap-10 md:items-start">
          <AlbumBrowser />
          {/* Desktop: kaleidoscopes scattered down the sidebar */}
          <aside className="hidden md:block py-10" aria-label="Motion">
            <div className="sticky top-8 space-y-12">
              <Kaleidoscope seed={1} />
              <Kaleidoscope seed={2} />
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

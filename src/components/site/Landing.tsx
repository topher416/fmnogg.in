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
        <LiveRelease />
        <div className="md:grid md:grid-cols-[1fr_300px] md:gap-10 md:items-start">
          <AlbumBrowser />
          <aside className="py-10 md:sticky md:top-8" aria-label="Motion">
            <Kaleidoscope />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

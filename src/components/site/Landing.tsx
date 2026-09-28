import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import NextShow from "./NextShow";
import LiveRelease from "./LiveRelease";
import AlbumBrowser from "./AlbumBrowser";
import SnippetPlayer from "./SnippetPlayer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader />
      <SnippetPlayer />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5">
        <NextShow />
        <LiveRelease />
        <AlbumBrowser />
      </main>
      <SiteFooter />
    </div>
  );
}

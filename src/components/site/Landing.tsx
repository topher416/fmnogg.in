import SiteHeader from "@/components/site/SiteHeader";
import ShowHero from "@/components/site/ShowHero";
import AlbumBrowser from "@/components/site/AlbumBrowser";
import SiteFooter from "@/components/site/SiteFooter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#c8c0b8]">
      <SiteHeader />
      <main>
        <ShowHero />
        <AlbumBrowser />
      </main>
      <SiteFooter />
    </div>
  );
}

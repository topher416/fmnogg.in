import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AnniversaryCalendar from "@/components/site/AnniversaryCalendar";

export const metadata: Metadata = {
  title: `Anniversaries — ${BAND.name}`,
  description: `Every Radiohead studio album anniversary, on the calendar.`,
  alternates: { canonical: "/anniversaries" },
};

export default function AnniversariesPage() {
  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "anniversaries" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Never miss an excuse
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          Radiohead anniversaries
        </h1>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
          All nine studio albums — each anniversary a reason to play a
          themed night. ★ marks the 5-year milestones bookers love.
        </p>

        <AnniversaryCalendar />
      </main>

      <SiteFooter />
    </div>
  );
}

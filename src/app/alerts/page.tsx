import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AlertForm from "@/components/site/AlertForm";

export const metadata: Metadata = {
  title: `Show alerts — ${BAND.name}`,
  description: `Get one email when ${BAND.name} announces a show. Nothing else.`,
  alternates: { canonical: "/alerts" },
};

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "alerts" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Mailing list
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          Show alerts
        </h1>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
          One email when a show is announced — date, venue, lineup, door price.
          Nothing else. No newsletters, no spam, unsubscribe anytime.
        </p>

        <AlertForm />
      </main>

      <SiteFooter />
    </div>
  );
}

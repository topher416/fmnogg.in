import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PasswordGate from "./PasswordGate";

export const metadata: Metadata = {
  title: `Alerts admin — ${BAND.name}`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AlertsAdminPage() {
  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "alerts" }, { label: "admin" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Private
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          Alert subscribers
        </h1>

        <PasswordGate />
      </main>

      <SiteFooter />
    </div>
  );
}

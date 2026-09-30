import Link from "next/link";
import { BAND } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-[1000px] mx-auto px-5 py-8 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
        <span className="text-white/45">{BAND.name}</span>
        <div className="flex items-center gap-4">
          <Link
            href="/members"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            members
          </Link>
          <Link
            href="/practice"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            practice
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { BAND, SHOW } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-[1000px] mx-auto px-5 py-8 flex flex-col gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
        <span className="text-white/45">{BAND.name}</span>
        <span>
          {SHOW.date} · {SHOW.venue} · {SHOW.city}
        </span>
        <Link href="/practice" className="w-fit mt-2 text-white/25 hover:text-white/60 transition-colors">
          members · practice
        </Link>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { BAND } from "@/lib/site";

const SOCIALS = [
  { label: "instagram", href: "https://www.instagram.com/athousandfeetpersecond" },
  { label: "facebook", href: "https://www.facebook.com/people/a-thousand-feet-per-second/61595030072742/" },
  { label: "youtube", href: "https://www.youtube.com/@athousandfeetpersecond" },
  { label: "tiktok", href: "https://www.tiktok.com/@athousandfeetpersecond" },
  { label: "booking", href: "mailto:booking@athousandfeetpersecond.com" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-[1000px] mx-auto px-5 py-8 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
        <span className="text-white/45">{BAND.name}</span>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          <Link
            href="/shows"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            shows
          </Link>
          <Link
            href="/press"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            press
          </Link>
          <Link
            href="/alerts"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            alerts
          </Link>
          <Link
            href="/members"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            members
          </Link>
          <Link
            href="/wiki"
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            about
          </Link>
          <span className="text-white/15" aria-hidden>
            |
          </span>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="text-white/45 hover:text-white/80 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import { BAND } from "@/lib/site";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/athousandfeetpersecond", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/people/a-thousand-feet-per-second/61595030072742/", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@athousandfeetpersecond", Icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@athousandfeetpersecond", Icon: TikTokIcon },
  { label: "Booking email", href: "mailto:booking@athousandfeetpersecond.com", Icon: Mail },
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
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              aria-label={label}
              title={label}
              className="text-white/45 hover:text-white/85 transition-colors"
            >
              <Icon className="h-[15px] w-[15px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

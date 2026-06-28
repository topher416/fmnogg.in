import Link from "next/link";
import { BAND } from "@/lib/site";

interface Crumb {
  label: string;
  href?: string;
  color?: string;
}

/** Slim top bar: band wordmark links home, optional breadcrumb trail. */
export default function SiteHeader({ crumbs = [] }: { crumbs?: Crumb[] }) {
  return (
    <header className="sticky top-0 z-20 bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto flex items-center gap-2 px-4 py-3 text-[0.62rem] font-mono uppercase tracking-[0.18em]">
        <Link
          href="/"
          className="text-white/55 hover:text-white transition-colors whitespace-nowrap"
        >
          {BAND.name}
        </Link>
        {crumbs.map((c) => (
          <span key={c.label} className="flex items-center gap-2 min-w-0">
            <span className="text-white/20" aria-hidden>
              /
            </span>
            {c.href ? (
              <Link
                href={c.href}
                className="transition-colors truncate hover:opacity-80"
                style={{ color: c.color ?? "rgba(255,255,255,0.55)" }}
              >
                {c.label}
              </Link>
            ) : (
              <span
                className="truncate"
                style={{ color: c.color ?? "rgba(255,255,255,0.8)" }}
              >
                {c.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </header>
  );
}

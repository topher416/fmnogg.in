import Link from "next/link";
import { BAND } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#080808] px-6 text-center">
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#00ff9f]">404</p>
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#f0ece6]">
        Lost in the static
      </h1>
      <p className="max-w-sm text-white/45 leading-relaxed">
        That page isn&apos;t part of the set — yet. {BAND.name} is working through the
        whole discography.
      </p>
      <Link
        href="/"
        className="mt-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-white/60 hover:text-white transition-colors"
      >
        ← Back to the albums
      </Link>
    </div>
  );
}

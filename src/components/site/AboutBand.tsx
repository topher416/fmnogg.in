import Link from "next/link";

/** Condensed wiki facts for the show-night homepage, with the full wiki linked. */
export default function AboutBand() {
  return (
    <section aria-label="About the band" className="border-b border-white/[0.06] py-10">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        About
      </p>
      <div className="mt-3 max-w-[62ch] space-y-3 text-[0.95rem] leading-relaxed text-white/65">
        <p>
          a thousand feet per second is an eight-piece band from Chicago,
          Illinois, formed in 2026, performing the music of Radiohead.
        </p>
        <p>
          The name comes from a lyric in &ldquo;The Tourist&rdquo;, the
          closing track of <em>OK Computer</em> — &ldquo;they ask me where
          the hell I&rsquo;m going / at a thousand feet per second&rdquo;.
          The band grew out of the Radiohead Ensemble at the Old Town School
          of Folk Music in Lincoln Square.
        </p>
      </div>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href="/wiki"
          className="font-mono text-[0.68rem] text-white/50 underline underline-offset-4 decoration-white/20 hover:text-white/80 transition-colors"
        >
          The full wiki
        </Link>
        <Link
          href="/members"
          className="font-mono text-[0.68rem] text-white/50 underline underline-offset-4 decoration-white/20 hover:text-white/80 transition-colors"
        >
          The eight members
        </Link>
      </p>
    </section>
  );
}

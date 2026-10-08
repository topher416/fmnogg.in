/**
 * The band's wiki, embedded whole — the joke is that it's a real
 * Wikipedia-style article sitting inside the dark site.
 */
export default function WikiEmbed() {
  return (
    <section aria-label="Band wiki" className="border-b border-white/[0.06] py-10">
      <iframe
        src="/wiki"
        title="a thousand feet per second — wiki"
        loading="lazy"
        className="block h-[80vh] max-h-[840px] min-h-[540px] w-full border border-white/10 bg-white"
      />
    </section>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "a thousand feet per second — Wiki",
  description: "An aspirational encyclopedia article about the Chicago Radiohead cover band a thousand feet per second.",
  robots: { index: false, follow: false },
};

const MEMBERS = [
  ["Peter Manis", "drums"],
  ["Eric Gorsack", "bass"],
  ["Jim Svagl", "electric guitar"],
  ["Jeff Mauricio", "electric guitar"],
  ["Drew Kelly", "vocals, electric guitar"],
  ["Topher Rasmussen", "acoustic, vocals"],
  ["Hannah Enenbach", "vocals"],
  ["Andrew Schneider", "keyboards"],
] as const;

function Ref({ n }: { n: number }) {
  return (
    <sup className="text-[#3366cc] text-[0.7em] whitespace-nowrap">
      [{n}]
    </sup>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-serif text-[1.5rem] leading-snug mt-8 mb-2 pb-1 border-b border-[#a2a9b1] text-[#202122] scroll-mt-4"
    >
      {children}
    </h2>
  );
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="font-serif text-[1.2rem] leading-snug mt-6 mb-2 text-[#202122] scroll-mt-4"
    >
      {children}
    </h3>
  );
}

export default function WikiPage() {
  return (
    <div className="min-h-screen bg-white text-[#202122]">
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-6 sm:py-10 text-[0.92rem] leading-[1.65]">
        {/* aspirational disclaimer */}
        <div className="mb-6 border border-[#a2a9b1] bg-[#f8f9fa] px-4 py-3 text-[0.8rem] leading-relaxed flex gap-3">
          <span className="text-lg leading-none mt-0.5">ⓘ</span>
          <p>
            <strong>Aspirational article.</strong> This page is written in the
            style of an encyclopedia entry and lives on the band&rsquo;s own
            website. It is not affiliated with Wikipedia — yet.
          </p>
        </div>

        {/* hatnote */}
        <p className="italic text-[0.85rem] text-[#54595d] mb-4 pl-6">
          This article is about the Chicago tribute band. For the Radiohead
          song containing the lyric, see{" "}
          <span className="text-[#3366cc]">The Tourist</span>.
        </p>

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] leading-tight pb-2 border-b border-[#a2a9b1] mb-4">
          a thousand feet per second
        </h1>
        <p className="text-[0.8rem] text-[#54595d] mb-6">
          From the band&rsquo;s own wiki, the free encyclopedia that anyone
          in the band can edit
        </p>

        {/* infobox */}
        <aside className="sm:float-right sm:ml-6 sm:mb-4 mb-6 w-full sm:w-[300px] border border-[#a2a9b1] bg-[#f8f9fa] text-[0.82rem] leading-relaxed">
          <div className="bg-[#eaecf0] px-3 py-2 text-center font-bold text-[0.95rem]">
            a thousand feet per second
          </div>
          <div className="px-3 py-3 border-b border-[#a2a9b1] flex items-center justify-center h-28 bg-[#e8e2d9] text-[#54595d] font-mono text-[0.7rem] text-center">
            [ band photo pending ]
          </div>
          <dl className="px-3 py-2">
            {[
              ["Origin", "Chicago, Illinois, U.S."],
              ["Genres", "Alternative rock · tribute act"],
              ["Years active", "2026–present"],
              ["Labels", "Independent"],
              ["Website", "fmnogg.in"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 py-1 border-b border-[#eaecf0] last:border-0">
                <dt className="font-bold w-[92px] shrink-0">{k}</dt>
                <dd className="m-0">{v}</dd>
              </div>
            ))}
            <div className="py-1">
              <dt className="font-bold mb-1">Members</dt>
              <dd className="m-0">
                <ul className="list-none m-0 p-0 space-y-0.5">
                  {MEMBERS.map(([name, role]) => (
                    <li key={name}>
                      {name} <span className="text-[#54595d]">– {role}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        {/* lead */}
        <p>
          <strong>a thousand feet per second</strong> is an American rock band
          from Chicago, Illinois, formed in 2026. The eight-piece group
          performs the music of the English rock band Radiohead, and
          documents its repertoire and live performances on its website,
          fmnogg.in.<Ref n={1} />
        </p>
        <p>
          The band&rsquo;s name is taken from a lyric in &ldquo;The
          Tourist&rdquo;, the closing track of Radiohead&rsquo;s 1997 album{" "}
          <em>OK Computer</em>: <em>&ldquo;they ask me where the hell
          I&rsquo;m going / at a thousand feet per second.&rdquo;</em>
          <Ref n={2} />
        </p>

        {/* TOC */}
        <nav className="my-6 border border-[#a2a9b1] bg-[#f8f9fa] p-4 text-[0.85rem] w-fit">
          <p className="font-bold mb-2">Contents</p>
          <ol className="list-none m-0 p-0 space-y-1 text-[#3366cc]">
            <li><a href="#history" className="hover:underline">1 History</a>
              <ol className="list-none pl-4 mt-1 space-y-1">
                <li><a href="#formation" className="hover:underline">1.1 Formation</a></li>
                <li><a href="#performances" className="hover:underline">1.2 2026 performances</a></li>
              </ol>
            </li>
            <li><a href="#members" className="hover:underline">2 Members</a></li>
            <li><a href="#repertoire" className="hover:underline">3 Repertoire and documentation</a></li>
            <li><a href="#references" className="hover:underline">4 References</a></li>
            <li><a href="#external-links" className="hover:underline">5 External links</a></li>
          </ol>
        </nav>

        <H2 id="history">History</H2>
        <H3 id="formation">Formation</H3>
        <p>
          The band was formed in Chicago in 2026 by eight musicians with the
          stated aim of performing Radiohead&rsquo;s catalog in full, one
          album at a time. Its public-facing archive, fmnogg.in, tracks the
          share of each Radiohead studio album the group has performed to
          date.<Ref n={1} /> Early rehearsals were documented only in the
          memories of those present.<sup className="text-[#3366cc] text-[0.7em]"> [citation needed]</sup>
        </p>
        <H3 id="performances">2026 performances</H3>
        <p>
          The group has performed at the Montrose Saloon in Chicago, appearing
          on July 17, 2026 and again on September 25, 2026, the latter on a
          bill with the Pink Floyd tribute act The Blue You Once Knew.
          <Ref n={3} /> Both performances were recorded and released as free
          live recordings on fmnogg.in.<Ref n={1} /> A third Montrose Saloon
          appearance was scheduled for October 9, 2026, alongside Test Pattern
          and Three Men*.<Ref n={4} />
        </p>

        <H2 id="members">Members</H2>
        <ul className="list-disc pl-6 space-y-1">
          {MEMBERS.map(([name, role]) => (
            <li key={name}>
              {name} – {role}
            </li>
          ))}
        </ul>

        <H2 id="repertoire">Repertoire and documentation</H2>
        <p>
          Unusually for a tribute act, the band publishes a running account of
          its repertoire as a percentage of each Radiohead studio album
          covered, treating the complete discography as a work in progress.
          <Ref n={1} /> Live recordings are released with on-stage
          introductions and audience ambience intact, a practice the band has
          described as non-negotiable.<sup className="text-[#3366cc] text-[0.7em]"> [citation needed]</sup>
        </p>

        <H2 id="references">References</H2>
        <ol className="list-decimal pl-6 space-y-1 text-[0.85rem]">
          <li id="ref-1">
            <a href="https://fmnogg.in" className="text-[#3366cc] hover:underline">fmnogg.in</a> — official site and repertoire archive.
          </li>
          <li id="ref-2">
            Radiohead, <em>OK Computer</em> (1997), track 12, &ldquo;The Tourist&rdquo;.
          </li>
          <li id="ref-3">
            <a href="https://fmnogg.in" className="text-[#3366cc] hover:underline">fmnogg.in</a> — live recordings, Montrose Saloon, July 17 and September 25, 2026.
          </li>
          <li id="ref-4">
            Montrose Saloon listing, October 9, 2026.
          </li>
        </ol>

        <H2 id="external-links">External links</H2>
        <ul className="list-disc pl-6 space-y-1 text-[#3366cc]">
          <li><a href="https://fmnogg.in" className="hover:underline">Official website</a></li>
          <li><a href="https://fmnogg.in/members" className="hover:underline">Band members</a></li>
        </ul>

        {/* stub template */}
        <div className="mt-10 border border-[#a2a9b1] bg-[#f8f9fa] px-4 py-3 text-[0.8rem] flex gap-3">
          <span className="text-lg leading-none mt-0.5">🧩</span>
          <p className="m-0">
            <em>This article about a Chicago rock band is a stub. You can help
            expand it by coming to a show.</em>
          </p>
        </div>

        <p className="mt-8 text-[0.75rem] text-[#72777d]">
          Categories: Musical groups from Chicago · Radiohead tribute bands ·
          2026 establishments in Illinois
        </p>
      </main>
    </div>
  );
}

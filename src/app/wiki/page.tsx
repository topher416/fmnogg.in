import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "a thousand feet per second — Wiki",
  description: "An encyclopedia-style article about the Chicago Radiohead cover band a thousand feet per second.",
  robots: { index: false, follow: false },
};

const MEMBERS = [
  ["Hannah Enenbach", "vocals"],
  ["Eric Gorscak", "bass"],
  ["Drew Kelly", "vocals, electric guitar"],
  ["Peter Manis", "drums"],
  ["Jeff Mauricio", "electric guitar"],
  ["Topher Rasmussen", "acoustic, vocals"],
  ["Andrew Schneider", "keyboards"],
  ["Jim", "electric guitar"],
] as const;

function Ref({ n }: { n: number }) {
  return (
    <sup className="text-[#3366cc] text-[0.7em] whitespace-nowrap">
      [{n}]
    </sup>
  );
}

function Cn() {
  return (
    <sup className="text-[#3366cc] text-[0.7em]"> [citation needed]</sup>
  );
}

function X({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[#3366cc] hover:underline">
      {children}
    </a>
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
      <style>{`:where(.wiki-article) > p { margin: 0.5em 0 1em 0; }`}</style>
      <main className="wiki-article max-w-[960px] mx-auto px-4 sm:px-6 py-6 sm:py-10 text-[0.92rem] leading-[1.65]">
        {/* hatnote */}
        <p className="italic text-[0.85rem] text-[#54595d] mb-4 pl-6">
          This article is about the Chicago tribute band. For the Radiohead
          song containing the lyric, see{" "}
          <X href="https://en.wikipedia.org/wiki/The_Tourist_(song)">The Tourist</X>.
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
          <dl className="px-3 py-2">
            {[
              ["Origin", "Chicago, Illinois, U.S."],
              ["Genres", "Alternative rock · tribute act"],
              ["Years active", "2026–present"],
              ["Labels", "Independent"],
              ["Website", "athousandfeetpersecond.com"],
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
          performs the music of the English rock band{" "}
          <X href="https://en.wikipedia.org/wiki/Radiohead">Radiohead</X>,
          and documents its repertoire and live performances on its website,{" "}
          <X href="https://athousandfeetpersecond.com">athousandfeetpersecond.com</X>.<Ref n={1} />
        </p>
        <p>
          The band&rsquo;s name is taken from a lyric in &ldquo;The
          Tourist&rdquo;, the closing track of Radiohead&rsquo;s 1997 album{" "}
          <X href="https://en.wikipedia.org/wiki/OK_Computer">OK Computer</X>
          : <em>&ldquo;they ask me where the hell I&rsquo;m going / at a
          thousand feet per second.&rdquo;</em>
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
            <li><a href="#approach" className="hover:underline">2 Approach</a>
              <ol className="list-none pl-4 mt-1 space-y-1">
                <li><a href="#harmonies" className="hover:underline">2.1 Harmonies</a></li>
              </ol>
            </li>
            <li><a href="#members" className="hover:underline">3 Members</a></li>
            <li><a href="#repertoire" className="hover:underline">4 Repertoire and documentation</a></li>
            <li><a href="#fm-noggin" className="hover:underline">5 FM Noggin</a></li>
            <li><a href="#references" className="hover:underline">6 References</a></li>
            <li><a href="#external-links" className="hover:underline">7 External links</a></li>
          </ol>
        </nav>

        <H2 id="history">History</H2>
        <H3 id="formation">Formation</H3>
        <p>
          The band emerged from the Radiohead Ensemble, an adult ensemble
          class at the{" "}
          <X href="https://www.oldtownschool.org/">Old Town School of Folk Music</X>{" "}
          in Chicago&rsquo;s Lincoln Square, led by instructor{" "}
          <X href="https://www.oldtownschool.org/teachers/John-Mead">John Mead</X>.
          <Ref n={5} /> The school&rsquo;s ensemble program places
          intermediate-level players in working bands under the motto
          &ldquo;There is no &lsquo;I&rsquo; in band,&rdquo; with most classes
          concluding in a public performance at the school or a local venue.
          <Ref n={5} /> Drummer Peter Manis had played in Mead&rsquo;s earlier
          Radiohead lineups at the school; the eight musicians who became a
          thousand feet per second coalesced in the class&rsquo;s 2025–26
          sessions.<Cn /> Mead&rsquo;s own history with the school mirrors the
          band&rsquo;s trajectory: he was originally a student in its
          ensembles, out of which the band Mystery Train formed, before
          beginning to teach there himself in 2002.<Ref n={8} />
        </p>
        <p>
          The class met Monday nights in eight-week sessions at the
          school&rsquo;s Lincoln Avenue campus, open to the public with
          drummers and bassists admitted by permission.<Ref n={6} /> In
          November 2025, Mead informed the class that he had intended to
          discontinue the Radiohead group after that session, but agreed to
          continue for one more after the members asked him to keep it going.
          <Ref n={7} /> By early 2026 he had capped enrollment at ten players
          and five guitarists.<Ref n={7} />
        </p>
        <p>
          The ensemble played 45-minute sets in the school&rsquo;s showcases,
          including{" "}
          <X href="https://youtu.be/E-yYJg4qOQs">March 8, 2026</X>,{" "}
          <X href="https://youtu.be/hmkRxeVZ_EI">April 26, 2026</X>, and{" "}
          <X href="https://youtu.be/pCiL5A_Xrmk">June 14, 2026</X> appearances
          at Szold Hall.<Ref n={7} /> By the summer of 2026, Mead was treating
          the group as an independent unit: in late July he offered the band a
          dropped Saturday-night slot at the Underground Lounge for September
          12, which fell through when the club&rsquo;s booker was displeased
          with the band&rsquo;s then lack of social media presence.
          <Ref n={7} /> The group began performing outside the school as a
          thousand feet per second that summer.<Ref n={3} />
        </p>

        <H3 id="performances">2026 performances</H3>
        <p>
          The group has performed at the{" "}
          <X href="http://www.montrosesaloon.com/">Montrose Saloon</X> in
          Chicago, appearing on{" "}
          <X href="https://youtu.be/XJcWAbuCKhA?si=HG6SQLIY9RUi0uAW">July 17, 2026</X>{" "}
          and again on{" "}
          <X href="https://youtu.be/wnTnQ676_RU?si=DpDmDRcXeiF-qevm">September 25, 2026</X>,
          the latter on a bill with the{" "}
          <X href="https://en.wikipedia.org/wiki/Pink_Floyd">Pink Floyd</X>{" "}
          tribute act The Blue You Once Knew.<Ref n={3} /> Both performances
          were recorded and released as free live recordings on athousandfeetpersecond.com.
          <Ref n={1} /> A third Montrose Saloon appearance was scheduled for
          October 9, 2026, alongside Test Pattern and Three Men*.
          <Ref n={4} />
        </p>

        <H2 id="approach">Approach</H2>
        <p>
          The band&rsquo;s stated aim is to perform Radiohead&rsquo;s catalog
          in full.<Ref n={1} /> Within that frame, its arrangements depart
          from the original recordings — most audibly in the vocal harmonies,
          which frequently have no counterpart on the studio tracks, and in
          guitarist Jeff Mauricio&rsquo;s innovative soundscapes<Cn />
        </p>
        <H3 id="harmonies">Harmonies</H3>
        <p>
          The band fields three vocalists — Drew Kelly, Topher Rasmussen, and
          Hannah Enenbach — and three-part harmony has become a defining
          feature of its sound, pursued at Rasmussen&rsquo;s maniacal
          insistence.<Cn /> Rasmussen has described his vision for the
          arrangements as a hybrid between Radiohead and{" "}
          <X href="https://en.wikipedia.org/wiki/Peter,_Paul,_and_Mary">Peter, Paul, and Mary</X>.
          <Cn /> The concept outgrew the tribute format: in 2027 the
          folk-harmony strand was spun off into a separate group, Where Have
          All the Weird Fishes Gone — a spinoff of the spinoff, whose name
          combines the Peter, Paul and Mary standard{" "}
          <X href="https://en.wikipedia.org/wiki/Where_Have_All_the_Flowers_Gone%3F">Where Have All the Flowers Gone</X>{" "}
          with Radiohead&rsquo;s{" "}
          <X href="https://en.wikipedia.org/wiki/In_Rainbows">Weird Fishes/Arpeggi</X>.
          <Cn />
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
          <Ref n={1} /><Cn />
        </p>

        <H2 id="fm-noggin">FM Noggin</H2>
        <p className="italic text-[0.85rem] text-[#54595d] mb-2 pl-6">
          Main article: FM Noggin
        </p>
        <p>
          FM Noggin — Rasmussen&rsquo;s umbrella project for documenting his
          Radiohead work — is covered in a separate article.
        </p>

        <H2 id="references">References</H2>
        <ol className="list-decimal pl-6 space-y-1 text-[0.85rem]">
          <li id="ref-1">
            athousandfeetpersecond.com — official site and repertoire archive.
          </li>
          <li id="ref-2">
            Radiohead, <em>OK Computer</em> (1997), track 12, &ldquo;The Tourist&rdquo;.
          </li>
          <li id="ref-3">
            athousandfeetpersecond.com — live recordings, Montrose Saloon, July 17 and September 25, 2026.
          </li>
          <li id="ref-4">
            Montrose Saloon listing, October 9, 2026.
          </li>
          <li id="ref-5">
            &ldquo;Ensemble Program,&rdquo; Old Town School of Folk Music,{" "}
            <X href="https://www.oldtownschool.org/classes/adults/ensemble/">oldtownschool.org</X>.
            Retrieved September 30, 2026.
          </li>
          <li id="ref-6">
            Old Town School of Folk Music, web order confirmation, October 18,
            2025 (Radiohead Ensemble – John Mead, Monday 8:00 PM, eight weeks
            from October 27, 2025).
          </li>
          <li id="ref-7">
            John Mead, personal correspondence, November 2025 – July 2026.
          </li>
          <li id="ref-8">
            John Mead, teacher biography, Old Town School of Folk Music,{" "}
            <X href="https://www.oldtownschool.org/teachers/John-Mead">oldtownschool.org</X>.
            Retrieved September 30, 2026.
          </li>
        </ol>

        <H2 id="external-links">External links</H2>
        <ul className="list-disc pl-6 space-y-1 text-[#3366cc]">
          <li><a href="https://athousandfeetpersecond.com" className="hover:underline">Official website</a></li>
          <li><a href="https://athousandfeetpersecond.com/members" className="hover:underline">Band members</a></li>
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

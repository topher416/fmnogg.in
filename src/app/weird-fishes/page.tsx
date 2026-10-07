import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const body = Source_Serif_4({
  variable: "--font-body-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Where Have All the Weird Fishes Gone?",
  description:
    "From the Arts & Leisure section, Saturday, February 13, 1965: a review of a young octet's new single.",
  alternates: { canonical: "/weird-fishes" },
};

const INK = "#1c1710";
const PAPER = "#f1ead6";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1" style={{ background: INK, opacity: 0.55 }} />
      <p
        className="font-[family-name:var(--font-franklin)] text-[0.68rem] font-semibold uppercase"
        style={{ letterSpacing: "0.28em", color: INK }}
      >
        {children}
      </p>
      <span className="h-px flex-1" style={{ background: INK, opacity: 0.55 }} />
    </div>
  );
}

function RailBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="border p-5"
      style={{ borderColor: `${INK}`, borderWidth: "1.5px" }}
    >
      <p
        className="font-[family-name:var(--font-franklin)] text-[0.62rem] font-bold uppercase"
        style={{ letterSpacing: "0.24em", color: INK }}
      >
        {label}
      </p>
      <div
        className="my-3 border-t"
        style={{ borderColor: INK, opacity: 0.6 }}
      />
      {children}
    </section>
  );
}

export default function WeirdFishesPage() {
  return (
    <div
      className={`${franklin.variable} ${body.variable} min-h-screen`}
      style={{ background: PAPER, color: INK }}
    >
      {/* newsprint grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          opacity: 0.55,
          mixBlendMode: "multiply",
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix type=\"saturate\" values=\"0\"/></filter><rect width=\"180\" height=\"180\" filter=\"url(%23n)\" opacity=\"0.10\"/></svg>')",
        }}
      />

      <div className="mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-10 sm:py-10">
        {/* top dateline bar */}
        <div
          className="flex items-baseline justify-between gap-4 border-b pb-2 font-[family-name:var(--font-franklin)] text-[0.62rem] uppercase"
          style={{ borderColor: INK, letterSpacing: "0.18em", color: INK }}
        >
          <span>Vol. XIV — No. 207</span>
          <span className="hidden sm:inline">Saturday, February 13, 1965</span>
          <span>Price: Ten Cents</span>
        </div>

        {/* nameplate */}
        <header className="pt-6 text-center">
          <p
            className="font-[family-name:var(--font-playfair)] font-black leading-none"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 4.6rem)",
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            The Washington Square Chronicle
          </p>
          <div
            className="mx-auto mt-5 max-w-[720px] border-t-[3px]"
            style={{ borderColor: "#8c2f24" }}
          />
          <p
            className="mt-2 font-[family-name:var(--font-franklin)] text-[0.62rem] uppercase"
            style={{ letterSpacing: "0.3em", color: INK, opacity: 0.75 }}
          >
            Arts &amp; Leisure — Page 14
          </p>
        </header>

        <main className="mt-10 grid gap-10 lg:grid-cols-[1fr_290px]">
          {/* article */}
          <article>
            <Kicker>Recordings in Review</Kicker>

            <h1
              className="mt-6 text-center font-[family-name:var(--font-playfair)] font-extrabold leading-[1.02]"
              style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)", color: INK }}
            >
              Where Have All the
              <br />
              Weird Fishes Gone?
            </h1>

            <p
              className="mx-auto mt-4 max-w-[52ch] text-center font-[family-name:var(--font-body-serif)] italic"
              style={{ fontSize: "1.12rem", lineHeight: 1.5, color: "#4a4234" }}
            >
              A young octet with three guitars takes two strange new songs down
              to the deep water — and finds the old river running underneath
              them.
            </p>

            <p
              className="mt-5 text-center font-[family-name:var(--font-franklin)] text-[0.68rem] uppercase"
              style={{ letterSpacing: "0.22em", color: INK }}
            >
              By Harlan M. Reed
              <span
                className="mt-1 block text-[0.6rem] normal-case"
                style={{ letterSpacing: "0.08em", opacity: 0.7 }}
              >
                Special to The Chronicle
              </span>
            </p>

            <div
              className="mt-8 gap-8 md:columns-2"
              style={{ columnRule: `1px solid ${INK}44` }}
            >
              <p className="article-p">
                <span
                  className="font-[family-name:var(--font-franklin)] text-[0.72rem] font-semibold uppercase"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Greenwich Village, Feb. 12 —
                </span>{" "}
                <span className="dropcap">T</span>here are eight of them, which
                is the first remarkable thing. They crowd onto the little stage
                at the Bitter End with three flat-top guitars, a bass fiddle, a
                piano and more voices than the room was built to hold, under a
                name — A Thousand Feet Per Second — that sounds like something
                out of a science textbook. The second remarkable thing is the
                songs.
              </p>
              <p className="article-p">
                The new single gives you both of them at once.{" "}
                <em>“Let Down,”</em> the top side, opens with two guitars in a
                bright, circling figure that will not sit still, and a high
                tenor singing about growing wings. <em>“One day,”</em> he says,{" "}
                <em>“I am gonna grow wings — a chemical reaction, hysterical
                and useless.”</em> It is the oldest daydream in the world, set
                down without apology: the wish to rise straight up out of the
                room, and the rooms beyond the room. The tune keeps climbing
                and the voices keep joining it until, near the end, all eight
                are singing together — and it is the nearest thing to a
                union-hall chorus this reviewer has heard on a pop record in
                years. You do not so much listen to the finish as get carried
                along by it.
              </p>
              <p className="article-p">
                Turn the record over and the water gets deeper.{" "}
                <em>“Weird Fishes”</em> — a title that would have been laughed
                out of any publishing office on Tin Pan Alley — is built on
                three guitars playing a round, the way children sing{" "}
                <em>“Row, Row, Row Your Boat,”</em> except that the round never
                resolves and there are no children in sight. The singer is
                going down: <em>“in the deepest ocean, the bottom of the
                sea,”</em> down past where the light reaches, and he does not
                sound frightened. He sounds relieved. It is a baptism in
                reverse. When the voices come in at the close they sing softly,
                the way you sing when you are trying not to wake somebody.
              </p>
            </div>

            <blockquote
              className="mx-auto my-10 max-w-[46ch] border-y px-6 py-6 text-center"
              style={{ borderColor: INK }}
            >
              <p
                className="font-[family-name:var(--font-playfair)] italic"
                style={{ fontSize: "1.45rem", lineHeight: 1.35, color: INK }}
              >
                “It is the rare record that makes the strange familiar and the
                familiar strange inside the same three minutes.”
              </p>
            </blockquote>

            <div
              className="gap-8 md:columns-2"
              style={{ columnRule: `1px solid ${INK}44` }}
            >
              <p className="article-p">
                What this group understands — what all eight of them seem to
                have understood at once — is that the old songs were always
                about the water. <em>“The Water Is Wide.” “Shenandoah.”</em>{" "}
                Every river song ever sung in this town was about going down to
                something deeper than yourself and coming back changed, or not
                coming back. These eight have simply taken the river all the
                way out to the ocean. The instruments are new and the words are
                strange, but the current underneath is the oldest one in the
                book. There is nothing here of the Kingston Trio’s neatness,
                and none of Peter, Paul and Mary’s parlor polish. This is
                something wilder, and all the better for it.
              </p>
              <p className="article-p">
                So where have all the weird fishes gone? Down past the light,
                to the bottom of the sea — and this octet, to its great credit,
                had the nerve to follow them. Buy the record. Play it loud
                enough to hear the fingers on the strings.
              </p>
              <p
                className="article-p font-[family-name:var(--font-franklin)] text-[0.7rem] uppercase"
                style={{ letterSpacing: "0.2em", opacity: 0.75 }}
              >
                — H. M. R.
              </p>
            </div>
          </article>

          {/* rail */}
          <aside className="space-y-8">
            <RailBox label="The Record">
              <p
                className="font-[family-name:var(--font-body-serif)] font-semibold"
                style={{ fontSize: "1.02rem", color: INK }}
              >
                A Thousand Feet Per Second
              </p>
              <p
                className="mt-1 font-[family-name:var(--font-body-serif)] italic"
                style={{ color: "#4a4234" }}
              >
                “Let Down” b/w “Weird Fishes”
              </p>
              <p
                className="mt-3 font-[family-name:var(--font-franklin)] text-[0.68rem] uppercase leading-relaxed"
                style={{ letterSpacing: "0.12em", color: INK }}
              >
                Washington Square WSR-45109
                <br />
                45 r.p.m. · 98 cents
                <br />
                In the shops Monday
              </p>
              <p
                className="mt-3 font-[family-name:var(--font-body-serif)] text-[0.85rem] italic"
                style={{ color: "#4a4234" }}
              >
                The group plays the Bitter End, Tuesday through Sunday, two
                shows nightly.
              </p>
            </RailBox>

            <figure>
              <div
                className="border p-2"
                style={{ borderColor: INK, borderWidth: "1.5px" }}
              >
                <div
                  aria-hidden
                  className="h-44 w-full"
                  style={{
                    backgroundColor: "#e4dabd",
                    backgroundImage:
                      "radial-gradient(circle, rgba(28,23,16,0.8) 1px, transparent 1.35px)",
                    backgroundSize: "6px 6px",
                  }}
                />
              </div>
              <figcaption
                className="mt-2 font-[family-name:var(--font-body-serif)] italic"
                style={{ fontSize: "0.82rem", lineHeight: 1.45, color: "#4a4234" }}
              >
                Three guitars, eight voices, and one very deep ocean: the group
                at the Bitter End last Tuesday.{" "}
                <span style={{ fontStyle: "normal" }}>
                  (Chronicle staff photo)
                </span>
              </figcaption>
            </figure>

            <RailBox label="Around the Village">
              <ul
                className="space-y-2 font-[family-name:var(--font-body-serif)]"
                style={{ fontSize: "0.88rem", color: INK }}
              >
                <li>
                  <strong>The Bitter End</strong> — A Thousand Feet Per Second,
                  thru Sun.
                </li>
                <li>
                  <strong>Gerde’s Folk City</strong> — Hootenanny, Monday.
                </li>
                <li>
                  <strong>The Gaslight</strong> — Poetry and blues, nightly.
                </li>
              </ul>
            </RailBox>

            <RailBox label="Also Noted">
              <ul
                className="space-y-3 font-[family-name:var(--font-body-serif)]"
                style={{ fontSize: "0.85rem", lineHeight: 1.5, color: INK }}
              >
                <li>
                  <strong>MIRIAM FELL</strong> — <em>“Songs of the Inland
                  Sea”</em> (Harborlight HL-204; $3.98). A clear alto, too
                  carefully recorded. The sea deserves better than hi-fi.
                </li>
                <li>
                  <strong>THE FERRYMAN’S SONS</strong> — <em>“Low Bridge”</em>{" "}
                  b/w <em>“Erie Canal”</em> (Meadowlark 402; 98¢). Sturdy.
                  Unsurprising. Worth the dollar.
                </li>
              </ul>
            </RailBox>

            <section
              className="border border-dashed p-5"
              style={{ borderColor: `${INK}88` }}
            >
              <p
                className="font-[family-name:var(--font-franklin)] text-[0.62rem] font-bold uppercase"
                style={{ letterSpacing: "0.24em", color: "#8c2f24" }}
              >
                Correction
              </p>
              <p
                className="mt-2 font-[family-name:var(--font-body-serif)]"
                style={{ fontSize: "0.85rem", lineHeight: 1.5, color: INK }}
              >
                In yesterday’s column the number of guitars on the Bitter End
                stage was misstated. There are three. The Chronicle regrets the
                error.
              </p>
            </section>
          </aside>
        </main>

        <footer
          className="mt-12 border-t pt-4 text-center"
          style={{ borderColor: INK }}
        >
          <p
            className="font-[family-name:var(--font-franklin)] text-[0.6rem] uppercase"
            style={{ letterSpacing: "0.26em", color: INK, opacity: 0.7 }}
          >
            Set in Caslon and Franklin Gothic · Printed on 30-lb. groundwood
          </p>
          <p className="mt-3">
            <a
              href="/"
              className="font-[family-name:var(--font-franklin)] text-[0.62rem] uppercase underline underline-offset-4"
              style={{ letterSpacing: "0.2em", color: INK, opacity: 0.55 }}
            >
              ← Return to the front page
            </a>
          </p>
        </footer>
      </div>

      <style>{`
        .article-p {
          font-family: var(--font-body-serif), Georgia, serif;
          font-size: 0.99rem;
          line-height: 1.68;
          color: ${INK};
          text-align: justify;
          hyphens: auto;
          margin-bottom: 1.1em;
          break-inside: avoid;
        }
        .article-p em { font-style: italic; }
        .dropcap {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 900;
          float: left;
          font-size: 3.3em;
          line-height: 0.82;
          padding-right: 0.12em;
          padding-top: 0.06em;
          color: ${INK};
        }
      `}</style>
    </div>
  );
}

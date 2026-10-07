import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const body = Source_Serif_4({
  variable: "--font-body-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Let Down, Carried Up",
  description:
    "From the Arts & Leisure section, Saturday, February 13, 1965: a review of a young octet's new single.",
  alternates: { canonical: "/weird-fishes" },
};

const INK = "#16130f";
const CLIP = "#dedbd4";
const SHEET = "#e9e8e3";

/** Fixed xerox speckles: [top%, left%, size px, opacity]. */
const SPECKS: [number, number, number, number][] = [
  [6, 12, 2, 0.5],
  [11, 78, 1.5, 0.45],
  [23, 34, 2.5, 0.35],
  [31, 88, 1.5, 0.5],
  [44, 8, 2, 0.4],
  [52, 61, 1.5, 0.45],
  [63, 25, 2.5, 0.3],
  [71, 82, 2, 0.45],
  [79, 47, 1.5, 0.4],
  [88, 14, 2, 0.5],
  [93, 70, 1.5, 0.4],
  [17, 55, 1.5, 0.35],
];

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-[family-name:var(--font-franklin)] text-[0.68rem] font-bold uppercase"
      style={{
        letterSpacing: "0.22em",
        color: INK,
        margin: "1.3em 0 0.5em",
      }}
    >
      {children}
    </p>
  );
}

export default function WeirdFishesPage() {
  return (
    <div
      className={`${franklin.variable} ${body.variable} flex min-h-screen items-center justify-center p-6 sm:p-12`}
      style={{
        background:
          "radial-gradient(1200px 700px at 50% 0%, #3a3a3a, #232323 70%)",
      }}
    >
      {/* the xerox sheet, slightly crooked */}
      <div
        className="w-full max-w-[1060px] p-5 sm:p-8"
        style={{
          background: SHEET,
          transform: "rotate(-1.5deg)",
          boxShadow: "0 34px 70px rgba(0,0,0,0.55), 0 4px 14px rgba(0,0,0,0.4)",
        }}
      >
        {/* the newspaper clipping */}
        <div
          className="relative overflow-hidden px-5 py-6 sm:px-7"
          style={{
            background: CLIP,
            filter: "blur(0.3px) contrast(1.13)",
          }}
        >
          {/* xerox spine shadow, left edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.34), transparent)",
            }}
          />
          {/* toner speckles */}
          {SPECKS.map(([t, l, s, o], i) => (
            <span
              key={i}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                top: `${t}%`,
                left: `${l}%`,
                width: s,
                height: s,
                background: "#000",
                opacity: o,
              }}
            />
          ))}

          {/* folio line */}
          <div
            className="border-b pb-2 text-center font-[family-name:var(--font-franklin)] text-[0.6rem] uppercase"
            style={{
              borderColor: INK,
              letterSpacing: "0.24em",
              color: INK,
            }}
          >
            The Old Town Chronicle · Saturday, February 13, 1965 ·
            Page 14
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_208px]">
            {/* article */}
            <article>
              <div className="flex items-center gap-4">
                <span
                  className="h-px flex-1"
                  style={{ background: INK, opacity: 0.55 }}
                />
                <p
                  className="font-[family-name:var(--font-franklin)] text-[0.66rem] font-semibold uppercase"
                  style={{ letterSpacing: "0.3em", color: INK }}
                >
                  Recordings in Review
                </p>
                <span
                  className="h-px flex-1"
                  style={{ background: INK, opacity: 0.55 }}
                />
              </div>

              <h1
                className="mt-5 text-center font-[family-name:var(--font-playfair)] font-extrabold leading-[1.04]"
                style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.3rem)", color: INK }}
              >
                Let Down,
                <br />
                Carried Up
              </h1>

              <p
                className="mx-auto mt-3 max-w-[50ch] text-center font-[family-name:var(--font-body-serif)] italic"
                style={{ fontSize: "1.05rem", lineHeight: 1.5, color: "#3d362b" }}
              >
                A young octet with three guitars takes one strange new song to
                the Montrose Saloon — and finds an old river running
                underneath it.
              </p>

              <p
                className="mt-4 border-y py-2 text-center font-[family-name:var(--font-franklin)] text-[0.66rem] uppercase"
                style={{
                  borderColor: INK,
                  letterSpacing: "0.22em",
                  color: INK,
                }}
              >
                By Harlan M. Reed · Special to The Chronicle
              </p>

              <figure className="mt-5">
                <div
                  className="border p-1.5"
                  style={{ borderColor: INK, borderWidth: "1.5px" }}
                >
                  <div
                    aria-hidden
                    className="relative h-52 w-full sm:h-64"
                    style={{
                      backgroundColor: "#cfcabd",
                      backgroundImage:
                        "radial-gradient(circle, rgba(22,19,15,0.8) 1px, transparent 1.35px)",
                      backgroundSize: "6px 6px",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(22,19,15,0.3), transparent 42%, transparent 62%, rgba(22,19,15,0.4))",
                        boxShadow: "inset 0 0 46px rgba(22,19,15,0.42)",
                      }}
                    />
                  </div>
                </div>
                <figcaption
                  className="mt-2 font-[family-name:var(--font-body-serif)] italic"
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: 1.45,
                    color: "#3d362b",
                  }}
                >
                  Three guitars, three voices: the group at the Montrose Saloon
                  last Tuesday. (Chronicle staff photo)
                </figcaption>
              </figure>

              <div
                className="mt-6 gap-7 md:columns-2"
                style={{ columnRule: `1px solid ${INK}55` }}
              >
                <p className="article-p">
                  <span
                    className="font-[family-name:var(--font-franklin)] text-[0.7rem] font-semibold uppercase"
                    style={{ letterSpacing: "0.14em" }}
                  >
                    Old Town, Feb. 12 —
                  </span>{" "}
                  <span className="dropcap">T</span>here are eight of them,
                  which is the first remarkable thing. They crowd onto the
                  little stage at the Montrose Saloon with three flat-top guitars, a
                  bass fiddle, a piano, drums, and more musicians than the room
                  was built to hold, under a name — A Thousand Feet Per Second
                  — that sounds like something out of a science textbook. The
                  second remarkable thing is the song.
                </p>
                <p className="article-p">
                  Their new single is <em>“Let Down.”</em> It opens with two
                  guitars in
                  a bright, circling figure that will not sit still, and a high
                  tenor singing about growing wings. <em>“One day,”</em> he
                  says, <em>“I am gonna grow wings — a chemical reaction,
                  hysterical and useless.”</em> It is the oldest daydream in
                  the world, set down without apology: the wish to rise
                  straight up out of the room, and the rooms beyond the room.
                  The tune keeps climbing and the voices keep joining it until,
                  near the end, all three are in it together, braided tight
                  the way only people who sing together every night can braid
                  them. You do not so much listen to the finish as get carried
                  along by it.
                </p>
              </div>

              <blockquote
                className="my-8 border-y px-6 py-5 text-center"
                style={{ borderColor: INK }}
              >
                <p
                  className="font-[family-name:var(--font-playfair)] italic"
                  style={{ fontSize: "1.35rem", lineHeight: 1.35, color: INK }}
                >
                  “It is the rare record that makes the strange familiar and
                  the familiar strange inside the same three minutes.”
                </p>
              </blockquote>

              <div
                className="gap-7 md:columns-2"
                style={{ columnRule: `1px solid ${INK}55` }}
              >
                <Subhead>The current underneath</Subhead>
                <p className="article-p">
                  What this group understands — what all eight of them seem to
                  have understood at once — is that the old songs were always
                  about the water. <em>“The Water Is Wide.” “Shenandoah.”</em>{" "}
                  Every river song ever sung in this town was about going down
                  to something deeper than yourself and coming back changed, or
                  not coming back. The instruments are new and the
                  words are strange, but the current underneath is the oldest
                  one in the book. There is nothing here of the Kingston
                  Trio’s neatness, and none of Peter, Paul and Mary’s parlor
                  polish. This is something wilder, and all the better for it.
                </p>
                <p className="article-p">
                  Buy the record. Play it loud enough to hear the fingers on
                  the strings.
                </p>
                <p
                  className="article-p font-[family-name:var(--font-franklin)] text-[0.68rem] uppercase"
                  style={{ letterSpacing: "0.2em", opacity: 0.75 }}
                >
                  — H. M. R.
                </p>
                <p
                  className="article-p text-center font-[family-name:var(--font-franklin)] text-[0.7rem] font-semibold"
                  style={{ letterSpacing: "0.34em", opacity: 0.8 }}
                >
                  — 30 —
                </p>
              </div>
            </article>

            {/* ad column: period replicas */}
            <aside className="space-y-6">
              <div>
                <div className="space-y-1.5">
                  {[
                    "Don't lose",
                    "your head",
                    "to gain a minute",
                    "you need your head",
                    "your brains are in it",
                    "Burma-Shave",
                  ].map((line) => (
                    <div
                      key={line}
                      className="px-2 py-2 text-center font-[family-name:var(--font-franklin)] text-[0.72rem] font-bold uppercase"
                      style={{
                        background: INK,
                        color: "#f2f0ea",
                        letterSpacing: "0.12em",
                        lineHeight: 1.3,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="border p-4 text-center"
                style={{ borderColor: INK, borderWidth: "2px" }}
              >
                <p
                  className="font-[family-name:var(--font-franklin)] font-black uppercase"
                  style={{
                    fontSize: "1.02rem",
                    lineHeight: 1.3,
                    letterSpacing: "0.06em",
                    color: INK,
                  }}
                >
                  Only you
                  <br />
                  can prevent
                  <br />
                  forest fires
                </p>
                <div
                  className="mx-auto my-3 w-10 border-t"
                  style={{ borderColor: INK }}
                />
                <p
                  className="font-[family-name:var(--font-body-serif)]"
                  style={{ fontSize: "0.8rem", lineHeight: 1.5, color: INK }}
                >
                  Please be careful with matches, cigarettes and camp fires.
                  Remember — 9 out of 10 forest fires are caused by people.
                </p>
                <p
                  className="mt-3 font-[family-name:var(--font-franklin)] text-[0.58rem] uppercase"
                  style={{ letterSpacing: "0.18em", color: INK, opacity: 0.7 }}
                >
                  A public service message · U.S. Dept. of Agriculture,
                  Forest Service
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        .article-p {
          font-family: var(--font-body-serif), Georgia, serif;
          font-size: 0.95rem;
          line-height: 1.66;
          color: ${INK};
          text-align: justify;
          hyphens: auto;
          margin-bottom: 1.05em;
          break-inside: avoid;
        }
        .article-p em { font-style: italic; }
        .dropcap {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 900;
          float: left;
          font-size: 3.4em;
          line-height: 0.8;
          padding-right: 0.12em;
          padding-top: 0.05em;
          color: ${INK};
        }
      `}</style>
    </div>
  );
}

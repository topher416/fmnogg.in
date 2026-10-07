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
  title: "Three Voices Against the Cold",
  description:
    "From the Arts & Leisure section, Saturday, February 13, 1965: on the rare quality of three part harmony, sung with vigor.",
  alternates: { canonical: "/three-voices" },
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

export default function ThreeVoicesPage() {
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
            The Old Town Chronicle · Saturday, February 13, 1965 · Page 14
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
                Three Voices
                <br />
                Against the Cold
              </h1>

              <p
                className="mx-auto mt-3 max-w-[50ch] text-center font-[family-name:var(--font-body-serif)] italic"
                style={{ fontSize: "1.05rem", lineHeight: 1.5, color: "#3d362b" }}
              >
                Eight players, three singers, one new single. The song is a
                thin thing. The singing is not.
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
                  Three singers, three guitars: the group at Mother Blues last
                  Tuesday. (Chronicle staff photo)
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
                    Old Town, Feb. 12:
                  </span>{" "}
                  <span className="dropcap">T</span>here are eight of them.
                  They crowded onto the stage at Mother Blues last Tuesday
                  with three guitars, a bass fiddle, a piano and drums, and a
                  name, A Thousand Feet Per Second, that belongs in a physics
                  textbook. The single is called “Let Down.” Forget the single.
                  Listen to the singing.
                </p>
                <p className="article-p">
                  The song is a schoolboy’s complaint. A young tenor wants
                  wings. “One day I am gonna grow wings,” he sings, “a chemical
                  reaction, hysterical and useless.” The words are thin. The
                  tune is thinner, two guitars running in a bright circle that
                  never quite arrives. None of it would matter if the voices
                  were not what they are.
                </p>
                <p className="article-p">
                  There are three singers. A high tenor. A second voice under
                  him. A girl with a low alto. On the verses they take turns,
                  polite enough. Then the chorus comes, “let down and hanging
                  around,” and all three open up at once.
                </p>
                <Subhead>The harmony</Subhead>
                <p className="article-p">
                  Here is what three voices can do that two cannot. The tenor
                  takes the top and will not come down. The second voice finds
                  the third below him and stays there, exact, no vibrato, no
                  showing off. The girl sings the root under both of them and
                  does not waver. The three notes lock into a chord so clean
                  it sounds machined. Then they move, all three together, up
                  a step, and the chord holds. It is the hardest thing in
                  singing. They do it like it costs them nothing.
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
                  “It is not pretty singing. It is three people refusing to be
                  quiet.”
                </p>
              </blockquote>

              <div
                className="gap-7 md:columns-2"
                style={{ columnRule: `1px solid ${INK}55` }}
              >
                <p className="article-p">
                  Mother Blues is a cold room in February. The voices warm it.
                  By the last chorus the three of them are singing at full
                  strength, throats wide open, and the guitars are just trying
                  to keep up. This is not pretty singing. It is better than
                  that. It is three people refusing to be quiet.
                </p>
                <Subhead>The verdict</Subhead>
                <p className="article-p">
                  The song will not last. The words about wings and chemistry
                  will date the way schoolboy physics dates. The singing is
                  the real article. It is the rare kind of harmony that cannot
                  be taught, only earned, by people who stand close together
                  night after night and breathe at the same time. Buy it for
                  the last ninety seconds. Play it loud.
                </p>
                <p
                  className="article-p font-[family-name:var(--font-franklin)] text-[0.68rem] uppercase"
                  style={{ letterSpacing: "0.2em", opacity: 0.75 }}
                >
                  - H. M. R.
                </p>
                <p
                  className="article-p text-center font-[family-name:var(--font-franklin)] text-[0.7rem] font-semibold"
                  style={{ letterSpacing: "0.34em", opacity: 0.8 }}
                >
                  - 30 -
                </p>
              </div>

              {/* the rest tore off with the clipping */}
              <div className="mt-6 border-t pt-5" style={{ borderColor: INK }}>
                <div
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 70%, 96% 79%, 92% 72%, 86% 81%, 80% 74%, 73% 83%, 66% 76%, 58% 85%, 51% 78%, 43% 87%, 36% 80%, 28% 89%, 21% 82%, 13% 90%, 6% 83%, 0 88%)",
                  }}
                >
                  <p
                    className="font-[family-name:var(--font-playfair)] font-extrabold leading-tight"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      color: INK,
                    }}
                  >
                    Weird F
                  </p>
                  <p
                    className="mt-2 font-[family-name:var(--font-body-serif)] italic"
                    style={{ fontSize: "1rem", color: "#3d362b" }}
                  >
                    Turn the record over and the water gets deeper.
                  </p>
                  <p className="article-p mt-3">
                    Three guitars playing a round, the way children sing,
                    except that the round never resolves and the
                  </p>
                </div>
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
                  Remember: 9 out of 10 forest fires are caused by people.
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

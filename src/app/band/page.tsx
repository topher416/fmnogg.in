import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import { getBandSession } from "@/lib/band-auth";
import {
  isAllYes,
  readAvailability,
  summarizeDate,
  type AvailabilityDoc,
} from "@/lib/band-availability";
import { BAND_MEMBERS } from "@/lib/band-members";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import BandLoginForm from "@/components/site/BandLoginForm";
import BandAvailabilityForm from "@/components/site/BandAvailabilityForm";
import BandAddPollForm from "@/components/site/BandAddPollForm";
import { logoutBand } from "./actions";

// Hidden band area: deliberately NOT in sitemap.ts, NOT linked from the
// header or footer, and noindexed here. The only way in is typing /band
// and entering a personal code.
export const metadata: Metadata = {
  title: `Band — ${BAND.name}`,
  description: `Private band area for ${BAND.name}: show-date availability.`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function answerLabel(v: string | undefined): string {
  if (v === "yes") return "Yes";
  if (v === "maybe") return "Maybe";
  if (v === "no") return "No";
  return "—";
}

function answerClass(v: string | undefined): string {
  if (v === "yes") return "text-emerald-300";
  if (v === "maybe") return "text-amber-300";
  if (v === "no") return "text-red-300";
  return "text-white/30";
}

function updatedLabel(ts: number): string {
  if (!ts) return "";
  try {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "America/Chicago",
    });
  } catch {
    return "";
  }
}

function PollSummary({
  doc,
  pollId,
}: {
  doc: AvailabilityDoc;
  pollId: string;
}) {
  const poll = doc.polls.find((p) => p.id === pollId);
  if (!poll) return null;
  const byMember = doc.answers[pollId] ?? {};
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/40">
            <th className="py-2 pr-3 font-medium">Member</th>
            {poll.dates.map((d) => {
              const s = summarizeDate(doc, pollId, d.id);
              return (
                <th key={d.id} className="py-2 pr-3 font-medium">
                  {d.label}
                  <span className="mt-0.5 block normal-case tracking-normal text-white/35">
                    {s.yes} yes · {s.maybe} maybe · {s.no} no
                    {isAllYes(doc, pollId, d.id) ? " · ALL YES" : ""}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {BAND_MEMBERS.map((m) => (
            <tr key={m.slug} className="border-b border-white/[0.05]">
              <td className="py-2 pr-3 text-[0.9rem] text-white/85">
                {m.name}
                <span className="block font-mono text-[0.65rem] text-white/35">
                  {m.role}
                </span>
              </td>
              {poll.dates.map((d) => {
                const a = byMember[m.slug]?.[d.id];
                return (
                  <td key={d.id} className="py-2 pr-3 align-top">
                    <span
                      className={`font-mono text-[0.85rem] ${answerClass(a?.value)}`}
                    >
                      {answerLabel(a?.value)}
                    </span>
                    {a?.note && (
                      <span className="block max-w-[22ch] text-[0.8rem] leading-snug text-white/50">
                        {a.note}
                      </span>
                    )}
                    {a && (
                      <span className="block font-mono text-[0.62rem] text-white/30">
                        {updatedLabel(a.updatedAt)}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {poll.dates.map((d) => {
        const s = summarizeDate(doc, pollId, d.id);
        if (s.missing.length === 0) return null;
        return (
          <p key={d.id} className="mt-2 font-mono text-[0.68rem] text-white/40">
            {d.label} — still to answer: {s.missing.join(", ")}
          </p>
        );
      })}
    </div>
  );
}

export default async function BandPage() {
  const member = await getBandSession();

  if (!member) {
    return (
      <div className="min-h-screen text-[#e8e2d9] flex flex-col">
        <SiteHeader crumbs={[{ label: "band" }]} />
        <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Band only
          </p>
          <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
            Band area
          </h1>
          <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
            Show-date availability and band votes. Enter your personal code —
            it identifies you, so your answers are recorded under your name.
          </p>
          <BandLoginForm />
        </main>
        <SiteFooter />
      </div>
    );
  }

  const doc = await readAvailability();

  return (
    <div className="min-h-screen text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "band" }]} />
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
              Band only
            </p>
            <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
              Hey, {member.name.split(" ")[0]}.
            </h1>
            <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
              Answer the date polls below. Every answer is saved under your
              name, with the date you changed it.
            </p>
          </div>
          <form action={logoutBand}>
            <button
              type="submit"
              className="border border-white/20 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/60 hover:border-white/50 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>

        {doc === null ? (
          <p className="mt-8 text-[0.95rem] text-white/55">
            The availability store isn&rsquo;t connected yet. Ask Topher to
            check the site setup.
          </p>
        ) : doc.polls.length === 0 ? (
          <>
            <p className="mt-8 text-[0.95rem] text-white/55">
              No dates up for a vote yet.
            </p>
            {member.admin && <BandAddPollForm />}
          </>
        ) : (
          <>
            {member.admin && <BandAddPollForm />}
            {doc.polls.map((poll) => (
              <section key={poll.id} className="mt-10">
                <h2 className="text-[1.25rem] font-bold leading-tight">
                  {poll.title}
                </h2>
                {poll.venue && (
                  <p className="mt-1 font-mono text-[0.72rem] text-white/45">
                    {poll.venue}
                  </p>
                )}
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
                  Your answers
                </p>
                <BandAvailabilityForm
                  poll={poll}
                  mine={doc.answers[poll.id]?.[member.slug] ?? {}}
                />
                <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
                  Everyone
                </p>
                <PollSummary doc={doc} pollId={poll.id} />
              </section>
            ))}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

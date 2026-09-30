import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: `Members — ${BAND.name}`,
  description: `The members of ${BAND.name}, a Radiohead cover project based in Chicago.`,
  alternates: { canonical: "/members" },
};

const MEMBERS: { name: string; role: string; bio: string | null }[] = [
  {
    name: "Peter Manis",
    role: "drums",
    bio: "Drummer for numerous Chicago bands over the last two decades — Mystery Train, Ember Days, Conspiracy Theories — and a regular in Great Moments in Vinyl tribute projects. The go-to drummer for Old Town School tribute shows: Elton John, Dylan, the Stones, Tom Petty.",
  },
  { name: "Eric Gorsack", role: "bass", bio: null },
  { name: "Jim Svagl", role: "electric guitar", bio: null },
  { name: "Jeff Mauricio", role: "electric guitar", bio: null },
  { name: "Drew Kelly", role: "vocals, electric guitar", bio: null },
  { name: "Topher Rasmussen", role: "acoustic, vocals", bio: null },
  { name: "Hannah Enenbach", role: "vocals", bio: null },
  {
    name: "Andrew Schneider",
    role: "keys",
    bio: "Chicago multi-instrumentalist writing and producing art rock, post-punk, chamber pop, jazz, and psychedelia under his own name. Inspired by XTC, Talking Heads, Joe Jackson, and David Bowie — artists who refuse to commit to a single sound.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "members" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <h1 className="text-[1.6rem] font-bold leading-tight tracking-tight">
          Members
        </h1>
        <p className="mt-1 font-mono text-[0.68rem] text-white/40">
          {MEMBERS.length} players · Chicago, IL
        </p>

        <ul className="mt-8 space-y-6">
          {MEMBERS.map((m) => (
            <li key={m.name} className="flex gap-4 sm:gap-5 items-start">
              {/* photo goes here */}
              <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 border border-white/10 bg-white/[0.02] flex items-center justify-center font-mono text-lg text-white/25 select-none">
                {initials(m.name)}
              </div>
              <div className="min-w-0 pt-1">
                <div className="text-[1.05rem] font-medium text-white/90">
                  {m.name}
                </div>
                <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/40">
                  {m.role}
                </div>
                {m.bio ? (
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-white/55 max-w-[42rem]">
                    {m.bio}
                  </p>
                ) : (
                  <p className="mt-2 font-mono text-[0.65rem] text-white/25">
                    bio coming soon
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter />
    </div>
  );
}

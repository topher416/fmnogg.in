import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: `Members — ${BAND.name}`,
  description: `The members of ${BAND.name}, a Radiohead cover project based in Chicago.`,
  alternates: { canonical: "/members" },
};

type MemberLink = { label: string; href: string };

const MEMBERS: {
  name: string;
  role: string;
  bio: string | null;
  photo: string;
  links?: MemberLink[];
}[] = [
  {
    name: "Hannah Enenbach",
    role: "vocals",
    bio: null,
    photo: "/images/members/hannah-enenbach-portrait.png",
    links: [{ label: "bandcamp", href: "https://hannahbackward.bandcamp.com" }],
  },
  {
    name: "Eric Gorscak",
    role: "bass",
    bio: "Eric plays bass in 1,000 Feet Per Second (Radiohead covers) and The Blue You Once Knew (Pink Floyd covers), both formed through Old Town School of Folk Music ensemble classes, where he also plays bass in the aptly-named Eclectic Electric Ensemble. He provides bass and occasional vocals for The Bliss Machine, a studio project of original music once described as \"Talking Heads and Rage Against the Machine at a Primus concert.\"",
    photo: "/images/members/eric-gorscak-portrait.png",
    links: [
      { label: "instagram", href: "https://instagram.com/blissmachine92" },
      { label: "the bliss machine", href: "https://www.theblissmachine.com/" },
      {
        label: "spotify",
        href: "https://open.spotify.com/artist/61ah4S257JAMWo56rMHd0T",
      },
    ],
  },
  {
    name: "Drew Kelly",
    role: "vocals, electric guitar",
    bio: null,
    photo: "/images/members/drew-kelly-portrait.png",
  },
  {
    name: "Peter Manis",
    role: "drums",
    bio: null,
    photo: "/images/members/peter-manis-portrait.png",
  },
  {
    name: "Jeff Mauricio",
    role: "electric guitar",
    bio: null,
    photo: "/images/members/jeff-mauricio-portrait.png",
  },
  {
    name: "Topher Rasmussen",
    role: "acoustic, vocals",
    bio: null,
    photo: "/images/members/topher-rasmussen-portrait.png",
    links: [
      { label: "website", href: "https://topherrasmussen.com" },
      { label: "bandcamp", href: "https://topherrasmussen.bandcamp.com" },
    ],
  },
  {
    name: "Andrew Schneider",
    role: "keys",
    bio: null,
    photo: "/images/members/andrew-schneider-portrait.png",
    links: [{ label: "bandcamp", href: "https://ahschneider.bandcamp.com" }],
  },
  {
    name: "Jim",
    role: "electric guitar",
    bio: null,
    photo: "/images/members/jim-portrait.png",
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
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 border border-white/10 object-cover"
                />
              ) : (
                <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 border border-white/10 bg-white/[0.02] flex items-center justify-center font-mono text-lg text-white/25 select-none">
                  {initials(m.name)}
                </div>
              )}
              <div className="min-w-0 pt-1">
                <div className="text-[1.05rem] font-medium text-white/90">
                  {m.name}
                </div>
                <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/40">
                  {m.role}
                </div>
                {m.links && m.links.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-3 font-mono text-[0.65rem] text-white/40">
                    {m.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 decoration-white/20 hover:text-white/70 transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
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

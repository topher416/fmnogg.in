// The eight band members. Slugs are stable identifiers used in the
// availability store; names here are already public on /members.

export interface BandMember {
  slug: string;
  name: string;
  role: string;
  /** Only Topher can add date polls. Everyone can answer their own. */
  admin: boolean;
}

export const BAND_MEMBERS: BandMember[] = [
  { slug: "topher-rasmussen", name: "Topher Rasmussen", role: "acoustic, vocals", admin: true },
  { slug: "hannah-enenbach", name: "Hannah Enenbach", role: "vocals", admin: false },
  { slug: "eric-gorscak", name: "Eric Gorscak", role: "bass", admin: false },
  { slug: "drew-kelly", name: "Drew Kelly", role: "vocals, electric guitar", admin: false },
  { slug: "peter-manis", name: "Peter Manis", role: "drums", admin: false },
  { slug: "jeff-mauricio", name: "Jeff Mauricio", role: "electric guitar", admin: false },
  { slug: "andrew-schneider", name: "Andrew Schneider", role: "keys", admin: false },
  { slug: "jim-svajgl", name: "Jim Svajgl", role: "electric guitar", admin: false },
];

export function getBandMember(slug: string): BandMember | null {
  return BAND_MEMBERS.find((m) => m.slug === slug) ?? null;
}

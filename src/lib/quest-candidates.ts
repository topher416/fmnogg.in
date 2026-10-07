import { ALBUMS } from "./discography";

// Pure candidate list (no server-only imports) so client components
// (quest admin editor) can use it too.

export interface QuestCandidate {
  album: string;
  albumSlug: string;
  title: string;
  slug: string;
}

/** Every not-yet-covered track across all albums, in album order. */
export function getQuestCandidates(): QuestCandidate[] {
  const out: QuestCandidate[] = [];
  for (const album of ALBUMS) {
    for (const track of album.tracks) {
      if (!track.covered) {
        out.push({
          album: album.name,
          albumSlug: album.slug,
          title: track.title,
          slug: track.slug,
        });
      }
    }
  }
  return out;
}

export function isQuestCandidate(slug: string): boolean {
  return getQuestCandidates().some((c) => c.slug === slug);
}

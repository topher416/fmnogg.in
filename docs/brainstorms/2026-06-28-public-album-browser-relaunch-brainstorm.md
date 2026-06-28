---
date: 2026-06-28
topic: public-album-browser-relaunch
---

# Public Album Browser Relaunch (A Thousand Feet Per Second)

## What We're Building

Reorient fmnogg.in from a band-member practice guide into a public-facing site for
**A Thousand Feet Per Second**, a project covering the Radiohead discography with an
emphasis on hidden gems and deep cuts. The site exists so people can look the band up
before the **July 17 show at Montrose Saloon**, get the "covering the whole discography"
mission immediately, and browse/share the 37 cover videos arranged by album.

The album browser becomes the landing page. Each track gets its own shareable URL so a
single video can be texted or posted and unfurl nicely. The existing practice guide is
preserved for band members at a subpath.

## Why This Approach

We considered keeping the current single client-component browser (`/radiohead`) and
faking per-track URLs with hashes. Rejected: with `output: 'export'` (static GitHub
Pages) that gives no real routes, no per-track Open Graph unfurling, and worse SEO —
which defeats the "look us up before the show / share a track" purpose.

Instead we decompose into SSG-native routes. `generateStaticParams` emits an album page
per album and a track page per covered track at build time. The video player and ambient
visualizer remain client components embedded inside otherwise-static pages.

## Key Decisions

- **Landing at root + vanity alias**: `/` is the band browser; `/onethousandfeetpersecond`
  resolves to the same content. People who type the bare domain get the band.
- **Canonical band name**: "One Thousand Feet Per Second" (slug `onethousandfeetpersecond`).
- **Album-nested track URLs**: `/[album]/[track]` (e.g. `/in-rainbows/nude`). Album pages
  at `/[album]` (e.g. `/ok-computer`). Readable, groups by album, mirrors the UX.
- **Practice guide moves to `/practice`**: current `page.tsx` (10-track set: stems,
  slowed practice tracks, performance notes) relocates intact for band-member use.
- **Show featured prominently**: hero on landing with July 17 / Montrose Saloon, plus the
  band blurb (poster asterisk text).
- **Full-discography framing**: show every studio album's complete tracklist; the 37
  covered tracks are vivid and link to their video page, uncovered tracks render dimmed
  ("not yet"). Requires entering full tracklists for all 9 albums and flagging covered.
- **Video-only public site**: drop audio-stem playback / progress bar from the public
  browser. Each track page shows the video (served from R2).
- **VizCanvas as ambient backdrop**: per-album visualizer self-animates idle on
  landing/album pages; no audio element required.
- **Per-track OG metadata**: `generateMetadata` per track route so shared links unfurl
  with title + album + a thumbnail.

## Resolved (2026-06-28)

- **Band name**: "One Thousand Feet Per Second" → vanity slug `onethousandfeetpersecond`.
- **OG thumbnails**: generate album-colored OG cards at build (album color gradient +
  track / album / band name). No external assets needed.
- **Covered set verified**: all 37 tracks confirmed present on R2 as `.mp4` (curl 200).
  Filename special-casing confirmed: "Weird Fishes / Arpeggi" → "Weird Fishes _ Arpeggi".
- **Poster blurb (final, verbatim)**: rendered exactly as below, trailing ellipsis
  intentional — it should trail off:
  > one thousand feet per second is a project focused on the sounds and stylings of
  > Radiohead, with a particular emphasis on hidden gems and deep cuts. Its members are
  > indebted to the Old Town School of Folk Music, whence it was borne…

## Open Questions

- **Discography scope**: 9 studio albums (Pablo Honey → A Moon Shaped Pool). Assumed no
  EPs / non-album tracks. (Full tracklists for these 9 to be compiled during build.)
- **Video-reactive viz**: deferred — could later feed the playing video's audio into the
  analyser on track pages (currently ambient only).

## Next Steps
→ `/workflows:plan` for implementation details (route structure, data model for full
  tracklists + covered flags, metadata, practice-guide move).

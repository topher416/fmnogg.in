---
title: Public Album Browser Relaunch — One Thousand Feet Per Second
type: feat
date: 2026-06-28
brainstorm: docs/brainstorms/2026-06-28-public-album-browser-relaunch-brainstorm.md
---

# ✨ Public Album Browser Relaunch — One Thousand Feet Per Second

## Overview

Reorient **fmnogg.in** from a private band-member practice guide into a public-facing
site for **One Thousand Feet Per Second**, a project covering the Radiohead discography
with an emphasis on hidden gems and deep cuts. The site's job: someone hears about the
**July 17 show at Montrose Saloon**, types the domain, immediately gets who the band is
and the "covering the whole discography" mission, and can browse/share the 37 cover
videos arranged by album.

The album browser becomes the landing page. Every covered track gets its own real,
shareable URL with a generated Open Graph card so a texted/posted link unfurls nicely.
The existing practice guide is preserved intact for band members at `/practice`.

## Problem Statement / Motivation

- The current root (`/`) is a band-member tool (audio stems, slowed practice tracks,
  performance notes) — not what a curious showgoer should land on.
- The browser at `/radiohead` is a single client component: no per-track URLs, so a
  specific cover **cannot be shared as a link**, and nothing unfurls when posted.
- `output: 'export'` (static GitHub Pages) means there are **no server redirects or
  rewrites** — every "page" must be a real statically generated file.
- The "whole discography" mission isn't legible: only the 37 covered tracks are listed,
  with no sense of the larger catalog being worked through.

## Proposed Solution

Decompose the monolithic `/radiohead` client component into SSG-native routes, driven by
a single shared discography data module. Each album and each covered track becomes a
statically generated page at build time. Video-only (no audio stems on the public side).
Per-album ambient visualizer as backdrop. Generated album-colored OG cards per track.

### Route map

```
/                              landing: show hero + blurb + full-discography browser
/onethousandfeetpersecond      vanity alias → renders the same landing (real page, no redirect)
/[album]                       album page: full tracklist (covered lit, rest dimmed), ambient viz
/[album]/[track]               shareable track page: inline video, prev/next, OG card
/practice                      existing band-member guide (moved from /), untouched in content
/radiohead                     REMOVED (logic absorbed into the routes above)
```

Example URLs: `/in-rainbows`, `/in-rainbows/nude`, `/ok-computer/karma-police`.

## Technical Approach

### Architecture

```
src/
  lib/
    discography.ts      ← single source of truth: albums, full tracklists, covered flags,
                          R2 video filenames, slugify + lookup helpers (server-importable)
  components/
    site/
      SiteHeader.tsx    ← band name (links /), nav, "/practice" link (client only if needed)
      ShowHero.tsx      ← July 17 Montrose Saloon + the trailing blurb (server)
      AlbumBrowser.tsx  ← full discography grid/list, covered lit / uncovered dimmed (server)
      AlbumTrackList.tsx← one album's tracklist; covered tracks link out (server)
      AmbientViz.tsx    ← thin client wrapper: <div id="vizStage"><VizCanvas …/></div>,
                          passes getFrequencyData={() => null}
      VideoPlayer.tsx   ← client: inline <video> from R2, poster, playsInline, controls
    VizCanvas.tsx       ← REUSED AS-IS (ambient modes already time-driven; no rewrite)
  app/
    layout.tsx          ← + metadataBase: https://fmnogg.in, rebrand default metadata
    page.tsx            ← NEW landing (was practice guide)
    onethousandfeetpersecond/page.tsx   ← re-exports landing
    [album]/page.tsx                    ← generateStaticParams over albums
    [album]/opengraph-image.tsx         ← album OG card (optional, nice-to-have)
    [album]/[track]/page.tsx            ← generateStaticParams over covered tracks
    [album]/[track]/opengraph-image.tsx ← generated album-colored OG card (primary share unit)
    practice/page.tsx   ← MOVED verbatim from old app/page.tsx
    sitemap.ts          ← enumerate / + album + track routes for discoverability
    not-found.tsx       ← branded 404
    radiohead/          ← DELETED
```

**Data flow:** `discography.ts` is a plain TS module (no `"use client"`), imported by the
server components, `generateStaticParams`, `generateMetadata`, and `opengraph-image`.
Interactive leaves (`VizCanvas`, `VideoPlayer`) stay client components embedded in
otherwise-static server pages.

### Data model (`src/lib/discography.ts`)

```ts
// src/lib/discography.ts
export interface Track {
  title: string;        // display title, e.g. "Weird Fishes / Arpeggi"
  slug: string;         // url segment within album, e.g. "weird-fishes-arpeggi"
  covered: boolean;     // true → has a video, gets a page; false → dimmed "not yet"
  video?: string;       // exact R2 basename WITHOUT extension for covered tracks,
                        // e.g. "Weird Fishes _ Arpeggi" (slash → " _ ")
}
export interface Album {
  name: string;         // "OK Computer"
  slug: string;         // "ok-computer"
  year: number;
  color: string; rgb: string; bg: string;  // theme (carried over from current ALBUMS)
  mode: string;         // VizCanvas mode for this album
  tracks: Track[];      // FULL studio tracklist, covered flags set
}
export const ALBUMS: Album[] = [ /* … */ ];

export function slugify(s: string): string;            // lowercase, strip punct, kebab
export function getAlbum(slug: string): Album | undefined;
export function getTrack(albumSlug: string, trackSlug: string): { album: Album; track: Track } | undefined;
export function coveredTracks(album: Album): Track[];   // album-ordered covered subset
export function r2Video(track: Track): string;          // R2_VIDEO + encodeURIComponent(video + ".mp4")
export const COUNTS = { albums: 9, covered: 37 };       // derived, for the mission line
```

**Filename mapping is explicit, not inferred.** Store the exact R2 basename in `video`
per covered track (verified all 37 return HTTP 200). Known special cases:
`Weird Fishes / Arpeggi → "Weird Fishes _ Arpeggi"`, plus parenthesized titles
(`Exit Music (For a Film)`, `Street Spirit (Fade Out)`, `A Punch Up at a Wedding`) which
already verified fine via URL-encoding. Note: the R2 file for Kid A's track is
`National Anthem.mp4` (not "The National Anthem").

**Uncovered tracks** carry `covered: false` and no `video`. They render dimmed and are
**not** passed to `generateStaticParams` — we do not generate ~85 empty pages. Directly
hitting an uncovered URL 404s on GitHub Pages, which is acceptable (no inbound links).

### The 37 covered tracks (existing, verified on R2)

Pablo Honey: Anyone Can Play Guitar.
The Bends: Planet Telex, My Iron Lung, The Bends, High and Dry, Just, Bones,
Street Spirit (Fade Out).
OK Computer: Airbag, Paranoid Android, Subterranean Homesick Alien,
Exit Music (For a Film), Let Down, Karma Police, Electioneering, Climbing Up the Walls,
Lucky, The Tourist, I Promise.
Kid A: Everything In Its Right Place, Idioteque, National Anthem.
Amnesiac: I Might Be Wrong, Knives Out.
Hail to the Thief: There There, A Punch Up at a Wedding, Myxomatosis.
In Rainbows: Bodysnatchers, Nude, Weird Fishes / Arpeggi, Reckoner, House of Cards,
Jigsaw Falling Into Place.
The King of Limbs: Lotus Flower, Give Up the Ghost.
A Moon Shaped Pool: Burn the Witch, Decks Dark.

**To compile during build:** the *full* studio tracklists for these 9 albums (~120 songs
total) so uncovered tracks render dimmed. Sourced from the standard album tracklists and
cross-checked; covered flags set against the list above.

### Static-export specifics (verified against Next.js docs)

- `generateStaticParams` + page `metadata`/`generateMetadata` are supported under
  `output: 'export'` (confirmed via Next `app-dir-export` test convention).
- File-based `opengraph-image.tsx` with `ImageResponse` from `next/og` is **statically
  optimized at build** — produces PNG files in `out/`, no runtime. Works on GitHub Pages.
- **`metadataBase: new URL('https://fmnogg.in')`** in root layout so OG/Twitter image
  URLs are absolute (crawlers require absolute URLs).
- No `basePath` needed — custom apex domain via `public/CNAME`.
- Consider `trailingSlash: true` in `next.config.ts` for safest static-host routing of
  nested `/[album]/[track]/` paths (validate during Phase 2; default may suffice).

### Visualizer (no rewrite needed)

`VizCanvas` already animates ambiently: `pulse/mountain/rain/crystals/drip/tree/moon` are
purely time-driven; `bars`/`ambient` have `freq ? … : Math.sin()` fallbacks. `AmbientViz`
wraps it in `<div id="vizStage">` (the size hook VizCanvas relies on) and passes
`getFrequencyData={() => null}`. One ambient stage per page (landing hero + album page).

### OG card design (`opengraph-image.tsx`, 1200×630)

Album-color gradient background, track title (Playfair/large), album · year, band name.
Uses album `color`/`rgb` from the data module. Default `next/og` font to start; optionally
load Geist/Playfair font data if we want brand type on the card.

## Implementation Phases

### Phase 1: Data foundation ✅
- [x] Create `src/lib/discography.ts`: types, full 9-album tracklists, covered flags,
  explicit `video` basenames for the 37, helpers, `R2_VIDEO`/`R2_AUDIO` consts.
- [x] Unit-sanity: build-time assertion that every `covered` track has a `video`.
- [x] Deliverable: importable data module; covered count === 37 (101 total tracks).

### Phase 2: Routing & pages ✅
- [x] Move current `app/page.tsx` → `app/practice/page.tsx` (verbatim; assets unaffected).
- [x] New `app/page.tsx` landing: `ShowHero` + `AlbumBrowser` + ambient backdrop (via `Landing`).
- [x] `app/onethousandfeetpersecond/page.tsx` renders the landing (canonical → `/`).
- [x] `app/[album]/page.tsx` + `generateStaticParams` (9 albums); full tracklist, covered lit.
- [x] `app/[album]/[track]/page.tsx` + `generateStaticParams` (37 covered); inline
  `VideoPlayer`, album context, prev/next among covered tracks, "back to album".
- [x] Build `SiteHeader`, `ShowHero`, `AlbumBrowser`, `AlbumTrackList`, `AmbientViz`,
  `VideoPlayer`, `SiteFooter`, `Landing`.
- [x] Delete `app/radiohead/`.
- [x] Deliverable: `npm run build` exports all 99 routes; links navigate; video src verified.

### Phase 3: Metadata, OG, SEO ✅
- [x] Root `layout.tsx`: `metadataBase`, rebrand default title/description/OG to the band.
- [x] `generateMetadata` per album + track page (title, description, canonical, OG/Twitter).
- [x] `app/[album]/[track]/opengraph-image.tsx` + `app/[album]/opengraph-image.tsx` (shared `ogCard`).
- [x] `app/sitemap.ts`, branded `app/not-found.tsx`.
- [x] **GitHub Pages fix**: `scripts/fix-og.mjs` (post-build) copies extensionless OG files
  to `.png` and rewrites meta refs, so cards serve as `image/png` (verified).
- [x] Deliverable: shared track link unfurls with title + generated album-colored card.

### Phase 4: Polish & verify ✅
- [x] Show hero copy (July 17 · Montrose Saloon) + trailing blurb (verbatim, ellipsis kept).
- [x] Responsive (mobile + desktop verified) + a11y (video aria-label, focus states).
- [x] Prev/next edge behavior (disabled at ends), branded 404, video glow in album color.
- [x] `/browse` QA on the static export: all routes 200, zero console errors, OG card +
  mobile/desktop screenshots reviewed.
- [x] Deliverable: ship-ready; deploys via existing GitHub Pages action on merge to `main`.

## Alternative Approaches Considered

- **Keep single client browser, hash-based track links** (`/#in-rainbows/nude`):
  rejected — no real URLs, no OG unfurl, poor SEO; defeats the share-before-the-show goal.
- **Pre-generate OG cards with a standalone satori/sharp build script**: viable fallback,
  but adds a dependency and a custom build step. Next's file-based `opengraph-image` is
  confirmed to work under export, so use it as primary; keep the script as a backup if
  the export build chokes on `next/og`.
- **Generate pages for all ~120 tracks** (covered + uncovered): rejected (YAGNI) — ~85
  empty "not yet" pages with no content or inbound links. Dim them on the album page only.

## Acceptance Criteria

### Functional
- [ ] `/` renders the public album browser with the July 17 show hero and trailing blurb.
- [ ] `/onethousandfeetpersecond` renders identical landing content.
- [ ] All 9 albums show their **full** tracklist; the 37 covered tracks are vivid and
      link to a track page; uncovered tracks are visibly dimmed and non-interactive.
- [ ] Each covered track has a page at `/[album]/[track]` that plays its R2 video inline.
- [ ] A track page link, when shared, unfurls with the track title + a generated
      album-colored OG card (absolute image URL).
- [ ] Prev/next navigates covered tracks within an album; "back to album" works.
- [ ] `/practice` serves the previous band-member guide unchanged (stems, slowed tracks,
      sheets, notes); its audio/sheet assets still resolve.
- [ ] `/radiohead` no longer exists.

### Non-Functional
- [ ] `npm run build` produces a clean static export (`out/`) with all routes + OG PNGs.
- [ ] No audio-stem playback on the public side (video only).
- [ ] Ambient visualizer animates without audio; correct per-album mode/color.
- [ ] Mobile-responsive; keyboard-accessible video + nav; dimmed tracks meet contrast.

### Quality Gates
- [ ] `npm run lint` passes.
- [ ] Build-time check: every `covered` track resolves to an existing R2 video.
- [ ] Deployed to GitHub Pages; spot-check a shared track URL unfurls.

## Success Metrics

- A bandmate can text a specific cover (e.g. `fmnogg.in/in-rainbows/nude`) and it unfurls.
- A first-time visitor understands the band + mission + show within one screen of `/`.

## Dependencies & Risks

- **`next/og` under static export** (low-med risk): docs confirm static optimization;
  mitigate with the satori/sharp build-script fallback if `next build` errors.
- **Full tracklist accuracy** (low risk): data entry for ~120 songs; cross-check covered
  flags against the verified 37 so the lit/dim split is correct.
- **R2 filename drift** (low risk): explicit `video` basenames + build-time existence
  check guard against mismatches.
- **Trailing-slash routing on GitHub Pages** (low risk): validate nested paths in Phase 2;
  set `trailingSlash: true` if needed.
- **Brand consistency**: "One Thousand Feet Per Second" everywhere; slug
  `onethousandfeetpersecond`; blurb verbatim with trailing ellipsis.

## Open Questions (non-blocking)

- Discography scope assumed = 9 studio albums (no EPs / standalone tracks). Proceeding so.
- Video-reactive viz on track pages (feed `<video>` audio into analyser) — deferred.
- OG card typography: default `next/og` font vs. loading Playfair — decide in Phase 3.

## References

- Brainstorm: `docs/brainstorms/2026-06-28-public-album-browser-relaunch-brainstorm.md`
- Current browser (to decompose): `src/app/radiohead/page.tsx`
- Visualizer (reused): `src/components/VizCanvas.tsx`
- Current practice guide (to move): `src/app/page.tsx`
- Layout / metadata: `src/app/layout.tsx:20`
- Static export config: `next.config.ts`; deploy: `.github/workflows/deploy.yml`
- Next.js: `generateStaticParams` + metadata + `opengraph-image` under `output: 'export'`
  (verified via context7 / Next `app-dir-export` test convention).

## Next Steps
→ `/workflows:work` to implement, starting Phase 1 (data foundation).

// Single source of truth for the One Thousand Feet Per Second discography browser.
// Plain module (no "use client") so it can be imported by server components,
// generateStaticParams, generateMetadata, and opengraph-image at build time.

export interface Track {
  /** Display title, e.g. "Weird Fishes / Arpeggi" */
  title: string;
  /** URL segment within the album, e.g. "weird-fishes-arpeggi" */
  slug: string;
  /** True → the band has covered it (has a video + a page). False → dimmed "not yet". */
  covered: boolean;
  /**
   * Exact R2 object basename (no extension) for covered tracks. Stored explicitly
   * rather than inferred because R2 filenames don't always match the display title
   * (e.g. "The National Anthem" → "National Anthem", slash → " _ "). Verified: all
   * 37 return HTTP 200.
   */
  video?: string;
}

export interface Album {
  name: string;
  slug: string;
  year: number;
  /** Hex accent for the album (titles, lit tracks). */
  color: string;
  /** "r,g,b" for rgba() usage in the visualizer/UI. */
  rgb: string;
  /** Near-black album-tinted page background. */
  bg: string;
  /** VizCanvas ambient mode for this album. */
  mode: string;
  /** Full studio tracklist, with covered flags set. */
  tracks: Track[];
}

export const R2_BASE = "https://pub-2aed276eaa394a1bb824300549e693cb.r2.dev";
export const R2_VIDEO = `${R2_BASE}/video/`;
export const R2_AUDIO = `${R2_BASE}/audio/`;

/** lowercase, strip punctuation, collapse to kebab-case. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper to declare a track. `covered` tracks carry their exact R2 basename;
// the slug is derived from the display title.
function t(title: string, covered: boolean, video?: string): Track {
  return { title, slug: slugify(title), covered, video };
}

export const ALBUMS: Album[] = [
  {
    name: "Pablo Honey",
    slug: "pablo-honey",
    year: 1993,
    color: "#D4A840",
    rgb: "212,168,64",
    bg: "#0a0905",
    mode: "ambient",
    tracks: [
      t("You", false),
      t("Creep", false),
      t("How Do You Do?", false),
      t("Stop Whispering", false),
      t("Thinking About You", false),
      t("Anyone Can Play Guitar", true, "Anyone Can Play Guitar"),
      t("Ripcord", false),
      t("Vegetable", false),
      t("Prove Yourself", false),
      t("I Can't", false),
      t("Lurgee", false),
      t("Blow Out", false),
    ],
  },
  {
    name: "The Bends",
    slug: "the-bends",
    year: 1995,
    color: "#C45050",
    rgb: "196,80,80",
    bg: "#0a0505",
    mode: "pulse",
    tracks: [
      t("Planet Telex", true, "Planet Telex"),
      t("The Bends", true, "The Bends"),
      t("High and Dry", true, "High and Dry"),
      t("Fake Plastic Trees", false),
      t("Bones", true, "Bones"),
      t("(Nice Dream)", false),
      t("Just", true, "Just"),
      t("My Iron Lung", true, "My Iron Lung"),
      t("Bullet Proof ... I Wish I Was", false),
      t("Black Star", false),
      t("Sulk", false),
      t("Street Spirit (Fade Out)", true, "Street Spirit (Fade Out)"),
    ],
  },
  {
    name: "OK Computer",
    slug: "ok-computer",
    year: 1997,
    color: "#6A8AB0",
    rgb: "106,138,176",
    bg: "#05080a",
    mode: "bars",
    tracks: [
      t("Airbag", true, "Airbag"),
      t("Paranoid Android", true, "Paranoid Android"),
      t("Subterranean Homesick Alien", true, "Subterranean Homesick Alien"),
      t("Exit Music (For a Film)", true, "Exit Music (For a Film)"),
      t("Let Down", true, "Let Down"),
      t("Karma Police", true, "Karma Police"),
      t("Fitter Happier", false),
      t("Electioneering", true, "Electioneering"),
      t("Climbing Up the Walls", true, "Climbing Up the Walls"),
      t("No Surprises", false),
      t("Lucky", true, "Lucky"),
      t("The Tourist", true, "The Tourist"),
      t("I Promise", true, "I Promise"),
    ],
  },
  {
    name: "Kid A",
    slug: "kid-a",
    year: 2000,
    color: "#D46A2A",
    rgb: "212,106,42",
    bg: "#0a0603",
    mode: "mountain",
    tracks: [
      t("Everything in Its Right Place", true, "Everything In Its Right Place"),
      t("Kid A", false),
      t("The National Anthem", true, "National Anthem"),
      t("How to Disappear Completely", false),
      t("Treefingers", false),
      t("Optimistic", false),
      t("In Limbo", false),
      t("Idioteque", true, "Idioteque"),
      t("Morning Bell", false),
      t("Motion Picture Soundtrack", false),
    ],
  },
  {
    name: "Amnesiac",
    slug: "amnesiac",
    year: 2001,
    color: "#C43020",
    rgb: "196,48,32",
    bg: "#0a0302",
    mode: "rain",
    tracks: [
      t("Packt Like Sardines in a Crushd Tin Box", false),
      t("Pyramid Song", false),
      t("Pulk / Pull Revolving Doors", false),
      t("You and Whose Army?", false),
      t("I Might Be Wrong", true, "I Might Be Wrong"),
      t("Knives Out", true, "Knives Out"),
      t("Morning Bell / Amnesiac", false),
      t("Dollars and Cents", false),
      t("Hunting Bears", false),
      t("Like Spinning Plates", false),
      t("Life in a Glasshouse", false),
    ],
  },
  {
    name: "Hail to the Thief",
    slug: "hail-to-the-thief",
    year: 2003,
    color: "#4A8AAA",
    rgb: "74,138,170",
    bg: "#05080a",
    mode: "crystals",
    tracks: [
      t("2 + 2 = 5", false),
      t("Sit Down. Stand Up.", false),
      t("Sail to the Moon", false),
      t("Backdrifts", false),
      t("Go to Sleep", false),
      t("Where I End and You Begin", false),
      t("We Suck Young Blood", false),
      t("The Gloaming", false),
      t("There There", true, "There There"),
      t("I Will", false),
      t("A Punch Up at a Wedding", true, "A Punch Up at a Wedding"),
      t("Myxomatosis", true, "Myxomatosis"),
      t("Scatterbrain", false),
      t("A Wolf at the Door", false),
    ],
  },
  {
    name: "In Rainbows",
    slug: "in-rainbows",
    year: 2007,
    color: "#E86445",
    rgb: "232,100,69",
    bg: "#0a0603",
    mode: "drip",
    tracks: [
      t("15 Step", false),
      t("Bodysnatchers", true, "Bodysnatchers"),
      t("Nude", true, "Nude"),
      t("Weird Fishes / Arpeggi", true, "Weird Fishes _ Arpeggi"),
      t("All I Need", false),
      t("Faust Arp", false),
      t("Reckoner", true, "Reckoner"),
      t("House of Cards", true, "House of Cards"),
      t("Jigsaw Falling Into Place", true, "Jigsaw Falling Into Place"),
      t("Videotape", false),
    ],
  },
  {
    name: "The King of Limbs",
    slug: "the-king-of-limbs",
    year: 2011,
    color: "#8AAA5A",
    rgb: "138,170,90",
    bg: "#060a03",
    mode: "tree",
    tracks: [
      t("Bloom", false),
      t("Morning Mr Magpie", false),
      t("Little by Little", false),
      t("Feral", false),
      t("Lotus Flower", true, "Lotus Flower"),
      t("Codex", false),
      t("Give Up the Ghost", true, "Give Up the Ghost"),
      t("Separator", false),
    ],
  },
  {
    name: "A Moon Shaped Pool",
    slug: "a-moon-shaped-pool",
    year: 2016,
    color: "#8AA0C0",
    rgb: "138,160,192",
    bg: "#05050a",
    mode: "moon",
    tracks: [
      t("Burn the Witch", true, "Burn the Witch"),
      t("Daydreaming", false),
      t("Decks Dark", true, "Decks Dark"),
      t("Desert Island Disk", false),
      t("Ful Stop", false),
      t("Glass Eyes", false),
      t("Identikit", false),
      t("The Numbers", false),
      t("Present Tense", false),
      t("Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief", false),
      t("True Love Waits", false),
    ],
  },
];

export function getAlbum(slug: string): Album | undefined {
  return ALBUMS.find((a) => a.slug === slug);
}

export function coveredTracks(album: Album): Track[] {
  return album.tracks.filter((tr) => tr.covered);
}

export function getTrack(
  albumSlug: string,
  trackSlug: string
): { album: Album; track: Track } | undefined {
  const album = getAlbum(albumSlug);
  if (!album) return undefined;
  const track = album.tracks.find((tr) => tr.slug === trackSlug && tr.covered);
  if (!track) return undefined;
  return { album, track };
}

/** Full R2 URL for a covered track's video. */
export function r2Video(track: Track): string {
  return R2_VIDEO + encodeURIComponent((track.video ?? track.title) + ".mp4");
}

const allCovered = ALBUMS.flatMap(coveredTracks);

export const COUNTS = {
  albums: ALBUMS.length,
  covered: allCovered.length,
};

// Build-time sanity: every covered track must carry an explicit R2 basename.
// Throws during `next build` if data drifts, instead of shipping a broken link.
const missingVideo = allCovered.filter((tr) => !tr.video);
if (missingVideo.length > 0) {
  throw new Error(
    `discography: covered tracks missing R2 video basename: ${missingVideo
      .map((tr) => tr.title)
      .join(", ")}`
  );
}

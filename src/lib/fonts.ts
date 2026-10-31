import localFont from "next/font/local";

/**
 * Self-hosted fonts (variable woff2, latin subset, from Google Fonts).
 *
 * These used to load through next/font/google, whose Turbopack loader
 * intermittently failed production builds ("Module not found" for the
 * google font module, e.g. the Libre Franklin failure on 2026-10-30/31).
 * Vendoring the files and loading them with next/font/local removes the
 * build-time Google Fonts fetch and that loader path entirely.
 * All five families are SIL Open Font License 1.1.
 */

export const geistSans = localFont({
  src: "../fonts/geist.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const playfair = localFont({
  src: "../fonts/playfair-display.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  display: "swap",
});

export const franklin = localFont({
  src: "../fonts/libre-franklin.woff2",
  variable: "--font-franklin",
  weight: "100 900",
  display: "swap",
});

export const bodySerif = localFont({
  src: [
    { path: "../fonts/source-serif-4.woff2", weight: "200 900", style: "normal" },
    { path: "../fonts/source-serif-4-italic.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-body-serif",
  display: "swap",
});

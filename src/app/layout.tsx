import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const BAND_NAME = "A Thousand Feet Per Second";
const TAGLINE =
  "A Thousand Feet Per Second — a Radiohead cover project based in Chicago.";

export const metadata: Metadata = {
  metadataBase: new URL("https://athousandfeetpersecond.com"),
  title: {
    default: BAND_NAME,
    template: `%s`,
  },
  description: TAGLINE,
  openGraph: {
    title: BAND_NAME,
    description: TAGLINE,
    siteName: BAND_NAME,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: BAND_NAME,
    description: TAGLINE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#0a0a0a]`}
      >
        <img
          src="/mascot.png"
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none fixed -right-[12vmin] top-1/2 z-0 w-[52vmin] -translate-y-1/2 opacity-[0.11] select-none"
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

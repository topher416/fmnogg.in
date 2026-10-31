import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { geistMono, geistSans, playfair } from "@/lib/fonts";

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}


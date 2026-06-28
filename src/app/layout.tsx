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

const BAND_NAME = "One Thousand Feet Per Second";
const TAGLINE =
  "A project covering the Radiohead discography — hidden gems and deep cuts. Live at Montrose Saloon, July 17.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fmnogg.in"),
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
      </body>
    </html>
  );
}

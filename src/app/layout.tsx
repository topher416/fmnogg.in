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
  axes: ["wght"],
});

export const metadata: Metadata = {
  title: "FM NOGGIN",
  description: "Deep cuts. Moody atmospheres. No hits. No safety.",
  openGraph: {
    title: "FM NOGGIN",
    description: "Deep cuts. Moody atmospheres. No hits. No safety.",
    siteName: "FM NOGGIN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FM NOGGIN",
    description: "Deep cuts. Moody atmospheres. No hits. No safety.",
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

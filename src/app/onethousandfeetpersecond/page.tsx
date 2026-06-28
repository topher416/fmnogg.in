import type { Metadata } from "next";
import Landing from "@/components/site/Landing";

// Vanity alias. Static export has no server redirects, so this renders the same
// landing content at a memorable URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function VanityLandingPage() {
  return <Landing />;
}

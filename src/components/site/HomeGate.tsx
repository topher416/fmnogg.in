"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SHOW } from "@/lib/site";

/**
 * Homepage gate: renders `before` until the show starts, then `live`.
 * Both branches are server-rendered; this only picks which one shows.
 * `?live` in the URL forces the show-night version (previewing).
 */
export default function HomeGate({
  before,
  live,
}: {
  before: ReactNode;
  live: ReactNode;
}) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("live")) {
      setIsLive(true);
      return;
    }
    const target = new Date(SHOW.startsAt).getTime();
    const check = () => setIsLive(Date.now() >= target);
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  return <>{isLive ? live : before}</>;
}

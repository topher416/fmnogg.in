"use client";

import { useEffect, useState } from "react";
import { SHOW } from "@/lib/site";

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Live countdown to doors. Flat numbers, no narration. */
export default function Countdown() {
  const [remain, setRemain] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(SHOW.startsAt).getTime();
    const tick = () => setRemain(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remain === null) return null;
  const p = parts(remain);

  const units: Array<[string, string]> = [
    [String(p.days), p.days === 1 ? "day" : "days"],
    [pad(p.hours), "hrs"],
    [pad(p.minutes), "min"],
    [pad(p.seconds), "sec"],
  ];

  return (
    <section aria-label="Countdown to the show" className="border-b border-white/[0.06] py-8">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Until 8pm
      </p>
      <div className="mt-3 flex items-baseline gap-5 sm:gap-8">
        {units.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className="font-mono text-[2rem] leading-none tabular-nums text-white/90 sm:text-[2.6rem]">
              {value}
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

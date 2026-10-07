"use client";

import { useState } from "react";
import type { Subscriber } from "./actions";

/** Copy-all + CSV download buttons for the subscriber list. */
export default function AdminActions({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(
        subscribers.map((s) => s.email).join("\n")
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; the list below is selectable by hand
    }
  };

  const downloadCsv = () => {
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv =
      "email,venue,src\n" +
      subscribers
        .map((s) => `${esc(s.email)},${esc(s.venue ?? "")},${esc(s.src ?? "")}`)
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "show-alerts-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={copyAll}
        className="border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
      >
        {copied ? "Copied" : "Copy all"}
      </button>
      <button
        onClick={downloadCsv}
        className="border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
      >
        Download CSV
      </button>
    </div>
  );
}

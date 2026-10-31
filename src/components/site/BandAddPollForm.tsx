"use client";

import { useState } from "react";
import { addPoll } from "@/app/band/actions";

/** Admin only (Topher): post a new set of candidate dates for a vote. */
export default function BandAddPollForm() {
  const [dates, setDates] = useState<string[]>([""]);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    const fd = new FormData(e.currentTarget);
    const result = await addPoll(fd);
    setBusy(false);
    if (result.ok) {
      setStatus("Added — everyone can answer now.");
      setDates([""]);
      e.currentTarget.reset();
    } else {
      setStatus("Couldn't add that. Check the title and dates and try again.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 border border-white/10 px-4 py-4">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
        Add dates for a vote
      </p>
      <input
        type="text"
        name="title"
        required
        maxLength={120}
        placeholder="e.g. December — Color Club"
        className="mt-3 w-full border border-white/20 bg-transparent px-3 py-2 text-[0.9rem] text-white/85 placeholder:text-white/25 focus:border-white/60 focus:outline-none"
      />
      <input
        type="text"
        name="venue"
        maxLength={120}
        placeholder="Venue (optional)"
        className="mt-2 w-full border border-white/20 bg-transparent px-3 py-2 text-[0.9rem] text-white/85 placeholder:text-white/25 focus:border-white/60 focus:outline-none"
      />
      <div className="mt-3 space-y-2">
        {dates.map((d, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="date"
              name="date"
              value={d}
              onChange={(e) =>
                setDates((prev) =>
                  prev.map((v, j) => (j === i ? e.target.value : v))
                )
              }
              className="flex-1 border border-white/20 bg-transparent px-3 py-2 font-mono text-[0.85rem] text-white/85 focus:border-white/60 focus:outline-none [color-scheme:dark]"
            />
            {dates.length > 1 && (
              <button
                type="button"
                aria-label="Remove date"
                onClick={() =>
                  setDates((prev) => prev.filter((_, j) => j !== i))
                }
                className="border border-white/20 px-3 text-white/60 hover:border-white/50 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setDates((prev) => [...prev, ""])}
          className="border border-white/20 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/60 hover:border-white/50 hover:text-white"
        >
          + Add a date
        </button>
        <button
          type="submit"
          disabled={busy}
          className="border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-40"
        >
          {busy ? "Adding…" : "Post poll"}
        </button>
        {status && (
          <span className="font-mono text-[0.7rem] text-white/50">{status}</span>
        )}
      </div>
    </form>
  );
}

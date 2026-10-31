"use client";

import { useState } from "react";
import { saveAvailability } from "@/app/band/actions";
import type {
  AnswerValue,
  AvailabilityPoll,
  MemberAnswer,
} from "@/lib/band-availability";

const OPTIONS: { value: AnswerValue; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
];

/** The logged-in member's own answers for one poll. Everyone else's
 *  answers are shown read-only in the summary below this form. */
export default function BandAvailabilityForm({
  poll,
  mine,
}: {
  poll: AvailabilityPoll;
  mine: MemberAnswer;
}) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue | "">>(() =>
    Object.fromEntries(poll.dates.map((d) => [d.id, mine[d.id]?.value ?? ""]))
  );
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(poll.dates.map((d) => [d.id, mine[d.id]?.note ?? ""]))
  );
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    const fd = new FormData(e.currentTarget);
    const result = await saveAvailability(fd);
    setBusy(false);
    setStatus(result.ok ? "Saved." : "Couldn't save — try again.");
  }

  return (
    <form onSubmit={submit} className="mt-4">
      <input type="hidden" name="pollId" value={poll.id} />
      <div className="space-y-4">
        {poll.dates.map((d) => (
          <div key={d.id} className="border border-white/10 px-3 py-3">
            <p className="font-mono text-[0.85rem] text-white/85">{d.label}</p>
            <div className="mt-2 flex gap-2" role="group" aria-label={d.label}>
              {OPTIONS.map((opt) => {
                const selected = answers[d.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [d.id]: selected ? "" : opt.value,
                      }))
                    }
                    className={`flex-1 border px-2 py-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] transition-colors ${
                      selected
                        ? opt.value === "yes"
                          ? "border-emerald-400/70 bg-emerald-400/15 text-emerald-200"
                          : opt.value === "maybe"
                            ? "border-amber-400/70 bg-amber-400/15 text-amber-200"
                            : "border-red-400/70 bg-red-400/15 text-red-200"
                        : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {/* The selected value travels in a hidden field; tapping a
                button twice clears it back to no answer. */}
            <input type="hidden" name={`answer-${d.id}`} value={answers[d.id]} />
            <input
              type="text"
              name={`note-${d.id}`}
              value={notes[d.id]}
              onChange={(e) =>
                setNotes((prev) => ({ ...prev, [d.id]: e.target.value }))
              }
              maxLength={200}
              placeholder="Note for this date (optional)"
              className="mt-2 w-full border border-white/10 bg-transparent px-2 py-2 text-[0.85rem] text-white/75 placeholder:text-white/25 focus:border-white/40 focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-40"
        >
          {busy ? "Saving…" : "Save my answers"}
        </button>
        {status && (
          <span className="font-mono text-[0.7rem] text-white/50">{status}</span>
        )}
      </div>
    </form>
  );
}

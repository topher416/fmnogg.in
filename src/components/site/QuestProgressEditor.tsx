"use client";

import { useEffect, useState } from "react";
import { getQuestProgressAdmin, saveQuestProgressAdmin } from "@/app/alerts/admin/actions";
import {
  getQuestCandidates,
  type QuestCandidate,
} from "@/lib/quest-candidates";

/** Admin editor for the song quest's learning progress (0-100 per song). */
export default function QuestProgressEditor({
  password,
}: {
  password: string;
}) {
  const [candidates] = useState<QuestCandidate[]>(() => getQuestCandidates());
  const [progress, setProgress] = useState<Record<string, number> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getQuestProgressAdmin(password).then((r) => {
      if (r.ok) setProgress(r.progress ?? {});
    });
  }, [password]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const result = await saveQuestProgressAdmin(
      password,
      new FormData(e.currentTarget)
    );
    setSaving(false);
    setSaved(result.ok);
    if (result.ok) setTimeout(() => setSaved(false), 2500);
  };

  const groups: { album: string; songs: QuestCandidate[] }[] = [];
  for (const c of candidates) {
    const last = groups[groups.length - 1];
    if (last && last.album === c.album) last.songs.push(c);
    else groups.push({ album: c.album, songs: [c] });
  }

  return (
    <section aria-label="Song quest progress" className="mt-12">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Song quest
      </p>
      <h2 className="mt-2 text-[1.25rem] font-bold tracking-tight">
        Learning progress
      </h2>
      <p className="mt-2 max-w-[60ch] text-[0.9rem] leading-relaxed text-white/55">
        0–100 per song, shown publicly on{" "}
        <a
          href="/quest"
          className="underline underline-offset-2 decoration-white/25"
        >
          /quest
        </a>
        . Blank = not started.
      </p>

      {progress === null ? (
        <p className="mt-4 font-mono text-[0.72rem] text-white/30">Loading…</p>
      ) : (
        <form onSubmit={submit} className="mt-6">
          {groups.map((g) => (
            <div key={g.album} className="mt-6">
              <h3 className="text-[0.95rem] font-semibold text-white/80">
                {g.album}
              </h3>
              <ul className="mt-2 divide-y divide-white/[0.05] border-t border-white/[0.06]">
                {g.songs.map((s) => (
                  <li
                    key={s.slug}
                    className="flex items-center justify-between gap-4 py-1.5"
                  >
                    <span className="text-[0.88rem] text-white/70">
                      {s.title}
                    </span>
                    <input
                      type="number"
                      name={`p-${s.slug}`}
                      defaultValue={progress[s.slug] ?? ""}
                      min={0}
                      max={100}
                      step={5}
                      placeholder="—"
                      aria-label={`${s.title} progress percent`}
                      className="w-20 border border-white/15 bg-white/[0.03] px-2 py-1 font-mono text-[0.8rem] text-white/85 placeholder:text-white/25 outline-none focus:border-white/40"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            type="submit"
            disabled={saving}
            className="mt-6 border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-40"
          >
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save progress"}
          </button>
        </form>
      )}
    </section>
  );
}

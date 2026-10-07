"use client";

import { useState } from "react";
import type { QuestSong } from "@/lib/song-quest";

interface AlbumGroup {
  album: string;
  albumSlug: string;
  songs: QuestSong[];
}

const MESSAGES: Record<string, string> = {
  invalid_email: "That email doesn't look right — try again?",
  invalid_song: "That song isn't on the board.",
  already_voted: "You already voted for this one.",
  rate_limited: "Too many votes — give it a bit and try again.",
  not_configured: "Voting isn't switched on yet. Check back soon.",
  server_error: "Something went wrong on our end. Try again in a bit.",
};

function ProgressBar({ progress }: { progress: number | null }) {
  if (progress === null || progress === 0) {
    return (
      <span className="font-mono text-[0.68rem] text-white/30">not started</span>
    );
  }
  if (progress >= 100) {
    return (
      <span className="border border-[#00ff9f]/30 bg-[#00ff9f]/[0.06] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#00ff9f]/90">
        ★ learned
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block h-1.5 w-20 overflow-hidden bg-white/10">
        <span
          className="block h-full bg-[#00ff9f]/70"
          style={{ width: `${progress}%` }}
        />
      </span>
      <span className="font-mono text-[0.68rem] tabular-nums text-white/45">
        {progress}%
      </span>
    </span>
  );
}

export default function QuestBoard({ groups }: { groups: AlbumGroup[] }) {
  const [email, setEmail] = useState("");
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const vote = async (slug: string) => {
    if (voted[slug]) return;
    if (!email.trim()) {
      setNotice("Enter your email above first — then vote.");
      return;
    }
    setBusy(slug);
    setNotice("");
    try {
      const res = await fetch("/api/quest/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, song: slug, website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setVoted((v) => ({ ...v, [slug]: true }));
        setCounts((c) => ({ ...c, [slug]: (c[slug] ?? 0) + 1 }));
        if (data.subscribed) {
          setNotice("Vote counted — and you're on the show-alerts list.");
        }
      } else if (res.status === 409) {
        setVoted((v) => ({ ...v, [slug]: true }));
        setNotice(MESSAGES.already_voted);
      } else {
        setNotice(MESSAGES[data.error] ?? MESSAGES.server_error);
      }
    } catch {
      setNotice(MESSAGES.server_error);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mt-10">
      <label
        htmlFor="quest-email"
        className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35"
      >
        Your email
      </label>
      <input
        id="quest-email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full max-w-[420px] border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[0.95rem] text-white/90 placeholder:text-white/25 outline-none focus:border-white/40"
      />
      {notice ? (
        <p className="mt-3 text-[0.85rem] text-white/70">{notice}</p>
      ) : null}

      {groups.map((g) => (
        <section
          key={g.albumSlug}
          id={`album-${g.albumSlug}`}
          aria-label={g.album}
          className="mt-10 scroll-mt-6"
        >
          <h2 className="text-[1.15rem] font-semibold tracking-tight text-white/90">
            {g.album}
          </h2>
          <ol className="mt-3 divide-y divide-white/[0.05] border-t border-white/[0.06]">
            {g.songs.map((s) => {
              const hasVoted = !!voted[s.slug];
              const count = s.votes + (counts[s.slug] ?? 0);
              return (
                <li
                  key={s.slug}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5"
                >
                  <span className="min-w-0 flex-1 text-[0.95rem] text-white/85">
                    {s.title}
                  </span>
                  <span className="flex items-center gap-4">
                    <ProgressBar progress={s.progress} />
                    <span className="font-mono text-[0.78rem] tabular-nums text-white/45">
                      {count} vote{count === 1 ? "" : "s"}
                    </span>
                    <button
                      type="button"
                      onClick={() => vote(s.slug)}
                      disabled={hasVoted || busy === s.slug}
                      className="shrink-0 border border-white/25 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:cursor-default disabled:opacity-40"
                    >
                      {hasVoted ? "✓ voted" : busy === s.slug ? "…" : "Vote"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

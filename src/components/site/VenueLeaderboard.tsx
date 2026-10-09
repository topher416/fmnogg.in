import { getVenueLeaderboard, PITCH_THRESHOLD } from "@/lib/venue-votes";

/** Public "Wanted at" leaderboard: which bars fans voted for, ranked. */
export default async function VenueLeaderboard({ limit }: { limit?: number }) {
  const full = await getVenueLeaderboard();
  const board = full && limit ? full.slice(0, limit) : full;
  if (board === null) return null;

  return (
    <section id="wanted" className="mt-14 max-w-[560px]">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
        Wanted at
      </p>
      <h2 className="mt-2 text-[1.25rem] font-bold leading-tight tracking-tight">
        Where should we play next?
      </h2>
      <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
        Vote in the form above. When a bar hits {PITCH_THRESHOLD} votes, we
        email its booker with this list.
      </p>

      {board.length === 0 ? (
        <p className="mt-6 text-[0.95rem] text-white/45">
          No votes yet — yours could be the first.
        </p>
      ) : (
        <ol className="mt-6 divide-y divide-white/[0.05] border-t border-white/[0.06]">
          {board.map((entry, i) => (
            <li
              key={entry.key}
              className="flex items-baseline justify-between gap-4 py-2.5"
            >
              <span className="text-[0.95rem] text-white/85">
                <span className="mr-3 font-mono text-[0.72rem] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {entry.display}
                {entry.pitchReady ? (
                  <span className="ml-3 border border-[#00ff9f]/30 bg-[#00ff9f]/[0.06] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#00ff9f]/90">
                    ★ pitch-ready
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 font-mono text-[0.78rem] text-white/50">
                {entry.count} vote{entry.count === 1 ? "" : "s"}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

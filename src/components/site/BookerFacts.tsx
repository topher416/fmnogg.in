import { getSubscriberCount } from "@/lib/list-stats";
import { getVenueLeaderboard } from "@/lib/venue-votes";

/** Live facts for the one-screen booker pitch on /press. */
export default async function BookerFacts() {
  const [count, board] = await Promise.all([
    getSubscriberCount(),
    getVenueLeaderboard(),
  ]);
  const top = (board ?? []).slice(0, 3);

  return (
    <div>
      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Draw
          </dt>
          <dd className="mt-1 text-[1.05rem] text-white/85">
            26–32 paid{" "}
            <span className="text-[0.85rem] text-white/40">
              — last two Montrose Saloon shows
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Format
          </dt>
          <dd className="mt-1 text-[1.05rem] text-white/85">
            8-piece{" "}
            <span className="text-[0.85rem] text-white/40">
              — deep cuts + full-album sets
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Mailing list
          </dt>
          <dd className="mt-1 text-[1.05rem] text-white/85">
            {count === null ? (
              "—"
            ) : (
              <>
                {count} subscriber{count === 1 ? "" : "s"}{" "}
                <span className="text-[0.85rem] text-white/40">
                  — one email per show
                </span>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
            Wanted at
          </dt>
          <dd className="mt-1 text-[1.05rem] text-white/85">
            {top.length === 0 ? (
              <span className="text-white/40">No votes yet</span>
            ) : (
              top.map((e, i) => (
                <span key={e.key}>
                  {i > 0 ? ", " : ""}
                  {e.display}{" "}
                  <span className="font-mono text-[0.78rem] text-white/40">
                    ({e.count})
                  </span>
                </span>
              ))
            )}{" "}
            <a
              href="/alerts#wanted"
              className="text-[0.85rem] underline underline-offset-2 decoration-white/25 text-white/50 hover:text-white/80 transition-colors"
            >
              leaderboard
            </a>
          </dd>
        </div>
      </dl>
      <p className="mt-6 font-mono text-[0.68rem] leading-relaxed text-white/40">
        Past shows with setlists:{" "}
        <a
          href="/shows"
          className="underline underline-offset-2 decoration-white/25 hover:text-white/80 transition-colors"
        >
          /shows
        </a>
        {" · "}Booking:{" "}
        <a
          href="/members"
          className="underline underline-offset-2 decoration-white/25 hover:text-white/80 transition-colors"
        >
          find any member
        </a>
      </p>
    </div>
  );
}

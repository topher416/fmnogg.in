"use client";

import { useState } from "react";
import { unlockAdmin, type Subscriber } from "./actions";
import AdminActions from "./AdminActions";

/** Password gate: visitor enters a password, list unlocks only on match. */
export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[] | null | undefined>(
    undefined
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const result = await unlockAdmin(password);
    setLoading(false);
    if (result.ok) {
      setSubscribers(result.subscribers);
    } else {
      setError(true);
    }
  };

  if (subscribers !== undefined) {
    if (subscribers === null) {
      return (
        <p className="mt-4 text-[0.95rem] text-white/55">
          The signup store isn&rsquo;t connected yet.
        </p>
      );
    }
    return (
      <div className="mt-6">
        <p className="font-mono text-[0.72rem] text-white/45">
          {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"}
        </p>
        {subscribers.length > 0 ? (
          <>
            <AdminActions subscribers={subscribers} />
            <ul className="mt-6 divide-y divide-white/[0.05] border-t border-white/[0.06]">
              {subscribers.map((s) => (
                <li
                  key={s.email}
                  className="flex items-baseline justify-between gap-4 py-2 font-mono text-[0.8rem] text-white/70 select-all"
                >
                  <span>{s.email}</span>
                  {s.venue ? (
                    <span className="shrink-0 text-white/35">{s.venue}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 text-[0.95rem] text-white/55">
            No signups yet. The form is live on{" "}
            <a
              href="/alerts"
              className="underline underline-offset-2 decoration-white/25"
            >
              /alerts
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-[320px]">
      <label
        htmlFor="admin-password"
        className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45"
      >
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        className="mt-2 w-full border border-white/20 bg-transparent px-3 py-2 font-mono text-[0.85rem] text-white/85 placeholder:text-white/25 focus:border-white/60 focus:outline-none"
      />
      {error && (
        <p className="mt-2 font-mono text-[0.7rem] text-red-400/80">
          Wrong password.
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="mt-3 border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-40"
      >
        {loading ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}

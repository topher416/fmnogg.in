"use client";

import { useState } from "react";
import { loginBand } from "@/app/band/actions";

/** One field, one button. No signup, no email, no reset flow. */
export default function BandLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setError(null);
    const result = await loginBand(formData);
    setBusy(false);
    if (!result.ok) {
      setError(
        result.error === "rate_limited"
          ? "Too many tries — wait a bit and try again."
          : result.error === "not_configured"
            ? "Band login isn't set up yet. Ask Topher."
            : "That code didn't match. Check it and try again."
      );
    }
  }

  return (
    <form action={submit} className="mt-6 max-w-[340px]">
      <label
        htmlFor="band-code"
        className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45"
      >
        Your band code
      </label>
      <input
        id="band-code"
        name="code"
        type="password"
        autoComplete="current-password"
        autoFocus
        placeholder="e.g. maple-river-4821"
        className="mt-2 w-full border border-white/20 bg-transparent px-3 py-3 font-mono text-[0.95rem] text-white/85 placeholder:text-white/25 focus:border-white/60 focus:outline-none"
      />
      {error && (
        <p className="mt-2 font-mono text-[0.7rem] text-red-400/80">{error}</p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="mt-3 border border-white/25 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:opacity-40"
      >
        {busy ? "Checking…" : "I'm in"}
      </button>
      <p className="mt-3 text-[0.85rem] leading-relaxed text-white/45">
        One code per member, sent to you directly. It stays signed in on this
        phone, so you only type it once.
      </p>
    </form>
  );
}

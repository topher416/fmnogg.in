"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

const MESSAGES: Record<string, string> = {
  invalid_email: "That email doesn't look right — try again?",
  already_subscribed: "You're already on the list. See you at the show.",
  rate_limited: "Too many tries — give it a bit and try again.",
  not_configured: "Signups aren't switched on yet. Check back soon.",
  server_error: "Something went wrong on our end. Try again in a bit.",
};

export default function AlertForm() {
  const [email, setEmail] = useState("");
  const [venue, setVenue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || status === "done") return;
    setStatus("sending");
    setMessage("");
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, venue }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        setMessage(
          typeof data.venue === "string" && data.venue
            ? `You're on the list — vote counted for ${data.venue}.`
            : "You're on the list. One email per show, nothing else."
        );
      } else if (res.status === 409) {
        setStatus("done");
        setMessage(MESSAGES.already_subscribed);
      } else {
        setStatus("error");
        setMessage(MESSAGES[data.error] ?? MESSAGES.server_error);
      }
    } catch {
      setStatus("error");
      setMessage(MESSAGES.server_error);
    }
  };

  if (status === "done") {
    return (
      <p className="mt-6 max-w-[52ch] border border-[#00ff9f]/25 bg-[#00ff9f]/[0.04] px-4 py-3 text-[0.92rem] text-white/80">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-[420px]">
      <label
        htmlFor="alert-email"
        className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35"
      >
        Email
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="alert-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="min-w-0 flex-1 border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[0.95rem] text-white/90 placeholder:text-white/25 outline-none focus:border-white/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "sending" || email.trim() === ""}
          className="shrink-0 border border-white/25 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "…" : "Sign up"}
        </button>
      </div>
      <label
        htmlFor="alert-venue"
        className="mt-5 block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35"
      >
        Which Chicago bar should we play next?{" "}
        <span className="text-white/25 normal-case tracking-normal">
          — optional
        </span>
      </label>
      <input
        id="alert-venue"
        type="text"
        autoComplete="off"
        placeholder="e.g. The Empty Bottle"
        maxLength={80}
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        disabled={status === "sending"}
        className="mt-2 w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-[0.95rem] text-white/90 placeholder:text-white/25 outline-none focus:border-white/40 disabled:opacity-50"
      />
      {/* honeypot: invisible to humans, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />
      {status === "error" && message ? (
        <p className="mt-3 text-[0.85rem] text-[#ff7a7a]/90">{message}</p>
      ) : null}
      <p className="mt-3 font-mono text-[0.62rem] leading-relaxed text-white/30">
        Unsubscribe anytime.
      </p>
    </form>
  );
}

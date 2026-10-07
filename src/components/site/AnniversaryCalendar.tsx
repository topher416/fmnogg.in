"use client";

import { useMemo, useState } from "react";
import {
  anniversariesOn,
  getUpcomingAnniversaries,
  KIND_LABELS,
} from "@/lib/radiohead-anniversaries";

type View = "calendar" | "list";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function countdown(inDays: number): string {
  if (inDays === 0) return "today";
  if (inDays === 1) return "tomorrow";
  if (inDays < 30) return `in ${inDays} days`;
  if (inDays < 365) {
    const mo = Math.round(inDays / 30);
    return `in ${mo} mo`;
  }
  const yr = Math.round(inDays / 365);
  return `in ${yr} yr`;
}

function Milestone({ turns }: { turns: number }) {
  if (turns % 5 !== 0) return null;
  return (
    <span className="ml-2 border border-[#00ff9f]/30 bg-[#00ff9f]/[0.06] px-1.5 py-px font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[#00ff9f]/90">
      ★ {turns}th
    </span>
  );
}

export default function AnniversaryCalendar() {
  const now = useMemo(() => new Date(), []);
  const [view, setView] = useState<View>("calendar");
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const upcoming = useMemo(() => getUpcomingAnniversaries(now), [now]);

  const moveMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) =>
    year === now.getFullYear() &&
    month === now.getMonth() &&
    day === now.getDate();

  const selKey = selected ?? `${year}-${month}-${now.getDate()}`;
  const [selY, selM, selD] = selKey.split("-").map(Number);
  const selAnnivs = anniversariesOn(selM + 1, selD);

  const tab = (v: View, label: string) => (
    <button
      key={v}
      type="button"
      onClick={() => setView(v)}
      aria-pressed={view === v}
      className={`border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors ${
        view === v
          ? "border-white/60 text-white"
          : "border-white/15 text-white/45 hover:border-white/40 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {tab("calendar", "Calendar")}
          {tab("list", "List")}
        </div>
        {view === "calendar" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              aria-label="Previous month"
              className="border border-white/15 px-2.5 py-1 font-mono text-[0.8rem] text-white/60 hover:border-white/40 hover:text-white"
            >
              ←
            </button>
            <span className="min-w-[130px] text-center font-mono text-[0.78rem] text-white/75">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              aria-label="Next month"
              className="border border-white/15 px-2.5 py-1 font-mono text-[0.8rem] text-white/60 hover:border-white/40 hover:text-white"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => {
                setYear(now.getFullYear());
                setMonth(now.getMonth());
                setSelected(null);
              }}
              className="border border-white/15 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/45 hover:border-white/40 hover:text-white/80"
            >
              Today
            </button>
          </div>
        ) : null}
      </div>

      {view === "calendar" ? (
        <>
          <div className="mt-6 grid grid-cols-7 gap-px border border-white/10 bg-white/10">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="bg-[#0b0b0d] px-1 py-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35"
              >
                {d}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) {
                return <div key={`x-${i}`} className="bg-[#0b0b0d] min-h-[64px]" />;
              }
              const annivs = anniversariesOn(month + 1, day);
              const key = `${year}-${month}-${day}`;
              const active = selKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(active ? null : key)}
                  className={`bg-[#0b0b0d] min-h-[64px] p-1.5 text-left align-top transition-colors hover:bg-white/[0.04] ${
                    active ? "outline outline-1 outline-white/50" : ""
                  }`}
                >
                  <span
                    className={`font-mono text-[0.72rem] tabular-nums ${
                      isToday(day) ? "text-[#00ff9f]" : "text-white/55"
                    }`}
                  >
                    {day}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1">
                    {annivs.map((a) => (
                      <span
                        key={`${a.title}-${a.year}`}
                        title={`${a.title} (${a.year})`}
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          a.kind === "album"
                            ? "bg-[#00ff9f]"
                            : "border border-white/50"
                        }`}
                      />
                    ))}
                  </span>
                  {annivs.length > 0 ? (
                    <span className="mt-1 hidden truncate text-[0.62rem] text-white/40 sm:block">
                      {annivs[0].title}
                      {annivs.length > 1 ? ` +${annivs.length - 1}` : ""}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-[80px] border-t border-white/[0.06] pt-4">
            {selAnnivs.length === 0 ? (
              <p className="font-mono text-[0.72rem] text-white/30">
                Nothing on {MONTHS[selM]} {selD} — pick a dotted day.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {selAnnivs.map((a) => {
                  const turns = selY - a.year;
                  return (
                    <li
                      key={`${a.title}-${a.year}`}
                      className="flex flex-wrap items-baseline gap-x-3"
                    >
                      <span className="text-[0.95rem] text-white/85">
                        {a.title}
                      </span>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/35">
                        {KIND_LABELS[a.kind]} · {a.year}
                      </span>
                      <span className="font-mono text-[0.72rem] text-white/55">
                        turns {turns}
                      </span>
                      <Milestone turns={turns} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      ) : (
        <ol className="mt-6 divide-y divide-white/[0.05] border-t border-white/[0.06]">
          {upcoming.map((u) => (
            <li
              key={`${u.title}-${u.year}`}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5"
            >
              <span className="min-w-0">
                <span className="font-mono text-[0.72rem] tabular-nums text-white/40">
                  {MONTHS[u.date.getMonth()].slice(0, 3)} {u.date.getDate()},{" "}
                  {u.date.getFullYear()}
                </span>{" "}
                <span className="text-[0.95rem] text-white/85">{u.title}</span>{" "}
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/35">
                  {KIND_LABELS[u.kind]}
                </span>
                <Milestone turns={u.turns} />
              </span>
              <span className="shrink-0 font-mono text-[0.72rem] text-white/50">
                turns {u.turns} · {countdown(u.inDays)}
              </span>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-6 font-mono text-[0.62rem] leading-relaxed text-white/30">
        ★ marks a 5-year milestone
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { BAND } from "@/lib/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AdminActions from "./AdminActions";

export const metadata: Metadata = {
  title: `Alerts admin — ${BAND.name}`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function readSubscribers(): Promise<string[] | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(
    `${url.replace(/\/$/, "")}/smembers/${encodeURIComponent("alerts:subscribers")}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string[] };
  return Array.isArray(data.result) ? [...data.result].sort() : [];
}

export default async function AlertsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const adminToken = process.env.ALERTS_ADMIN_TOKEN;
  const authorized = !!adminToken && token === adminToken;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e2d9] flex flex-col">
      <SiteHeader crumbs={[{ label: "alerts" }, { label: "admin" }]} />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-5 py-10">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Private
        </p>
        <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-tight">
          Alert subscribers
        </h1>

        {!adminToken ? (
          <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
            Not switched on yet — set an{" "}
            <code className="font-mono text-[0.85em] text-white/75">
              ALERTS_ADMIN_TOKEN
            </code>{" "}
            environment variable on the project, then open this page with{" "}
            <code className="font-mono text-[0.85em] text-white/75">
              ?token=…
            </code>
            .
          </p>
        ) : !authorized ? (
          <p className="mt-4 max-w-[60ch] text-[0.95rem] leading-relaxed text-white/55">
            This page needs the admin token in the URL.
          </p>
        ) : (
          <AdminBody />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

async function AdminBody() {
  const subscribers = await readSubscribers();
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
                key={s}
                className="py-2 font-mono text-[0.8rem] text-white/70 select-all"
              >
                {s}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 text-[0.95rem] text-white/55">
          No signups yet. The form is live on{" "}
          <a href="/alerts" className="underline underline-offset-2 decoration-white/25">
            /alerts
          </a>
          .
        </p>
      )}
    </div>
  );
}

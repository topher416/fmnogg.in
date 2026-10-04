"use server";

import { list } from "@vercel/blob";

async function readSubscribers(): Promise<string[] | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const emails: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 100, cursor });
      for (const b of page.blobs) {
        try {
          const res = await fetch(b.url, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });
          if (!res.ok) continue;
          const data = (await res.json()) as { email?: unknown };
          if (typeof data.email === "string") emails.push(data.email);
        } catch {
          // Skip blobs that can't be read; keep the rest.
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return emails.sort();
  } catch {
    return null;
  }
}

/** Returns the subscriber list only when the password matches. */
export async function unlockAdmin(
  password: string
): Promise<{ ok: true; subscribers: string[] | null } | { ok: false }> {
  const adminPassword = process.env.ALERTS_ADMIN_TOKEN;
  if (!adminPassword || password !== adminPassword) {
    return { ok: false };
  }
  const subscribers = await readSubscribers();
  return { ok: true, subscribers };
}

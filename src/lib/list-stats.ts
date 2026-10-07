import { list } from "@vercel/blob";

/** Live mailing-list size for the booker pitch. Null when unconfigured. */
export async function getSubscriberCount(): Promise<number | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    let count = 0;
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "subscribers/", limit: 1000, cursor });
      count += page.blobs.length;
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return count;
  } catch {
    return null;
  }
}

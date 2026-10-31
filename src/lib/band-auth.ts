import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getBandMember, type BandMember } from "./band-members";

// Personal-code login for /band. No accounts, no email, no password reset.
// Each member gets one code; only its SHA-256 hash lives in the
// BAND_MEMBER_CODES env var (JSON: { slug: sha256hex }). The plaintext
// codes are never in the repo, never in Blob, never in a cookie.
// A login sets a signed session cookie: slug.expiry.hmac, 90 days.

export const BAND_SESSION_COOKIE = "band_session";
const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

function sha256Hex(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

function codeHashes(): Record<string, string> | null {
  const raw = process.env.BAND_MEMBER_CODES;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "string" && /^[0-9a-f]{64}$/.test(v)) out[k] = v;
    }
    return out;
  } catch {
    return null;
  }
}

/** The member slug whose code matches, or null. Comparison is hash-only. */
export function verifyBandCode(code: string): string | null {
  const hashes = codeHashes();
  if (!hashes) return null;
  const digest = sha256Hex(code.trim().toLowerCase());
  for (const [slug, hash] of Object.entries(hashes)) {
    if (!getBandMember(slug)) continue;
    if (digest.length === hash.length) {
      try {
        if (timingSafeEqual(Buffer.from(digest), Buffer.from(hash))) return slug;
      } catch {
        // Fall through to the next slug.
      }
    }
  }
  return null;
}

function signSession(slug: string, expiry: number): string {
  const secret = process.env.BAND_SESSION_SECRET;
  if (!secret) throw new Error("BAND_SESSION_SECRET is not set");
  const payload = `${slug}.${expiry}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function setBandSession(slug: string): Promise<void> {
  const expiry = Date.now() + SESSION_TTL_MS;
  const jar = await cookies();
  jar.set(BAND_SESSION_COOKIE, signSession(slug, expiry), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearBandSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(BAND_SESSION_COOKIE);
}

/** The logged-in member, or null when there is no valid session cookie. */
export async function getBandSession(): Promise<BandMember | null> {
  const secret = process.env.BAND_SESSION_SECRET;
  if (!secret) return null;
  const jar = await cookies();
  const raw = jar.get(BAND_SESSION_COOKIE)?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [slug, expiryRaw, sig] = parts;
  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return null;
  const member = getBandMember(slug);
  if (!member) return null;
  const expected = createHmac("sha256", secret)
    .update(`${slug}.${expiry}`)
    .digest("hex");
  if (sig.length !== expected.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return member;
}

export function bandAuthConfigured(): boolean {
  return !!process.env.BAND_SESSION_SECRET && codeHashes() !== null;
}

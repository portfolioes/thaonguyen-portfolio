import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "portfolio_admin";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function parseCookies(req: any) {
  const header = req.headers?.cookie;
  if (!header) return {};

  return Object.fromEntries(
    header.split(";").map((part: string) => {
      const [key, ...value] = part.trim().split("=");
      return [key, decodeURIComponent(value.join("="))];
    }),
  ) as Record<string, string>;
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSessionCookie() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");

  const payload = base64url(
    JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    }),
  );
  const token = `${payload}.${sign(payload, secret)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}

export function isAdminRequest(req: any) {
  const secret = getSecret();
  if (!secret) return false;

  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof session.exp === "number" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}


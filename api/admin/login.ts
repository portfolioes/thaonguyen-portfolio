import { createAdminSessionCookie } from "../_lib/adminAuth";
import { readJson, requireMethod, sendJson } from "../_lib/http";

export default async function handler(req: any, res: any) {
  if (!requireMethod(req, res, "POST")) return;

  try {
    const expectedPassword = process.env.ADMIN_UPLOAD_PASSWORD;
    console.log(expectedPassword)
    if (!expectedPassword) {
      sendJson(res, 500, { error: "ADMIN_UPLOAD_PASSWORD is not configured." });
      return;
    }

    const { password } = await readJson(req);
    if (typeof password !== "string" || password !== expectedPassword) {
      sendJson(res, 401, { error: "Password is incorrect." });
      return;
    }

    res.setHeader("Set-Cookie", createAdminSessionCookie());
    sendJson(res, 200, { ok: true });
  } catch (err) {
    sendJson(res, 500, { error: err instanceof Error ? err.message : "Login failed." });
  }
}


import { clearAdminSessionCookie } from "../_lib/adminAuth.js";
import { requireMethod, sendJson } from "../_lib/http.js";

export default function handler(req: any, res: any) {
  if (!requireMethod(req, res, "POST")) return;
  res.setHeader("Set-Cookie", clearAdminSessionCookie());
  sendJson(res, 200, { ok: true });
}


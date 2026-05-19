import { isAdminRequest } from "../_lib/adminAuth.js";
import { requireMethod, sendJson } from "../_lib/http.js";

export default function handler(req: any, res: any) {
  if (!requireMethod(req, res, "GET")) return;
  sendJson(res, 200, { authenticated: isAdminRequest(req) });
}


import { isAdminRequest } from "../_lib/adminAuth";
import { readJson, requireMethod, sendJson } from "../_lib/http";
import { buildStoragePath, validateUploadInput } from "../_lib/mediaValidation";
import { getSupabaseAdmin } from "../_lib/supabaseAdmin";
import { MEDIA_BUCKET } from "../../src/app/lib/mediaRegistry";

export default async function handler(req: any, res: any) {
  if (!requireMethod(req, res, "POST")) return;
  if (!isAdminRequest(req)) {
    sendJson(res, 401, { error: "Admin session required." });
    return;
  }

  try {
    const body = await readJson(req);
    const slot = validateUploadInput(body.slotId, body.mimeType, body.sizeBytes);
    const path = buildStoragePath(slot, body.fileName, body.mimeType);
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .storage
      .from(MEDIA_BUCKET)
      .createSignedUploadUrl(path, { upsert: true });

    if (error) throw error;
    sendJson(res, 200, { path: data.path, token: data.token });
  } catch (err) {
    sendJson(res, 400, { error: err instanceof Error ? err.message : "Could not create upload URL." });
  }
}


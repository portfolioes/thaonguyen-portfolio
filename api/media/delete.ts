import { isAdminRequest } from "../_lib/adminAuth.js";
import { readJson, requireMethod, sendJson } from "../_lib/http.js";
import { getMediaSlot, MEDIA_BUCKET, PORTFOLIO_ASSETS_TABLE } from "../../src/app/lib/mediaRegistry.js";
import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";

export default async function handler(req: any, res: any) {
  if (!requireMethod(req, res, "DELETE")) return;
  if (!isAdminRequest(req)) {
    sendJson(res, 401, { error: "Admin session required." });
    return;
  }

  try {
    const { slotId } = await readJson(req);
    if (typeof slotId !== "string" || !getMediaSlot(slotId)) throw new Error("Unknown media slot.");

    const supabase = getSupabaseAdmin();
    const { data: existing } = await supabase
      .from(PORTFOLIO_ASSETS_TABLE)
      .select("storage_path")
      .eq("slot_id", slotId)
      .maybeSingle();

    const { error } = await supabase
      .from(PORTFOLIO_ASSETS_TABLE)
      .delete()
      .eq("slot_id", slotId);

    if (error) throw error;
    if (existing?.storage_path) await supabase.storage.from(MEDIA_BUCKET).remove([existing.storage_path]);

    sendJson(res, 200, { ok: true });
  } catch (err) {
    sendJson(res, 400, { error: err instanceof Error ? err.message : "Could not delete media asset." });
  }
}


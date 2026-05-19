import { isAdminRequest } from "../_lib/adminAuth";
import { readJson, requireMethod, sendJson } from "../_lib/http";
import { validateCommitInput } from "../_lib/mediaValidation";
import { getSupabaseAdmin } from "../_lib/supabaseAdmin";
import { MEDIA_BUCKET, PORTFOLIO_ASSETS_TABLE } from "../../src/app/lib/mediaRegistry";

export default async function handler(req: any, res: any) {
  if (!requireMethod(req, res, "POST")) return;
  if (!isAdminRequest(req)) {
    sendJson(res, 401, { error: "Admin session required." });
    return;
  }

  try {
    const body = await readJson(req);
    const slot = validateCommitInput(body.slotId, body.path, body.mimeType, body.sizeBytes);
    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from(PORTFOLIO_ASSETS_TABLE)
      .select("storage_path")
      .eq("slot_id", slot.id)
      .maybeSingle();

    const { data, error } = await supabase
      .from(PORTFOLIO_ASSETS_TABLE)
      .upsert(
        {
          slot_id: slot.id,
          media_type: slot.type,
          storage_path: body.path,
          mime_type: body.mimeType,
          size_bytes: body.sizeBytes,
          alt_text: typeof body.altText === "string" ? body.altText : slot.label,
          title: typeof body.title === "string" ? body.title : slot.title ?? slot.label,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slot_id" },
      )
      .select("slot_id, media_type, storage_path, mime_type, size_bytes, alt_text, title, updated_at")
      .single();

    if (error) throw error;

    if (existing?.storage_path && existing.storage_path !== body.path) {
      await supabase.storage.from(MEDIA_BUCKET).remove([existing.storage_path]);
    }

    sendJson(res, 200, { asset: data });
  } catch (err) {
    sendJson(res, 400, { error: err instanceof Error ? err.message : "Could not save media asset." });
  }
}


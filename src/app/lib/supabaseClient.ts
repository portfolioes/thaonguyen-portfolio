import { createClient } from "@supabase/supabase-js";
import { MEDIA_BUCKET, PORTFOLIO_ASSETS_TABLE } from "./mediaRegistry";
import type { PortfolioAsset, PortfolioAssetRecord } from "./mediaRegistry";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export function getPublicMediaUrl(storagePath: string) {
  if (!supabase) return "";
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export async function fetchPortfolioAssets(): Promise<PortfolioAsset[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(PORTFOLIO_ASSETS_TABLE)
    .select("slot_id, media_type, storage_path, mime_type, size_bytes, alt_text, title, updated_at");

  if (error) throw new Error(error.message);

  return ((data ?? []) as PortfolioAssetRecord[]).map((asset) => ({
    ...asset,
    publicUrl: getPublicMediaUrl(asset.storage_path),
  }));
}


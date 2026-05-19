import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchPortfolioAssets, isSupabaseConfigured } from "./supabaseClient";
import type { PortfolioAsset } from "./mediaRegistry";

type MediaContextValue = {
  assets: Record<string, PortfolioAsset>;
  loading: boolean;
  error: string | null;
  configured: boolean;
  reload: () => Promise<void>;
};

const MediaContext = createContext<MediaContextValue | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Record<string, PortfolioAsset>>({});
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setAssets({});
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const rows = await fetchPortfolioAssets();
      setAssets(Object.fromEntries(rows.map((asset) => [asset.slot_id, asset])));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load portfolio assets.");
      setAssets({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const value = useMemo(
    () => ({
      assets,
      loading,
      error,
      configured: isSupabaseConfigured,
      reload,
    }),
    [assets, loading, error, reload],
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMedia() {
  const value = useContext(MediaContext);
  if (!value) throw new Error("useMedia must be used inside MediaProvider");
  return value;
}

export function useMediaAsset(slotId?: string) {
  const { assets } = useMedia();
  return slotId ? assets[slotId] : undefined;
}


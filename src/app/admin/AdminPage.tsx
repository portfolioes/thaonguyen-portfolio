import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Film,
  ImageIcon,
  Loader2,
  Lock,
  LogOut,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import {
  MEDIA_BUCKET,
  getAcceptValue,
  getAllowedMimeTypes,
  getMaxBytes,
  mediaSlots,
  type MediaSlot,
} from "../lib/mediaRegistry";
import { useMedia } from "../lib/MediaProvider";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import type { PortfolioAsset } from "../lib/mediaRegistry";

const GOLD = "#d4a55f";
const GOLD_LIGHT = "#e8b86b";
const CREAM = "#f5e6c8";
const MUTED = "#b8a07c";

type UploadState = {
  busy: boolean;
  message?: string;
  error?: string;
};

async function requestJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }
  return payload as T;
}

export function AdminPage() {
  const { assets, loading, error, configured, reload } = useMedia();
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [states, setStates] = useState<Record<string, UploadState>>({});

  const groupedSlots = useMemo(() => {
    return mediaSlots.reduce<Record<string, MediaSlot[]>>((acc, slot) => {
      acc[slot.section] = acc[slot.section] ?? [];
      acc[slot.section].push(slot);
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    void requestJson<{ authenticated: boolean }>("/api/admin/session", { method: "GET" })
      .then((result) => setAuthenticated(result.authenticated))
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingSession(false));
  }, []);

  const setSlotState = (slotId: string, next: UploadState) => {
    setStates((current) => ({ ...current, [slotId]: next }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);
    try {
      await requestJson("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setPassword("");
      setAuthenticated(true);
      await reload();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed.");
    }
  };

  const handleLogout = async () => {
    await requestJson("/api/admin/logout", { method: "POST", body: "{}" }).catch(() => null);
    setAuthenticated(false);
  };

  const validateFile = (slot: MediaSlot, file: File) => {
    const allowedTypes = getAllowedMimeTypes(slot.type);
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Use ${allowedTypes.join(", ")} for this slot.`);
    }
    if (file.size > getMaxBytes(slot.type)) {
      throw new Error(`File is too large. Limit: ${formatBytes(getMaxBytes(slot.type))}.`);
    }
  };

  const handleUpload = async (slot: MediaSlot, file: File) => {
    if (!isSupabaseConfigured || !supabase) {
      setSlotState(slot.id, { busy: false, error: "Supabase env vars are missing." });
      return;
    }

    try {
      validateFile(slot, file);
      setSlotState(slot.id, { busy: true, message: "Creating upload URL..." });

      const uploadInfo = await requestJson<{ path: string; token: string }>("/api/media/upload-url", {
        method: "POST",
        body: JSON.stringify({
          slotId: slot.id,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      });

      setSlotState(slot.id, { busy: true, message: "Uploading file..." });
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .uploadToSignedUrl(uploadInfo.path, uploadInfo.token, file, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      setSlotState(slot.id, { busy: true, message: "Publishing asset..." });
      await requestJson("/api/media/commit", {
        method: "POST",
        body: JSON.stringify({
          slotId: slot.id,
          path: uploadInfo.path,
          mimeType: file.type,
          sizeBytes: file.size,
          title: slot.title ?? slot.label,
          altText: slot.label,
        }),
      });

      await reload();
      setSlotState(slot.id, { busy: false, message: "Uploaded." });
    } catch (err) {
      setSlotState(slot.id, {
        busy: false,
        error: err instanceof Error ? err.message : "Upload failed.",
      });
    }
  };

  const handleDelete = async (slot: MediaSlot) => {
    try {
      setSlotState(slot.id, { busy: true, message: "Removing asset..." });
      await requestJson("/api/media/delete", {
        method: "DELETE",
        body: JSON.stringify({ slotId: slot.id }),
      });
      await reload();
      setSlotState(slot.id, { busy: false, message: "Removed." });
    } catch (err) {
      setSlotState(slot.id, {
        busy: false,
        error: err instanceof Error ? err.message : "Delete failed.",
      });
    }
  };

  if (checkingSession) {
    return <AdminShell><LoadingPanel label="Checking admin session..." /></AdminShell>;
  }

  if (!authenticated) {
    return (
      <AdminShell>
        <div className="min-h-screen flex items-center justify-center px-6">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-2xl p-7"
            style={{
              background: "rgba(40,24,14,0.7)",
              border: "1px solid rgba(212,165,95,0.25)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(232,184,107,0.1)", border: "1px solid rgba(232,184,107,0.28)" }}>
              <Lock className="w-5 h-5" style={{ color: GOLD_LIGHT }} />
            </div>
            <h1 className="font-display" style={{ color: CREAM, fontSize: "30px", fontWeight: 400, lineHeight: 1.1 }}>
              Portfolio media admin
            </h1>
            <p className="mt-3" style={{ color: MUTED, fontSize: "14px", lineHeight: 1.6 }}>
              Sign in to upload images and videos into the portfolio placeholders.
            </p>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Admin password"
              className="mt-7 w-full rounded-xl px-4 py-3 outline-none"
              style={{
                background: "rgba(13,6,2,0.7)",
                border: "1px solid rgba(212,165,95,0.22)",
                color: CREAM,
              }}
            />
            {loginError && <InlineMessage type="error" message={loginError} />}
            <button
              type="submit"
              className="mt-5 w-full rounded-xl px-4 py-3 transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg, #d4a55f, #e8b86b)",
                color: "#1a0d05",
                fontWeight: 600,
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <main className="relative min-h-screen px-5 py-8 md:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <div style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Admin Dashboard
              </div>
              <h1 className="mt-2 font-display title-gradient" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1 }}>
                Media placeholders
              </h1>
              <p className="mt-4 max-w-2xl" style={{ color: MUTED, lineHeight: 1.7 }}>
                Upload or replace media for every portfolio slot. Published assets are visible on the public portfolio immediately.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => void reload()} className="admin-action-button">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button onClick={() => void handleLogout()} className="admin-action-button">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </header>

          {!configured && (
            <Notice tone="error" text="Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before uploading." />
          )}
          {error && <Notice tone="error" text={`Could not load assets: ${error}`} />}
          {loading && <Notice tone="info" text="Loading media assets..." />}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <Stat label="Total slots" value={String(mediaSlots.length)} />
            <Stat label="Images" value={String(mediaSlots.filter((slot) => slot.type === "image").length)} />
            <Stat label="Videos" value={String(mediaSlots.filter((slot) => slot.type === "video").length)} />
            <Stat label="Uploaded" value={String(Object.keys(assets).length)} />
          </div>

          <div className="space-y-10">
            {Object.entries(groupedSlots).map(([section, slots]) => (
              <section key={section}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-display" style={{ color: CREAM, fontSize: "24px", fontWeight: 400 }}>
                    {section}
                  </h2>
                  <span className="h-px flex-1" style={{ background: "rgba(212,165,95,0.18)" }} />
                  <span style={{ color: GOLD, fontSize: "12px" }}>{slots.length} slots</span>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {slots.map((slot) => (
                    <SlotCard
                      key={slot.id}
                      slot={slot}
                      asset={assets[slot.id]}
                      state={states[slot.id]}
                      onUpload={handleUpload}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0d0602 0%, #1f120a 55%, #0d0602 100%)",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(232,184,107,0.12), transparent 45%), radial-gradient(circle at 10% 100%, rgba(212,165,95,0.10), transparent 45%)",
        }}
      />
      <style>{`
        .admin-action-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          padding: 10px 14px;
          color: ${CREAM};
          background: rgba(40,24,14,0.55);
          border: 1px solid rgba(212,165,95,0.22);
          transition: transform 160ms ease, border-color 160ms ease;
        }
        .admin-action-button:hover {
          transform: translateY(-1px);
          border-color: rgba(232,184,107,0.55);
        }
      `}</style>
      <div className="relative">{children}</div>
    </div>
  );
}

function SlotCard({
  slot,
  asset,
  state,
  onUpload,
  onDelete,
}: {
  slot: MediaSlot;
  asset?: PortfolioAsset;
  state?: UploadState;
  onUpload: (slot: MediaSlot, file: File) => Promise<void>;
  onDelete: (slot: MediaSlot) => Promise<void>;
}) {
  const Icon = slot.type === "image" ? ImageIcon : Film;
  const inputId = `file-${slot.id}`;

  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(40,24,14,0.58)",
        border: "1px solid rgba(212,165,95,0.18)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
      }}
    >
      <div className="grid grid-cols-[128px_1fr] gap-4 p-4">
        <SlotPreview slot={slot} asset={asset} />
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2" style={{ color: GOLD, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                <Icon className="w-3.5 h-3.5" />
                {slot.type}
              </div>
              <h3 className="mt-1 truncate" style={{ color: CREAM, fontSize: "16px", fontWeight: 500 }}>
                {slot.label}
              </h3>
              <div className="mt-1 truncate" style={{ color: MUTED, fontSize: "12px" }}>{slot.id}</div>
            </div>
            <StatusPill uploaded={Boolean(asset)} />
          </div>

          <div className="mt-4 space-y-1" style={{ color: MUTED, fontSize: "12px" }}>
            <div>Accept: {getAcceptValue(slot.type)}</div>
            <div>Limit: {formatBytes(getMaxBytes(slot.type))}</div>
            {asset && <div className="truncate">File: {asset.storage_path}</div>}
            {asset?.size_bytes && <div>Size: {formatBytes(asset.size_bytes)}</div>}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {state?.message && <InlineMessage type="success" message={state.message} />}
        {state?.error && <InlineMessage type="error" message={state.error} />}
        <div className="mt-3 flex flex-wrap gap-2">
          <label
            htmlFor={inputId}
            className="admin-action-button cursor-pointer"
            aria-disabled={state?.busy}
          >
            {state?.busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {asset ? "Replace" : "Upload"}
          </label>
          <input
            id={inputId}
            type="file"
            accept={getAcceptValue(slot.type)}
            className="hidden"
            disabled={state?.busy}
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              event.currentTarget.value = "";
              if (file) void onUpload(slot, file);
            }}
          />
          {asset && (
            <>
              <a className="admin-action-button" href={asset.publicUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
              <button className="admin-action-button" disabled={state?.busy} onClick={() => void onDelete(slot)}>
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function SlotPreview({ slot, asset }: { slot: MediaSlot; asset?: PortfolioAsset }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        height: 128,
        background: "linear-gradient(135deg, rgba(60,38,22,0.9), rgba(18,9,4,0.95))",
        border: "1px solid rgba(212,165,95,0.18)",
      }}
    >
      {asset?.media_type === "image" && <img src={asset.publicUrl} alt={asset.alt_text || slot.label} className="absolute inset-0 w-full h-full object-cover" />}
      {asset?.media_type === "video" && <video src={asset.publicUrl} className="absolute inset-0 w-full h-full object-cover" muted playsInline preload="metadata" />}
      {!asset && (
        <div className="text-center px-3">
          {slot.type === "image" ? <ImageIcon className="w-7 h-7 mx-auto" style={{ color: GOLD_LIGHT }} /> : <Film className="w-7 h-7 mx-auto" style={{ color: GOLD_LIGHT }} />}
          <div className="mt-2" style={{ color: MUTED, fontSize: "11px" }}>
            Missing
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ uploaded }: { uploaded: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 shrink-0"
      style={{
        background: uploaded ? "rgba(34,197,94,0.12)" : "rgba(232,184,107,0.08)",
        border: uploaded ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(232,184,107,0.22)",
        color: uploaded ? "#86efac" : GOLD_LIGHT,
        fontSize: "11px",
      }}
    >
      {uploaded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
      {uploaded ? "Uploaded" : "Missing"}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(40,24,14,0.45)",
        border: "1px solid rgba(212,165,95,0.16)",
      }}
    >
      <div className="font-display title-italic-gold" style={{ fontSize: "34px", lineHeight: 1 }}>{value}</div>
      <div className="mt-2" style={{ color: MUTED, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function Notice({ tone, text }: { tone: "error" | "info"; text: string }) {
  return (
    <div
      className="mb-5 rounded-xl px-4 py-3"
      style={{
        background: tone === "error" ? "rgba(239,68,68,0.10)" : "rgba(232,184,107,0.08)",
        border: tone === "error" ? "1px solid rgba(239,68,68,0.28)" : "1px solid rgba(232,184,107,0.20)",
        color: tone === "error" ? "#fecaca" : CREAM,
      }}
    >
      {text}
    </div>
  );
}

function InlineMessage({ type, message }: { type: "error" | "success"; message: string }) {
  return (
    <div
      className="mt-3 rounded-lg px-3 py-2"
      style={{
        background: type === "error" ? "rgba(239,68,68,0.10)" : "rgba(34,197,94,0.10)",
        border: type === "error" ? "1px solid rgba(239,68,68,0.24)" : "1px solid rgba(34,197,94,0.20)",
        color: type === "error" ? "#fecaca" : "#bbf7d0",
        fontSize: "12px",
      }}
    >
      {message}
    </div>
  );
}

function LoadingPanel({ label }: { label: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ color: CREAM }}>
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: GOLD_LIGHT }} />
        {label}
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)}MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${bytes}B`;
}


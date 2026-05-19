import {
  getAllowedMimeTypes,
  getMaxBytes,
  getMediaSlot,
  type MediaSlot,
} from "../../src/app/lib/mediaRegistry";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export function validateUploadInput(slotId: unknown, mimeType: unknown, sizeBytes: unknown) {
  if (typeof slotId !== "string") throw new Error("slotId is required.");
  if (typeof mimeType !== "string") throw new Error("mimeType is required.");
  if (typeof sizeBytes !== "number" || !Number.isFinite(sizeBytes)) throw new Error("sizeBytes is required.");

  const slot = getMediaSlot(slotId);
  if (!slot) throw new Error("Unknown media slot.");

  if (!getAllowedMimeTypes(slot.type).includes(mimeType)) {
    throw new Error(`${slot.label} only accepts ${getAllowedMimeTypes(slot.type).join(", ")}.`);
  }

  if (sizeBytes <= 0 || sizeBytes > getMaxBytes(slot.type)) {
    throw new Error(`${slot.label} exceeds the ${formatBytes(getMaxBytes(slot.type))} limit.`);
  }

  return slot;
}

export function validateCommitInput(slotId: unknown, path: unknown, mimeType: unknown, sizeBytes: unknown) {
  const slot = validateUploadInput(slotId, mimeType, sizeBytes);
  if (typeof path !== "string" || !path.startsWith(`${slot.id.replace(/[^a-zA-Z0-9_-]/g, "-")}/`)) {
    throw new Error("Invalid storage path for this slot.");
  }
  return slot;
}

export function buildStoragePath(slot: MediaSlot, originalName: unknown, mimeType: string) {
  const rawName = typeof originalName === "string" ? originalName : "upload";
  const cleanName = rawName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "upload";
  const slotFolder = slot.id.replace(/[^a-zA-Z0-9_-]/g, "-");
  const extension = EXT_BY_MIME[mimeType] ?? "bin";

  return `${slotFolder}/${Date.now()}-${cleanName}.${extension}`;
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / 1024 / 1024)}MB`;
  return `${Math.round(bytes / 1024)}KB`;
}


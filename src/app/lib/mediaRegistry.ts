export const MEDIA_BUCKET = "portfolio-media";
export const PORTFOLIO_ASSETS_TABLE = "portfolio_assets";

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 300 * 1024 * 1024;

export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const VIDEO_MIME_TYPES = ["video/mp4", "video/webm"];

export type MediaType = "image" | "video";

export type MediaSlot = {
  id: string;
  type: MediaType;
  section: string;
  label: string;
  hint: string;
  aspect: string;
  title?: string;
};

export type PortfolioAssetRecord = {
  slot_id: string;
  media_type: MediaType;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  title: string | null;
  updated_at: string | null;
};

export type PortfolioAsset = PortfolioAssetRecord & {
  publicUrl: string;
};

const caseStudyManySlots = (prefix: string, section: string): MediaSlot[] => [
  { id: `${prefix}.workSample`, type: "image", section, label: "Work Sample", hint: "Poster / Frame", aspect: "aspect-[3/4]" },
  { id: `${prefix}.detailShot`, type: "image", section, label: "Detail Shot", hint: "Process / Output", aspect: "aspect-[3/4]" },
  { id: `${prefix}.evidence`, type: "image", section, label: "Evidence", hint: "Screenshot", aspect: "aspect-square" },
  { id: `${prefix}.mockup`, type: "image", section, label: "Mockup", hint: "Phone / Screen", aspect: "aspect-square" },
  { id: `${prefix}.behindTheScenes`, type: "image", section, label: "Behind the Scenes", hint: "Process photo", aspect: "aspect-[4/5]" },
  { id: `${prefix}.finalOutput`, type: "image", section, label: "Final Output", hint: "Deliverable", aspect: "aspect-[4/5]" },
];

const caseStudyFewSlots = (prefix: string, section: string): MediaSlot[] => [
  { id: `${prefix}.workSample`, type: "image", section, label: "Work Sample", hint: "Key visual", aspect: "aspect-[4/3]" },
  { id: `${prefix}.evidence`, type: "image", section, label: "Evidence", hint: "Screenshot", aspect: "aspect-square" },
  { id: `${prefix}.detail`, type: "image", section, label: "Detail", hint: "Optional", aspect: "aspect-square" },
];

export const mediaSlots: MediaSlot[] = [
  { id: "cover.portrait", type: "image", section: "Cover", label: "Your Portrait", hint: "Professional photo", aspect: "aspect-[4/5]" },
  { id: "profile.candid", type: "image", section: "Profile", label: "Candid photo", hint: "At event or workspace", aspect: "aspect-[5/4]" },

  { id: "case1.hero", type: "image", section: "Case Study 1 - 1 Nha Studio", label: "Hero Visual", hint: "Signature shot / cover", aspect: "aspect-[16/10]" },
  { id: "case1.detail", type: "image", section: "Case Study 1 - 1 Nha Studio", label: "Detail", hint: "Close-up", aspect: "aspect-[4/5]" },
  { id: "case1.story1", type: "image", section: "Case Study 1 - 1 Nha Studio", label: "Story 01", hint: "Crop", aspect: "aspect-square" },
  { id: "case1.story2", type: "image", section: "Case Study 1 - 1 Nha Studio", label: "Story 02", hint: "Crop", aspect: "aspect-square" },
  { id: "case1.video1", type: "video", section: "Case Study 1 - 1 Nha Studio", label: "Wedding Highlight Reel", hint: "0:45", aspect: "aspect-[9/16]", title: "Wedding Highlight Reel" },
  { id: "case1.video2", type: "video", section: "Case Study 1 - 1 Nha Studio", label: "Behind the Scenes", hint: "0:30", aspect: "aspect-[9/16]", title: "Behind the Scenes" },
  { id: "case1.video3", type: "video", section: "Case Study 1 - 1 Nha Studio", label: "Couple Story Edit", hint: "1:15", aspect: "aspect-[9/16]", title: "Couple Story Edit" },
  { id: "case1.video4", type: "video", section: "Case Study 1 - 1 Nha Studio", label: "Seasonal Promo Reel", hint: "0:20", aspect: "aspect-[9/16]", title: "Seasonal Promo Reel" },
  ...[
    { id: 1, aspect: "aspect-[6/5]" },
    { id: 2, aspect: "aspect-[6/5]" },
    { id: 3, aspect: "aspect-square" },
    { id: 4, aspect: "aspect-square" },
    { id: 5, aspect: "aspect-square" },
    { id: 6, aspect: "aspect-[6/5]" },
    { id: 7, aspect: "aspect-[6/5]" },
    { id: 8, aspect: "aspect-[6/5]" },
  ].map((cfg) => ({
    id: `case1.poster${cfg.id}`,
    type: "image" as const,
    section: "Case Study 1 - 1 Nha Studio",
    label: `Poster ${String(cfg.id).padStart(2, "0")}`,
    hint: cfg.aspect === "aspect-square" ? "Square" : "3600x3000",
    aspect: cfg.aspect,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `case1.viewcount${i + 1}`,
    type: "image" as const,
    section: "Case Study 1 - 1 Nha Studio",
    label: `View Count #${i + 1}`,
    hint: "TikTok screenshot",
    aspect: "aspect-[3/4]",
  })),

  ...caseStudyFewSlots("case2", "Case Study 2 - CloudGo Video"),
  ...caseStudyManySlots("case3", "Case Study 3 - Event Operations"),
  ...caseStudyFewSlots("case4", "Case Study 4 - Kim Oanh Group"),
];

export const mediaSlotsById = Object.fromEntries(mediaSlots.map((slot) => [slot.id, slot])) as Record<string, MediaSlot>;

export function getMediaSlot(slotId: string) {
  return mediaSlotsById[slotId];
}

export function getAllowedMimeTypes(type: MediaType) {
  return type === "image" ? IMAGE_MIME_TYPES : VIDEO_MIME_TYPES;
}

export function getMaxBytes(type: MediaType) {
  return type === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
}

export function getAcceptValue(type: MediaType) {
  return getAllowedMimeTypes(type).join(",");
}


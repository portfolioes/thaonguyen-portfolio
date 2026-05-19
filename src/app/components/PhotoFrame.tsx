import { ImageIcon, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useMediaAsset } from "../lib/MediaProvider";

type Props = {
  slotId?: string;
  label?: string;
  hint?: string;
  aspect?: string;
  className?: string;
  rounded?: string;
};

export function PhotoFrame({
  slotId,
  label = "Your Photo Here",
  hint = "Replace with your image",
  aspect = "aspect-[4/5]",
  className = "",
  rounded = "rounded-2xl",
}: Props) {
  const asset = useMediaAsset(slotId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative ${aspect} ${rounded} overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(60,38,22,0.85) 0%, rgba(38,22,12,0.95) 100%)",
        border: "1px solid rgba(212, 165, 95, 0.25)",
        boxShadow:
          "inset 0 0 60px rgba(212,165,95,0.08), 0 20px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      {asset?.media_type === "image" && asset.publicUrl && (
        <img
          src={asset.publicUrl}
          alt={asset.alt_text || label}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* corner brackets */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: "#d4a55f" }} />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: "#d4a55f" }} />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: "#d4a55f" }} />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: "#d4a55f" }} />

      {/* soft golden glow */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(232,184,107,0.18), transparent 60%)",
        }}
      />

      {!asset && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(212,165,95,0.1)",
            border: "1px dashed rgba(212,165,95,0.5)",
          }}
        >
          <ImageIcon className="w-6 h-6" style={{ color: "#d4a55f" }} />
        </div>
        <div style={{ color: "#f5e6c8", letterSpacing: "0.05em" }}>{label}</div>
        <div className="flex items-center gap-1.5 opacity-70" style={{ color: "#c8a878" }}>
          <Upload className="w-3 h-3" />
          <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {hint}
          </span>
        </div>
      </div>}
    </motion.div>
  );
}

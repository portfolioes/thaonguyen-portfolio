import { useRef } from "react";
import { motion } from "motion/react";
import { Play, Film } from "lucide-react";
import { useMediaAsset } from "../lib/MediaProvider";

type Props = {
  slotId?: string;
  title?: string;
  duration?: string;
  aspect?: string;
  accent?: string;
};

export function VideoFrame({
  slotId,
  title = "Project Video",
  duration = "0:30",
  aspect = "aspect-video",
  accent,
}: Props) {
  const asset = useMediaAsset(slotId);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${aspect} rounded-2xl overflow-hidden cursor-pointer`}
      style={{
        background:
          "linear-gradient(135deg, rgba(70,42,22,0.9) 0%, rgba(30,18,10,0.95) 100%)",
        border: "1px solid rgba(212, 165, 95, 0.3)",
        boxShadow: "0 20px 60px -20px rgba(0,0,0,0.7)",
      }}
    >
      {asset?.media_type === "video" && asset.publicUrl && (
        <video
          ref={videoRef}
          src={asset.publicUrl}
          title={asset.title || title}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* animated golden gradient sheen */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            background: [
              "radial-gradient(circle at 30% 30%, rgba(232,184,107,0.25), transparent 60%)",
              "radial-gradient(circle at 70% 70%, rgba(232,184,107,0.3), transparent 60%)",
              "radial-gradient(circle at 30% 30%, rgba(232,184,107,0.25), transparent 60%)",
            ],
          },
        }}
        initial={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(232,184,107,0.12), transparent 60%)",
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* moving light line */}
      <motion.div
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,184,107,0.25), transparent)",
        }}
        variants={{ hover: { x: ["-100%", "300%"] } }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        initial={{ x: "-100%" }}
      />

      {/* corner brackets */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l z-10" style={{ borderColor: accent || "#e8b86b" }} />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r z-10" style={{ borderColor: accent || "#e8b86b" }} />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l z-10" style={{ borderColor: accent || "#e8b86b" }} />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r z-10" style={{ borderColor: accent || "#e8b86b" }} />

      {/* center play button */}
      {!asset && <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(232,184,107,0.15)",
            border: "1px solid rgba(232,184,107,0.5)",
            backdropFilter: "blur(8px)",
          }}
          variants={{ hover: { scale: 1.15 } }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(232,184,107,0.6)" }}
            variants={{ hover: { scale: [1, 1.6], opacity: [0.6, 0] } }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <Play className="w-6 h-6 ml-0.5" style={{ color: "#f5e6c8", fill: "#f5e6c8" }} />
        </motion.div>
      </div>}

      {/* top-left meta */}
      <div className="absolute top-5 left-12 z-10 flex items-center gap-2">
        <Film className="w-3 h-3" style={{ color: "#d4a55f" }} />
        <span style={{ color: "#d4a55f", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Reel
        </span>
      </div>

      {/* bottom info */}
      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-3 pointer-events-none">
        <div style={{ color: "#f5e6c8", fontSize: "13px", lineHeight: 1.3 }}>{title}</div>
        <div
          className="px-2 py-0.5 rounded shrink-0"
          style={{
            background: "rgba(0,0,0,0.5)",
            color: "#e8b86b",
            fontSize: "10px",
            letterSpacing: "0.1em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {duration}
        </div>
      </div>

      {/* hover lift overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{ hover: { boxShadow: "inset 0 0 0 1px rgba(232,184,107,0.6)" } }}
      />
    </motion.div>
  );
}

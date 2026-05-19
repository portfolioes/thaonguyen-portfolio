import { motion } from "motion/react";

type Props = {
  label: string;
  level: string;
  value: number; // 0-100
};

export function CircularProgress({ label, level, value }: Props) {
  const size = 92;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const gradId = `g-${label.replace(/[^a-zA-Z0-9]/g, "-")}`;

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5e6c8" />
              <stop offset="100%" stopColor="#d4a55f" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(212,165,95,0.12)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(232,184,107,0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display"
            style={{ color: "#f5e6c8", fontSize: "20px", fontWeight: 400, lineHeight: 1 }}
          >
            {value}%
          </span>
          <span
            style={{
              color: "#d4a55f",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            {level}
          </span>
        </div>
      </div>
      <div style={{ color: "#f5e6c8", fontSize: "12px", lineHeight: 1.3, opacity: 0.9 }}>
        {label}
      </div>
    </div>
  );
}

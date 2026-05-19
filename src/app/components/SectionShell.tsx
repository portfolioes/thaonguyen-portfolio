import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  variant?: "dark" | "deep" | "warm";
  className?: string;
};

const bgMap = {
  dark: "linear-gradient(180deg, rgba(26,15,8,0.88) 0%, rgba(34,20,8,0.88) 100%)",
  deep: "linear-gradient(180deg, rgba(17,9,3,0.9) 0%, rgba(26,15,8,0.9) 100%)",
  warm: "linear-gradient(180deg, rgba(42,24,16,0.86) 0%, rgba(31,18,10,0.86) 100%)",
};

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  variant = "dark",
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden ${className}`}
      style={{ background: bgMap[variant] }}
    >
      {/* ambient golden light rays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(232,184,107,0.08), transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(212,165,95,0.05), transparent 50%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            {eyebrow && (
              <div
                className="mb-3"
                style={{
                  color: "#d4a55f",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontSize: "11px",
                }}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className="font-display title-gradient"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

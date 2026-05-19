import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "cover", label: "01" },
  { id: "toc", label: "02" },
  { id: "tagline", label: "03" },
  { id: "profile", label: "04" },
  { id: "why-sony", label: "05" },
  { id: "education", label: "06" },
  { id: "skills", label: "07" },
  { id: "style", label: "08" },
  { id: "experience", label: "09" },
  { id: "case-1", label: "10" },
  { id: "case-2", label: "11" },
  { id: "case-4", label: "12" },
  { id: "case-3", label: "13" },
  { id: "matching", label: "14" },
  { id: "analysis", label: "15" },
  { id: "fit", label: "16" },
  { id: "contact", label: "17" },
];

export function PortfolioNav() {
  const [active, setActive] = useState("cover");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);

      let current = "cover";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: "rgba(212,165,95,0.1)" }}>
        <motion.div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #d4a55f, #e8b86b)",
            boxShadow: "0 0 12px rgba(232,184,107,0.6)",
          }}
        />
      </div>

      {/* side dots */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
            title={s.id}
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                color: "#d4a55f",
                fontSize: "10px",
                letterSpacing: "0.2em",
              }}
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all"
              style={{
                width: active === s.id ? "10px" : "6px",
                height: active === s.id ? "10px" : "6px",
                background: active === s.id ? "#e8b86b" : "rgba(212,165,95,0.3)",
                boxShadow: active === s.id ? "0 0 10px rgba(232,184,107,0.7)" : "none",
              }}
            />
          </a>
        ))}
      </nav>
    </>
  );
}

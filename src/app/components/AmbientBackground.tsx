import { motion } from "motion/react";
import { useMemo } from "react";

// Deterministic pseudo-random so specks don't reshuffle on re-render
function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function AmbientBackground() {
  const specks = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: 1 + rand() * 2,
      delay: rand() * 8,
      duration: 6 + rand() * 8,
      drift: 10 + rand() * 30,
      opacity: 0.15 + rand() * 0.35,
    }));
  }, []);

  const sparkles = useMemo(() => {
    const rand = seededRandom(99);
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: 8 + rand() * 14,
      delay: rand() * 6,
      duration: 2.5 + rand() * 3,
      rotate: rand() * 90,
    }));
  }, []);

  const sunRays = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: 10 + rand() * 80,
      width: 80 + rand() * 140,
      angle: -20 + rand() * 40,
      delay: rand() * 5,
      duration: 8 + rand() * 6,
      opacity: 0.08 + rand() * 0.07,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* CORNER LIGHT BEAMS — soft golden, slowly breathing */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[70vw] h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(232,184,107,0.10), rgba(212,165,95,0.04) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[65vw] h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(255,215,150,0.09), rgba(212,165,95,0.03) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ opacity: [0.7, 0.4, 0.7], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-1/3 -left-1/3 w-[60vw] h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(232,184,107,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[55vh]"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(212,165,95,0.09), transparent 65%)",
          filter: "blur(55px)",
        }}
        animate={{ opacity: [0.6, 0.35, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* DIAGONAL LIGHT RAYS — thin sweeping streaks */}
      <motion.div
        className="absolute top-0 left-[15%] origin-top"
        style={{
          width: "2px",
          height: "70vh",
          background:
            "linear-gradient(to bottom, transparent, rgba(232,184,107,0.18), transparent)",
          filter: "blur(2px)",
          transform: "rotate(15deg)",
        }}
        animate={{ opacity: [0, 0.6, 0], y: [-40, 40, -40] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-[20%] origin-top"
        style={{
          width: "2px",
          height: "65vh",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,215,150,0.15), transparent)",
          filter: "blur(2.5px)",
          transform: "rotate(-12deg)",
        }}
        animate={{ opacity: [0, 0.5, 0], y: [-30, 30, -30] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute bottom-0 left-[40%] origin-bottom"
        style={{
          width: "1.5px",
          height: "55vh",
          background:
            "linear-gradient(to top, transparent, rgba(232,184,107,0.14), transparent)",
          filter: "blur(2px)",
          transform: "rotate(-8deg)",
        }}
        animate={{ opacity: [0, 0.45, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* GOD RAYS — wide angled sunlight beams from top */}
      {sunRays.map((r) => (
        <motion.div
          key={`ray-${r.id}`}
          className="absolute top-[-10%]"
          style={{
            left: `${r.left}%`,
            width: `${r.width}px`,
            height: "120vh",
            background:
              "linear-gradient(to bottom, rgba(255,220,160,0.18), rgba(232,184,107,0.08) 40%, transparent 85%)",
            filter: "blur(24px)",
            transform: `translateX(-50%) rotate(${r.angle}deg)`,
            transformOrigin: "top center",
            mixBlendMode: "screen",
          }}
          animate={{
            opacity: [r.opacity * 0.4, r.opacity, r.opacity * 0.4],
            scaleX: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: r.delay,
          }}
        />
      ))}

      {/* BLING SPARKLES — 4-point star twinkles in gold */}
      {sparkles.map((s) => (
        <motion.div
          key={`sp-${s.id}`}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            transform: `rotate(${s.rotate}deg)`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [s.rotate, s.rotate + 180],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id={`bling-${s.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff4d6" stopOpacity="1" />
                <stop offset="40%" stopColor="#e8b86b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d4a55f" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z"
              fill={`url(#bling-${s.id})`}
              style={{ filter: "drop-shadow(0 0 6px rgba(232,184,107,0.9))" }}
            />
            <circle cx="12" cy="12" r="1.5" fill="#fff4d6" />
          </svg>
        </motion.div>
      ))}

      {/* SUBTLE FLOATING SPECKS — small soft golden dust */}
      {specks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: "#f5e6c8",
            boxShadow: `0 0 ${s.size * 3}px rgba(232,184,107,0.6)`,
          }}
          animate={{
            y: [0, -s.drift, 0],
            opacity: [0, s.opacity, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}

      {/* SUBTLE VIGNETTE for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  padStart?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  padStart,
  duration = 1400,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCurrent(value * easeOutCubic(progress));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, value]);

  const fixed = current.toFixed(decimals);
  const formatted = padStart ? fixed.padStart(padStart, "0") : fixed;

  return (
    <motion.span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}


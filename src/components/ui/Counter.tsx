"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dem so khi cuon toi. Ton trong prefers-reduced-motion:
 * neu nguoi dung tat chuyen dong, hien thang gia tri cuoi.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            // Chan duoi 0: moc thoi gian cua requestAnimationFrame co the som
            // hon performance.now() goi ngay truoc do, khien t am va ham
            // easing bac ba tra ve so am (hien thi "-4%").
            const t = Math.min(Math.max((now - start) / duration, 0), 1);
            // ease-out
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular">
      {display}
      {suffix}
    </span>
  );
}

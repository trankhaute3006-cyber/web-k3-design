"use client";

import { useEffect, useRef } from "react";
import type { Prize } from "@/data/promo";

/**
 * Banh xe quay — chi lo phan VE va phan QUAY.
 * Khong biet gi ve quy giai, nhat ky hay luat "moi can 1 lan":
 * nhung thu do nam o trang goi no (PromoWheelDemo / BoothWheel).
 *
 * Cha giu `rotation` (don vi do, chi tang dan) va goi onSpinEnd khi quay xong.
 */

const SIZE = 500;
const C = SIZE / 2;
const R = 238;

/** Cat ten giai thanh toi da 3 dong cho vua mieng banh xe */
function wrapLabel(text: string, maxChars = 16): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current += " " + w;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.slice(0, 3);
}

export type PrizeWheelProps = {
  prizes: Prize[];
  /** Goc quay hien tai, do. Tang len la banh xe chay. */
  rotation: number;
  /** Chi so cac giai da het -> ve mo di. Bo trong thi ve dam het. */
  dimmed?: number[];
  onSpinEnd?: () => void;
  /** Nhan giua banh xe */
  hubLabel?: string;
};

export function PrizeWheel({
  prizes,
  rotation,
  dimmed = [],
  onSpinEnd,
  hubLabel = "K3",
}: PrizeWheelProps) {
  const rotorRef = useRef<SVGGElement>(null);
  // Giu callback moi nhat ma khong phai go/gan lai listener moi lan render
  const endRef = useRef(onSpinEnd);
  endRef.current = onSpinEnd;

  useEffect(() => {
    const el = rotorRef.current;
    if (!el) return;
    const handle = (e: TransitionEvent) => {
      if (e.propertyName === "transform") endRef.current?.();
    };
    el.addEventListener("transitionend", handle);
    return () => el.removeEventListener("transitionend", handle);
  }, []);

  const n = prizes.length;
  const step = 360 / n;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
      {/* Kim chi o dinh banh xe */}
      <div
        aria-hidden="true"
        className="absolute top-[-0.4rem] left-1/2 z-10 h-0 w-0 -translate-x-1/2
          border-t-[2.1rem] border-r-[1.1rem] border-l-[1.1rem]
          border-t-cta border-r-transparent border-l-transparent
          drop-shadow-[0_3px_2px_rgba(0,0,0,0.35)]"
      />
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block h-full w-full"
        role="img"
        aria-label={`Vòng quay ${n} phần quà: ${prizes
          .map((p) => p.shortName)
          .join(", ")}`}
      >
        <circle cx={C} cy={C} r={246} fill="#002e6e" />
        <g
          ref={rotorRef}
          style={{
            transformOrigin: `${C}px ${C}px`,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 5.2s cubic-bezier(.12,.75,.12,1)",
          }}
          className="motion-reduce:[transition-duration:0.01s]"
        >
          {prizes.map((p, i) => {
            const a0 = ((i * step - 90) * Math.PI) / 180;
            const a1 = (((i + 1) * step - 90) * Math.PI) / 180;
            const x1 = C + R * Math.cos(a0);
            const y1 = C + R * Math.sin(a0);
            const x2 = C + R * Math.cos(a1);
            const y2 = C + R * Math.sin(a1);
            const faded = dimmed.includes(i);
            const lines = wrapLabel(p.shortName);
            return (
              <g key={p.name}>
                <path
                  d={`M${C} ${C} L${x1} ${y1} A${R} ${R} 0 ${
                    step > 180 ? 1 : 0
                  } 1 ${x2} ${y2}Z`}
                  fill={p.color}
                  opacity={faded ? 0.35 : 1}
                  stroke="#ffffff"
                  strokeWidth={3}
                />
                <g transform={`rotate(${i * step + step / 2} ${C} ${C})`}>
                  <text
                    x={C}
                    y={82}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight={700}
                    fill={p.darkText ? "#0b1b33" : "#ffffff"}
                    opacity={faded ? 0.35 : 1}
                  >
                    {lines.map((line, k) => (
                      <tspan key={line} x={C} dy={k === 0 ? 0 : 18}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
        <circle
          cx={C}
          cy={C}
          r={46}
          fill="#ffffff"
          stroke="#002e6e"
          strokeWidth={6}
        />
        <text
          x={C}
          y={C + 8}
          textAnchor="middle"
          fontSize={24}
          fontWeight={800}
          fill="#002e6e"
        >
          {hubLabel}
        </text>
      </svg>
    </div>
  );
}

/**
 * Tinh goc quay moi de kim dung o mieng `index`.
 * Luon cong them 6 vong tron cho banh xe chay dep, va lech ngau nhien
 * trong long mieng de khong lan nao cung dung chinh giua.
 */
export function spinAngle(current: number, index: number, count: number) {
  const step = 360 / count;
  const jitter = (Math.random() - 0.5) * step * 0.7;
  const target = 360 - (index * step + step / 2) - jitter;
  return current + 360 * 6 + (((target - current) % 360) + 360) % 360;
}

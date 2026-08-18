"use client";

import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { telHref, zaloHref, cn } from "@/lib/utils";

/**
 * Di dong: thanh hanh dong co dinh duoi day (ton trong safe-area cua iPhone).
 * Desktop: cum nut noi ben phai + nut ve dau trang.
 */
export function FloatingContact() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------- Di dong ---------- */}
      <div
        className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas-alt/95 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="grid grid-cols-2">
          <a
            href={telHref(site.phoneRaw)}
            className="flex min-h-14 items-center justify-center gap-2.5 border-r border-line font-display text-[0.9375rem] font-semibold text-ink transition-colors active:bg-canvas"
          >
            <Phone size={19} className="text-accent" aria-hidden="true" />
            Gọi ngay
          </a>
          <a
            href={zaloHref(site.zalo)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 items-center justify-center gap-2.5 bg-accent font-display text-[0.9375rem] font-semibold text-white transition-colors active:bg-accent-dark"
          >
            <MessageCircle size={19} aria-hidden="true" />
            Chat Zalo
          </a>
        </div>
      </div>

      {/* ---------- Desktop ---------- */}
      <div className="no-print fixed right-6 bottom-6 z-50 hidden flex-col gap-3 md:flex">
        <a
          href={zaloHref(site.zalo)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin qua Zalo"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-bright text-ink shadow-e3 transition-[filter,transform] duration-200 hover:scale-105 hover:brightness-105"
        >
          <MessageCircle size={23} aria-hidden="true" />
        </a>
        <a
          href={telHref(site.phoneRaw)}
          aria-label={`Gọi ${site.phone}`}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-deep text-white shadow-e3 transition-[background-color,transform] duration-200 hover:bg-deep-2 hover:scale-105"
        >
          <Phone size={22} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
          aria-label="Về đầu trang"
          className={cn(
            "inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-canvas-alt text-ink shadow-e2 transition-[opacity,transform,background-color] duration-200 hover:bg-canvas",
            showTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          )}
        >
          <ArrowUp size={22} aria-hidden="true" />
        </button>
      </div>

      {/* Chua cho thanh co dinh tren di dong, tranh che noi dung cuoi trang */}
      <div
        aria-hidden="true"
        className="h-14 md:hidden"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      />
    </>
  );
}

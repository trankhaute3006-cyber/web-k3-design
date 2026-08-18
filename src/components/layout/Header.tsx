"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { mainNav } from "@/data/nav";
import { site } from "@/data/site";
import { cn, telHref } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dong menu khi doi trang
  useEffect(() => setOpen(false), [pathname]);

  // Khoa cuon nen + dong bang phim Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Khi chua cuon: thanh nam tren the olive -> chu trang
  const onDark = !scrolled && !open;

  return (
    <>
      <a
        href="#noi-dung-chinh"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-cta focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-white"
      >
        Bỏ qua, đến nội dung chính
      </a>

      <header
        className="fixed inset-x-0 top-0 z-40 pt-[var(--inset)]"
        style={{ paddingInline: "var(--inset)" }}
      >
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-6 transition-[background-color,box-shadow,border-color,max-width,padding,border-radius] duration-300 ease-out",
            onDark
              ? "max-w-[80rem] border border-transparent bg-transparent px-6 py-4 sm:px-10 lg:px-14"
              : "max-w-[76rem] rounded-full border border-line bg-canvas-alt/92 px-4 py-2.5 shadow-e2 backdrop-blur-lg sm:px-5"
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — về trang chủ`}
            className="shrink-0"
          >
            <Logo dark={onDark} />
          </Link>

          {/* Menu desktop */}
          <nav aria-label="Điều hướng chính" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "k3-navlink font-display text-[0.9375rem] font-medium transition-colors",
                      onDark
                        ? isActive(item.href)
                          ? "text-accent-bright"
                          : "text-white/85 hover:text-white"
                        : isActive(item.href)
                          ? "text-accent"
                          : "text-ink-mid hover:text-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={telHref(site.phoneRaw)}
              className={cn(
                "hidden items-center gap-2 rounded-full px-4 font-display text-[0.875rem] font-semibold transition-colors xl:inline-flex xl:min-h-11",
                onDark
                  ? "border border-white/25 text-white hover:bg-white/12"
                  : "border border-line-strong text-ink-mid hover:border-ink hover:text-ink"
              )}
            >
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              <span className="tabular">{site.phone}</span>
            </a>

            <Link
              href="/lien-he/"
              className={cn(
                "hidden min-h-11 items-center rounded-full px-6 font-display text-[0.9375rem] font-semibold transition-colors sm:inline-flex",
                onDark
                  ? "bg-white text-ink hover:bg-canvas"
                  : "bg-cta text-white hover:bg-cta-dark"
              )}
            >
              Liên hệ
            </Link>

            {/* Nut mo menu — 48x48 dat chuan touch */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-di-dong"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              className={cn(
                "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden",
                onDark
                  ? "text-white hover:bg-white/12"
                  : "text-ink hover:bg-canvas"
              )}
            >
              {open ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Lop phu nen */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-ink/55 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Menu di dong */}
      <nav
        id="menu-di-dong"
        aria-label="Điều hướng trên di động"
        className={cn(
          "fixed z-40 origin-top overflow-hidden rounded-3xl border border-line bg-canvas-alt shadow-e3 transition-[transform,opacity] duration-300 ease-out lg:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
        style={{
          top: "calc(var(--inset) + 4.5rem)",
          left: "var(--inset)",
          right: "var(--inset)",
        }}
      >
        <ul className="max-h-[calc(100dvh-12rem)] overflow-y-auto px-5 py-2">
          {mainNav.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center font-display text-lg font-medium transition-colors",
                  isActive(item.href) ? "text-accent" : "text-ink hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-5 pt-2 pb-5">
          <a
            href={telHref(site.phoneRaw)}
            className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-display font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="tabular">Gọi ngay {site.phone}</span>
          </a>
        </div>
      </nav>
    </>
  );
}

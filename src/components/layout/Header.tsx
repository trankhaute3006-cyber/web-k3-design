"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { mainNav, type NavItem } from "@/data/nav";
import { site } from "@/data/site";
import { cn, telHref } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menu di dong
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // dropdown desktop
  const [openGroup, setOpenGroup] = useState<string | null>(null); // nhom mo tren mobile
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Doi trang thi dong het
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setOpenGroup(null);
  }, [pathname]);

  // Esc dong dropdown desktop; bam ra ngoai cung dong
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  // Khoa cuon nen khi mo menu di dong
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

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname.startsWith(item.href)) return true;
    // Muc cha sang khi dang o mot trang con cua no
    return (item.children ?? []).some(
      (c) => c.href !== "/" && pathname.startsWith(c.href.split("#")[0])
    );
  };

  // Ho hover: giu menu mo them mot nhip de con tro kip di xuong
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

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
              : "max-w-[78rem] rounded-full border border-line bg-canvas-alt/92 px-4 py-2.5 shadow-e2 backdrop-blur-lg sm:px-5"
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — về trang chủ`}
            className="shrink-0"
          >
            <Logo dark={onDark} />
          </Link>

          {/* ---------- Menu desktop ---------- */}
          <nav
            ref={navRef}
            aria-label="Điều hướng chính"
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-6">
              {mainNav.slice(1).map((item) => {
                const active = isActive(item);
                const expanded = openMenu === item.label;
                const linkTone = onDark
                  ? active || expanded
                    ? "text-accent-bright"
                    : "text-white/85 hover:text-white"
                  : active || expanded
                    ? "text-accent"
                    : "text-ink-mid hover:text-accent";

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        data-active={active}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "k3-navlink font-display text-[0.9375rem] font-medium transition-colors",
                          linkTone
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hoverOpen(item.label)}
                    onMouseLeave={hoverClose}
                  >
                    <span className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        data-active={active || expanded}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "k3-navlink font-display text-[0.9375rem] font-medium transition-colors",
                          linkTone
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-label={
                          expanded
                            ? `Đóng menu ${item.label}`
                            : `Mở menu ${item.label}`
                        }
                        onClick={() =>
                          setOpenMenu(expanded ? null : item.label)
                        }
                        className={cn(
                          "inline-flex h-8 w-6 cursor-pointer items-center justify-center rounded transition-colors",
                          linkTone
                        )}
                      >
                        <ChevronDown
                          size={15}
                          strokeWidth={2.5}
                          className={cn(
                            "transition-transform duration-200",
                            expanded && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </span>

                    {/* Bang xo xuong */}
                    <div
                      className={cn(
                        "absolute top-full left-0 z-50 pt-4 transition-[opacity,transform] duration-200 ease-out",
                        expanded
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1.5 opacity-0"
                      )}
                    >
                      <ul className="w-[19rem] overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-e3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              tabIndex={expanded ? 0 : -1}
                              className="block rounded-xl px-4 py-3 transition-colors hover:bg-canvas-alt"
                            >
                              <span className="block font-display text-[0.9375rem] font-semibold text-accent">
                                {child.label}
                              </span>
                              {child.hint ? (
                                <span className="mt-0.5 block text-[0.8125rem] text-muted-fg">
                                  {child.hint}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
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

      {/* ---------- Menu di dong ---------- */}
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
          {mainNav.map((item) => {
            const active = isActive(item);
            const expanded = openGroup === item.label;

            return (
              <li
                key={item.href}
                className="border-b border-line last:border-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 flex-1 items-center font-display text-lg font-medium transition-colors",
                      active ? "text-accent" : "text-ink hover:text-accent"
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={
                        expanded
                          ? `Thu gọn ${item.label}`
                          : `Mở rộng ${item.label}`
                      }
                      onClick={() =>
                        setOpenGroup(expanded ? null : item.label)
                      }
                      className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-mid transition-colors hover:bg-canvas"
                    >
                      <ChevronDown
                        size={20}
                        strokeWidth={2.5}
                        className={cn(
                          "transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}
                </div>

                {item.children ? (
                  <ul
                    hidden={!expanded}
                    className="mb-3 space-y-0.5 border-l-2 border-accent/30 pl-4"
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex min-h-12 items-center text-[0.9375rem] font-medium text-accent transition-colors hover:text-accent-dark"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="px-5 pt-2 pb-5">
          <a
            href={telHref(site.phoneRaw)}
            className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-cta px-6 font-display font-semibold text-white transition-colors hover:bg-cta-dark"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="tabular">Gọi ngay {site.phone}</span>
          </a>
        </div>
      </nav>
    </>
  );
}

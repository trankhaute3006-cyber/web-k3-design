import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { flatNav } from "@/data/nav";
import { Container } from "@/components/ui/Primitives";
import { Logo } from "@/components/layout/Logo";
import { telHref } from "@/lib/utils";

const socialIcons = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
} as const;

export function Footer() {
  const socials = (
    Object.entries(site.social) as [keyof typeof site.social, string][]
  ).filter(([key, url]) => url && key in socialIcons) as [
    keyof typeof socialIcons,
    string,
  ][];

  return (
    <div
      className="k3-inset bg-canvas"
      style={{ paddingBottom: "var(--inset)" }}
    >
      <footer className="k3-panel k3-on-dark relative bg-deep text-canvas/75">
        <div
          className="k3-grid-lines absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
            {/* Cot thuong hieu */}
            <div className="lg:col-span-4">
              <Logo dark />
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-canvas/65">
                {site.description}
              </p>

              {socials.length > 0 ? (
                <div className="mt-7 flex gap-3">
                  {socials.map(([key, url]) => {
                    const Icon = socialIcons[key];
                    const label =
                      key === "facebook"
                        ? "Facebook"
                        : key === "youtube"
                          ? "YouTube"
                          : "Instagram";
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} trên ${label}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-canvas/80 transition-colors hover:border-accent-bright hover:bg-accent-bright hover:text-ink"
                      >
                        <Icon size={18} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Lien ket */}
            <nav aria-label="Liên kết trang" className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
                Khám phá
              </h2>
              <ul className="mt-5 space-y-1">
                {flatNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-9 items-center text-[0.9375rem] text-canvas/65 transition-colors hover:text-accent-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Dich vu */}
            <nav aria-label="Dịch vụ" className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
                Dịch vụ
              </h2>
              <ul className="mt-5 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/dich-vu/#${s.slug}`}
                      className="inline-flex min-h-9 items-center text-[0.9375rem] text-canvas/65 transition-colors hover:text-accent-bright"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Lien he */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
                Liên hệ
              </h2>
              <ul className="mt-5 space-y-4 text-[0.9375rem]">
                <li className="flex gap-3">
                  <MapPin
                    size={18}
                    className="mt-1 shrink-0 text-accent-bright"
                    aria-hidden="true"
                  />
                  <span className="text-canvas/65">{site.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone
                    size={18}
                    className="mt-1 shrink-0 text-accent-bright"
                    aria-hidden="true"
                  />
                  <a
                    href={telHref(site.phoneRaw)}
                    className="tabular text-canvas/85 transition-colors hover:text-accent-bright"
                  >
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail
                    size={18}
                    className="mt-1 shrink-0 text-accent-bright"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-canvas/85 transition-colors hover:text-accent-bright"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock
                    size={18}
                    className="mt-1 shrink-0 text-accent-bright"
                    aria-hidden="true"
                  />
                  <span className="text-canvas/65">{site.workingHours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/12 py-7 text-sm text-canvas/62 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.legalName}. MST {site.taxCode}.
            </p>
            <p>Thiết kế &amp; phát triển bởi {site.name}.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

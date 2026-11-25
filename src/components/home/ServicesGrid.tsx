import Link from "next/link";
import {
  DraftingCompass,
  HardHat,
  Sofa,
  Ruler,
  Wrench,
  ClipboardCheck,
  SprayCan,
  ArrowRight,
} from "lucide-react";
import { serviceHref, services, type Service } from "@/data/services";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const iconMap = {
  drafting: DraftingCompass,
  hardhat: HardHat,
  sofa: Sofa,
  ruler: Ruler,
  wrench: Wrench,
  clipboard: ClipboardCheck,
  spray: SprayCan,
} as const;

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  return (
    <Reveal as="li" delay={index * 60}>
      <Link
        href={serviceHref(service.slug)}
        className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-e2 lg:p-8"
      >
        <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent-bright group-hover:text-ink">
          <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
        </span>

        <h3 className="mt-6 text-xl transition-colors group-hover:text-accent">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-fg">
          {service.short}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="tabular font-display text-sm font-semibold text-ink">
            {service.priceHint}
          </span>
          <ArrowRight
            size={19}
            className="text-accent transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <Section tone="canvas" id="dich-vu">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Chúng tôi làm được gì cho công trình của anh chị"
            description="Sáu nhóm dịch vụ bao phủ toàn bộ vòng đời một công trình. Anh chị có thể dùng trọn gói hoặc chỉ chọn phần mình cần."
          />
          <Link
            href="/dich-vu/"
            className="group hidden shrink-0 items-center gap-2 font-display font-semibold text-ink transition-colors hover:text-accent lg:inline-flex"
          >
            Xem chi tiết dịch vụ
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceItem key={service.slug} service={service} index={i} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  DraftingCompass,
  HardHat,
  Sofa,
  Ruler,
  Wrench,
  ClipboardCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";
import { faqs } from "@/data/content";
import {
  Button,
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/home/CtaBand";
import { DesignPricing } from "@/components/pricing/DesignPricing";

export const metadata: Metadata = {
  title: "Dịch vụ thiết kế & thi công",
  description:
    "Sáu nhóm dịch vụ của K3 Design: thiết kế kiến trúc, thi công trọn gói, nội thất, cải tạo, giám sát dự án và hồ sơ pháp lý xây dựng.",
  alternates: { canonical: "/dich-vu/" },
};

const iconMap = {
  drafting: DraftingCompass,
  hardhat: HardHat,
  sofa: Sofa,
  ruler: Ruler,
  wrench: Wrench,
  clipboard: ClipboardCheck,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dịch vụ"
        title="Sáu nhóm dịch vụ, dùng trọn gói hay chọn từng phần đều được"
        description="Anh chị không bắt buộc phải dùng hết. Nhiều khách hàng chỉ lấy thiết kế, hoặc chỉ cần chúng tôi giám sát cho đội thi công có sẵn."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]}
      />

      {/* Muc luc nhanh */}
      <div className="sticky top-[calc(var(--inset)+4.75rem)] z-30 bg-canvas/85 backdrop-blur-md">
        <Container>
          <nav aria-label="Danh sách dịch vụ" className="-mx-1 overflow-x-auto">
            <ul className="flex min-w-max gap-1 py-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`#${s.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-medium text-ink-mid transition-colors hover:border-accent hover:text-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <Section tone="canvas">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const flip = i % 2 === 1;
              return (
                <Reveal as="section" key={service.slug}>
                  <article
                    id={service.slug}
                    className="grid scroll-mt-40 gap-10 lg:grid-cols-12 lg:gap-14"
                  >
                    {/* Khoi so + icon */}
                    <div
                      className={`lg:col-span-4 ${flip ? "lg:order-2" : ""}`}
                    >
                      <div className="rounded-3xl border border-line bg-surface p-8 shadow-e1">
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                            <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
                          </span>
                          <span
                            className="tabular font-display text-4xl font-bold text-numeral"
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-7 font-display text-xs font-semibold tracking-[0.14em] text-muted-fg uppercase">
                          Chi phí tham khảo
                        </p>
                        <p className="tabular mt-1.5 font-display text-2xl font-bold text-ink">
                          {service.priceHint}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-fg">
                          Con số cuối cùng phụ thuộc quy mô, mức hoàn thiện và
                          điều kiện hiện trạng — được chốt sau buổi khảo sát.
                        </p>
                        <Button
                          href="/lien-he/"
                          className="mt-6 w-full"
                          variant="secondary"
                        >
                          Nhận báo giá cho hạng mục này
                          <ArrowRight size={17} aria-hidden="true" />
                        </Button>
                      </div>
                    </div>

                    {/* Noi dung */}
                    <div className={`lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
                      <h2 className="text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)]">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-mid">
                        {service.description}
                      </p>

                      <h3 className="mt-9 font-display text-sm font-semibold tracking-[0.14em] text-muted-fg uppercase">
                        Anh chị nhận được gì
                      </h3>
                      <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        {service.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <Check
                              size={19}
                              className="mt-0.5 shrink-0 text-accent"
                              strokeWidth={2.4}
                              aria-hidden="true"
                            />
                            <span className="text-[0.9375rem] leading-relaxed text-ink-mid">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>

                  {/* Bang gia that — moi hang muc chi hien phan lien quan */}
                  {service.slug === "thiet-ke-kien-truc" ? (
                    <div className="mt-10 lg:mt-12">
                      <DesignPricing view="kien-truc" />
                    </div>
                  ) : null}
                  {service.slug === "thiet-ke-thi-cong-noi-that" ? (
                    <div className="mt-10 lg:mt-12">
                      <DesignPricing view="noi-that" />
                    </div>
                  ) : null}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Câu hỏi thường gặp"
            title="Trước khi anh chị hỏi"
          />
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

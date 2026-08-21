import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { faqs } from "@/data/content";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/ui/Faq";
import { telHref, zaloHref } from "@/lib/utils";
import { breadcrumbSchema, faqSchema, graph, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Liên hệ & đặt lịch khảo sát",
  description:
    "Gửi yêu cầu tư vấn tới K3 Design. Chúng tôi phản hồi trong 24 giờ làm việc. Buổi khảo sát và khái toán chi phí đầu tiên miễn phí.",
  alternates: { canonical: "/lien-he/" },
};

const channels = [
  {
    icon: Phone,
    label: "Hotline",
    value: site.phone,
    href: telHref(site.phoneRaw),
    note: "Nhanh nhất trong giờ hành chính",
  },
  {
    icon: MessageCircle,
    label: "Zalo",
    value: site.phone,
    href: zaloHref(site.zalo),
    note: "Gửi được ảnh hiện trạng và bản vẽ",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Phù hợp gửi hồ sơ, yêu cầu báo giá",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        {...jsonLdProps(
          graph(
            faqSchema(faqs),
            breadcrumbSchema([
              { label: "Trang chủ", href: "/" },
              { label: "Liên hệ", href: "/lien-he/" },
            ])
          )
        )}
      />

      <PageHeader
        eyebrow="Liên hệ"
        title="Bắt đầu từ một buổi khảo sát miễn phí"
        description="Anh chị để lại thông tin, chúng tôi sẽ gọi lại trong vòng 24 giờ làm việc để hẹn lịch xem đất hoặc xem nhà."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />

      <Section tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9">
                <h2 className="text-2xl">Gửi yêu cầu tư vấn</h2>
                <p className="mt-2.5 text-[0.9375rem] text-muted-fg">
                  Mục có dấu <span className="text-danger">*</span> là bắt buộc.
                  Càng nhiều thông tin, buổi tư vấn đầu tiên càng sát nhu cầu.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Thong tin lien he */}
            <aside className="lg:col-span-5">
              <h2 className="text-2xl">Kênh liên hệ trực tiếp</h2>
              <ul className="mt-7 space-y-4">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex min-h-20 items-center gap-5 rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent/50 hover:shadow-e1"
                      >
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent-bright group-hover:text-ink">
                          <Icon size={21} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-xs font-semibold tracking-[0.12em] text-muted-fg uppercase">
                            {c.label}
                          </span>
                          <span className="tabular mt-0.5 block truncate font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                            {c.value}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted-fg">
                            {c.note}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 rounded-3xl border border-line bg-surface p-6">
                <h3 className="text-lg">Văn phòng</h3>
                <ul className="mt-5 space-y-4 text-[0.9375rem]">
                  <li className="flex gap-3">
                    <MapPin size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-ink-mid">{site.address}</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-ink-mid">{site.workingHours}</span>
                  </li>
                </ul>

                <div className="mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-canvas-alt">
                  <iframe
                    src={site.mapEmbedUrl}
                    title={`Bản đồ vị trí văn phòng ${site.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Cau hoi thuong gap */}
      <Section tone="alt">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Câu hỏi thường gặp"
            title="Những điều khách hàng hay hỏi trước khi bắt đầu"
          />
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}

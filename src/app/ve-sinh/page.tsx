import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Gift,
  HardHat,
  MinusCircle,
  Phone,
  Sparkles,
  SprayCan,
  UserCheck,
} from "lucide-react";
import { getService } from "@/data/services";
import { site } from "@/data/site";
import {
  Button,
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { CleaningPricing } from "@/components/pricing/CleaningPricing";
import { telHref } from "@/lib/utils";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  jsonLdProps,
  serviceSchema,
} from "@/lib/schema";

const service = getService("ve-sinh-cong-nghiep")!;

export const metadata: Metadata = {
  title: "Vệ sinh công nghiệp & vệ sinh sau xây dựng",
  description:
    "K3 Vệ Sinh: vệ sinh sau xây dựng, chà sàn bằng máy công nghiệp, vệ sinh kính nhà cao tầng và vệ sinh định kỳ. Giá từ 10.000 đ/m², khảo sát miễn phí.",
  alternates: { canonical: "/ve-sinh/" },
};

const packages = [
  {
    icon: HardHat,
    title: "Vệ sinh sau xây dựng",
    text: "Bóc keo silicon, tẩy vữa xi măng và vết sơn bám trên sàn, kính, khung cửa — để công trình sẵn sàng bàn giao hoặc dọn vào ở.",
  },
  {
    icon: Sparkles,
    title: "Chà sàn bằng máy",
    text: "Máy chà sàn công nghiệp giữ áp lực đều trên toàn bộ diện tích, sàn sạch đồng màu thay vì loang lổ như lau tay.",
  },
  {
    icon: Building2,
    title: "Vệ sinh kính nhà cao tầng",
    text: "Cả mặt trong lẫn mặt ngoài. Phần kính trên 4 mét thi công bằng dây chuyên dụng, đúng quy trình an toàn lao động.",
  },
  {
    icon: SprayCan,
    title: "Vệ sinh định kỳ",
    text: "Theo tháng hoặc theo quý cho văn phòng, showroom, nhà xưởng. Lịch cố định, cùng một đội làm để quen mặt bằng.",
  },
];

const steps = [
  {
    title: "Gọi hoặc gửi ảnh hiện trạng",
    text: "Anh chị gửi vài tấm ảnh và diện tích ước tính qua Zalo hoặc form liên hệ.",
  },
  {
    title: "Khảo sát, báo giá cố định",
    text: "Nhân viên tới xem tận nơi, miễn phí. Báo giá theo m² thực tế, chốt trước khi làm.",
  },
  {
    title: "Thi công 1 – 5 ngày",
    text: "Đội mang đủ máy móc, hóa chất phù hợp từng loại bề mặt. Không làm xước men gạch, kính.",
  },
  {
    title: "Nghiệm thu cùng chủ nhà",
    text: "Đi kiểm tra từng khu vực. Chỗ nào chưa đạt, đội xử lý lại ngay trong buổi.",
  },
];

const cleaningFaqs = [
  {
    question: "Vì sao không tự lau bằng nước lau nhà được?",
    answer:
      "Vữa, keo silicon và sơn sau xây dựng đã đóng rắn và liên kết với bề mặt. Nước lau nhà trung tính không phá được, còn chà mạnh bằng cọ kim loại sẽ để lại vết xước vĩnh viễn trên men gạch và kính.",
  },
  {
    question: "Giá tính thế nào, có phát sinh không?",
    answer:
      "Tính theo mét vuông thực tế: sàn 13.000 – 15.000 đ/m², kính dưới 4 m 10.000 đ/m² mỗi mặt, kính trên 4 m 20.000 đ/m² mỗi mặt. Giá được chốt sau khảo sát; công trình bám bẩn nặng báo riêng ngay từ đầu, không phát sinh khi đang làm.",
  },
  {
    question: "Nhà có đá marble, đá tự nhiên thì sao?",
    answer:
      "Khu vực đá tự nhiên phải tránh hóa chất gốc axit. Đội sẽ khoanh vùng và xử lý bằng phương pháp riêng cho đá trước khi làm phần còn lại.",
  },
  {
    question: "Bao lâu thì xong?",
    answer:
      "Thường 1 – 5 ngày tùy diện tích. Căn hộ dưới 100 m² đa phần xong trong một ngày.",
  },
];

export default function CleaningPage() {
  return (
    <>
      <script
        {...jsonLdProps(
          graph(
            serviceSchema([service]),
            faqSchema(cleaningFaqs),
            breadcrumbSchema([
              { label: "Trang chủ", href: "/" },
              { label: "Vệ sinh công nghiệp", href: "/ve-sinh/" },
            ])
          )
        )}
      />

      <PageHeader
        eyebrow="K3 Vệ Sinh"
        title="Vệ sinh công nghiệp, sạch tới từng mạch gạch"
        description={service.description}
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Vệ sinh công nghiệp" },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/lien-he/" size="lg">
            Đặt lịch khảo sát miễn phí
            <ArrowRight size={19} aria-hidden="true" />
          </Button>
          <Button href={telHref(site.phoneRaw)} size="lg" variant="onDark">
            <Phone size={18} aria-hidden="true" />
            <span className="tabular">{site.phone}</span>
          </Button>
        </div>
        <p className="tabular mt-6 inline-flex rounded-full bg-white/12 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/25">
          {service.priceHint} · {service.duration}
        </p>
      </PageHeader>

      {/* ---------- Cac goi dich vu ---------- */}
      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="Dịch vụ"
            title="Bốn việc chúng tôi nhận làm"
            description="Gọi lẻ từng hạng mục hoặc gộp chung một lần khảo sát đều được."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-e1">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <p.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-fg">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Bang gia ---------- */}
      <Section tone="alt" id="bang-gia">
        <Container>
          <SectionHeading
            eyebrow="Bảng giá"
            title="Giá rõ theo mét vuông"
            description="Đơn giá tham khảo. Con số cuối cùng chốt sau khảo sát và không phát sinh trong lúc làm."
          />
          <div className="mt-10">
            <CleaningPricing />
          </div>
        </Container>
      </Section>

      {/* ---------- Quy trinh ---------- */}
      <Section tone="canvas">
        <Container>
          <SectionHeading eyebrow="Quy trình" title="Bốn bước, không rườm rà" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <span
                    className="tabular font-display text-3xl font-bold text-numeral"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-fg">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------- Phu hop / khong bao gom ---------- */}
      <Section tone="alt">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-6 lg:col-span-1">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold tracking-[0.12em] text-muted-fg uppercase">
                <Check size={16} className="text-accent" aria-hidden="true" />
                Anh chị nhận được gì
              </h2>
              <ul className="mt-4 space-y-3">
                {service.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-mid">
                    <Check size={17} className="mt-1 shrink-0 text-accent" strokeWidth={2.4} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold tracking-[0.12em] text-muted-fg uppercase">
                <UserCheck size={16} className="text-accent" aria-hidden="true" />
                Phù hợp với
              </h2>
              <ul className="mt-4 space-y-3">
                {service.suitableFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-mid">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-6">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold tracking-[0.12em] text-muted-fg uppercase">
                <MinusCircle size={16} className="text-muted-fg" aria-hidden="true" />
                Không bao gồm
              </h2>
              <ul className="mt-4 space-y-3">
                {service.notIncluded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-fg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/khuyen-mai/"
            className="mt-8 flex items-center gap-4 rounded-2xl border border-cta/30 bg-surface p-6 transition-colors hover:border-cta"
          >
            <Gift className="h-8 w-8 shrink-0 text-cta" strokeWidth={1.75} aria-hidden="true" />
            <span className="flex-1">
              <span className="block font-display text-lg font-semibold text-ink">
                Vòng quay tri ân — 100% trúng thưởng
              </span>
              <span className="mt-1 block text-muted-fg">
                Cư dân chung cư có cơ hội nhận gói tổng vệ sinh miễn phí. Xem chi tiết chương trình.
              </span>
            </span>
            <ArrowRight className="shrink-0 text-cta" size={20} aria-hidden="true" />
          </Link>
        </Container>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section tone="canvas">
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="Câu hỏi thường gặp" title="Trước khi anh chị gọi" />
          <div className="mt-12">
            <Faq items={cleaningFaqs} />
          </div>
          <p className="mt-10 text-center text-muted-fg">
            Muốn hiểu kỹ hơn?{" "}
            <Link href="/tin-tuc/ve-sinh-sau-xay-dung/" className="font-semibold text-accent hover:underline">
              Đọc bài: Vệ sinh sau xây dựng — vì sao chổi và nước lau nhà không xử lý được
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}

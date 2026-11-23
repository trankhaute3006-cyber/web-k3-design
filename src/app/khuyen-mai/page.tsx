import type { Metadata } from "next";
import { Gift, Sparkles, Users } from "lucide-react";
import { promo, prizes, totalPrizes, totalValue } from "@/data/promo";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PromoWheelDemo } from "@/components/promo/PromoWheelDemo";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: promo.name,
  description: promo.summary,
  alternates: { canonical: "/khuyen-mai/" },
};

const highlights = [
  {
    icon: Gift,
    title: "100% trúng thưởng",
    text: `Quỹ giải ${totalPrizes} phần quà cho mỗi tòa, không có ô "chúc may mắn lần sau".`,
  },
  {
    icon: Users,
    title: "Mỗi căn một lượt",
    text: "Không cần mua gì trước. Nhân viên K3 đối chiếu số căn rồi bấm quay ngay tại sảnh.",
  },
  {
    icon: Sparkles,
    title: "Nhận quà tại chỗ",
    text: "Quà trao ngay tại bàn K3. Voucher và gói dịch vụ dùng trong 90 ngày.",
  },
];

export default function PromoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Khuyến mãi"
        title={promo.name}
        description={promo.summary}
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Khuyến mãi" }]}
      >
        <p className="mt-6 inline-flex rounded-full bg-white/12 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/25">
          {promo.period}
        </p>
      </PageHeader>

      {/* ---------- Ba diem chinh ---------- */}
      <Section tone="canvas">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <div className="h-full rounded-lg border border-line bg-surface p-6">
                  <h.icon
                    className="h-7 w-7 text-cta"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-xl">{h.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted-fg">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Banh xe quay thu ---------- */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Vòng quay"
            title="Quay thử xem cơ cấu giải"
            description="Tỉ lệ dưới đây đúng bằng quỹ giải thật của một tòa nhà. Lượt quay trên website chỉ để xem trước, không tính là trúng thưởng."
          />
          <div className="mt-12">
            <PromoWheelDemo />
          </div>
        </Container>
      </Section>

      {/* ---------- Co cau giai ---------- */}
      <Section tone="canvas">
        <Container>
          <SectionHeading
            eyebrow="Cơ cấu giải"
            title={`${totalPrizes} phần quà cho mỗi tòa chung cư`}
            description={`Tổng giá trị quỹ giải ${totalValue.toLocaleString(
              "vi-VN"
            )} đ cho một tòa. Giải nào hết thì không ra nữa.`}
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="py-3 pr-4 font-display text-sm">Phần quà</th>
                  <th className="py-3 pr-4 text-right font-display text-sm">
                    Trị giá
                  </th>
                  <th className="py-3 text-right font-display text-sm">
                    Số lượng
                  </th>
                </tr>
              </thead>
              <tbody>
                {prizes.map((p) => (
                  <tr key={p.name} className="border-b border-line">
                    <td className="py-4 pr-4">
                      <span className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-sm"
                          style={{ background: p.color }}
                        />
                        <span>{p.name}</span>
                      </span>
                    </td>
                    <td className="tabular py-4 pr-4 text-right whitespace-nowrap">
                      {p.value.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="tabular py-4 text-right">{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ---------- The le ---------- */}
      <Section tone="alt">
        <Container>
          <SectionHeading eyebrow="Thể lệ" title="Sáu điều cần biết" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2">
            {promo.rules.map((rule, i) => (
              <Reveal as="li" key={rule} delay={i * 40}>
                <div className="flex h-full gap-4 rounded-lg border border-line bg-surface p-5">
                  <span
                    className="tabular font-display text-2xl leading-none font-bold text-numeral"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{rule}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted-fg">
            Chương trình do K3 Vệ Sinh tổ chức, áp dụng tại các tòa chung cư đã
            thống nhất lịch đặt booth với ban quản lý. Thời gian: {promo.period}.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

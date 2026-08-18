import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { values } from "@/data/content";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "K3 Design — đơn vị thiết kế kiến trúc và thi công xây dựng trọn gói. Câu chuyện, con người và cách chúng tôi làm việc.",
  alternates: { canonical: "/gioi-thieu/" },
};

const milestones = [
  {
    year: "2023",
    title: "Thành lập K3 Design",
    text: "Một nhóm kiến trúc sư và kỹ sư kết cấu tách ra làm riêng, nhận những công trình nhà phố đầu tiên tại khu vực Gò Vấp và Tân Bình.",
  },
  {
    year: "2024",
    title: "Nhận thi công trọn gói",
    text: "Sau nhiều lần chứng kiến bản vẽ bị thi công sai lệch, chúng tôi quyết định tự đứng ra nhận cả phần thi công để kiểm soát chất lượng đến cùng.",
  },
  {
    year: "2025",
    title: "Chuẩn hóa quy trình và hợp đồng",
    text: "Ban hành bộ hợp đồng mẫu có bảng vật tư chi tiết theo thương hiệu, điều khoản ràng buộc tiến độ và quy trình nghiệm thu từng giai đoạn.",
  },
  {
    year: "2026",
    title: "Hơn 20 công trình đã bàn giao",
    text: "Đội ngũ 10 kỹ sư và kiến trúc sư, thực hiện công trình tại TP.HCM và các tỉnh lân cận như Long An, Bình Dương, Đồng Nai.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Về chúng tôi"
        title="Chúng tôi làm nghề xây dựng theo cách của người sẽ phải ở lại"
        description="Một công trình được bàn giao không phải là điểm kết thúc. Nó là thứ gia chủ sống cùng trong hai mươi năm tới, và là thứ chúng tôi phải chịu trách nhiệm."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
      />

      {/* Cau chuyen */}
      <Section tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-canvas-alt">
                <Image
                  src="/images/about-office.svg"
                  alt="Không gian làm việc của đội ngũ thiết kế K3 Design"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Câu chuyện"
                title="Bắt đầu từ sự khó chịu với cách làm cũ"
              />
              <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-mid">
                <p>
                  Năm 2023, {site.name} bắt đầu như một xưởng thiết kế nhỏ.
                  Chúng tôi vẽ, bàn giao hồ sơ, rồi chứng kiến nhiều bản vẽ bị
                  thi công sai lệch đến mức không còn nhận ra. Chủ nhà thì kẹt ở
                  giữa, không biết trách ai.
                </p>
                <p>
                  Một năm sau, chúng tôi quyết định nhận luôn phần thi công.
                  Không phải để mở rộng doanh thu, mà vì đó là cách duy nhất để
                  chịu trách nhiệm đến cùng cho thứ mình đã vẽ ra.
                </p>
                <p>
                  Đến nay là hơn 20 công trình. Con số chưa lớn, nhưng điều
                  chúng tôi giữ nguyên từ ngày đầu là nguyên tắc: mọi con số phải
                  nằm trên giấy trước khi máy trộn bê tông chạy.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-4">
                {site.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-line bg-surface p-6">
                    <dt className="text-sm text-muted-fg">{stat.label}</dt>
                    <dd className="mt-1.5 font-display text-3xl font-bold text-ink">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Nguyen tac */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Nguyên tắc làm việc"
            title="Bốn điều được ghi thành điều khoản, không phải khẩu hiệu"
            description="Mỗi nguyên tắc dưới đây đều tương ứng với một điều khoản cụ thể trong hợp đồng chúng tôi ký với khách hàng."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 60}>
                <div className="h-full rounded-3xl border border-line bg-surface p-8 lg:p-10">
                  <span
                    className="tabular font-display text-sm font-bold tracking-[0.16em] text-accent"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl">{value.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-fg">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Cot moc */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Cột mốc"
            title="Ba năm, từng bước một"
          />
          <ol className="mt-14 space-y-0">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 50}>
                <div className="grid gap-4 border-t border-line-strong py-8 sm:grid-cols-12 sm:gap-8">
                  <div className="sm:col-span-2">
                    <span className="tabular font-display text-2xl font-bold text-accent">
                      {m.year}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="text-lg">{m.title}</h3>
                    <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-fg">
                      {m.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

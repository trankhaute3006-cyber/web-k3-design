import Image from "next/image";
import { values } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <Section tone="alt">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Anh */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-canvas">
                <Image
                  src="/images/about-team.svg"
                  alt="Đội ngũ kỹ sư và kiến trúc sư K3 Design trao đổi phương án tại công trường"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* Khoi so lieu chong len anh */}
              <div className="absolute -right-4 -bottom-6 max-w-[15rem] rounded-2xl bg-accent-bright p-6 text-ink shadow-e3 sm:-right-8">
                <span className="tabular block font-display text-4xl font-bold">
                  48h
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-ink-mid">
                  Thời gian tối đa xử lý yêu cầu bảo hành sau bàn giao
                </span>
              </div>
            </div>
          </Reveal>

          {/* Noi dung */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Vì sao chọn chúng tôi"
              title="Bốn nguyên tắc chúng tôi không thỏa hiệp"
              description="Đây không phải khẩu hiệu. Cả bốn điều dưới đây đều được cụ thể hóa thành điều khoản trong hợp đồng ký với khách hàng."
            />

            <ol className="mt-12 space-y-10">
              {values.map((value, i) => (
                <Reveal as="li" key={value.title} delay={i * 60}>
                  <div className="flex gap-6">
                    <span
                      className="tabular shrink-0 font-display text-3xl leading-none font-bold text-numeral"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="border-l border-line pl-6">
                      <h3 className="text-lg">{value.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-fg">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

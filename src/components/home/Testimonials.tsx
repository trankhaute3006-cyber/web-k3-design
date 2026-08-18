import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <Section tone="canvas">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Khách hàng nói gì"
          title="Nhận xét sau khi công trình đã bàn giao"
          description="Chúng tôi chỉ đăng nhận xét của chủ nhà sau khi họ đã sử dụng công trình ít nhất ba tháng."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal as="article" key={item.name} delay={i * 70}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 lg:p-8">
                <Quote
                  size={30}
                  className="text-accent/30"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink-mid">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  <span className="block font-display font-semibold text-ink">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-fg">
                    {item.role} · {item.project}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

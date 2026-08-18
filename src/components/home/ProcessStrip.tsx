import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/data/content";
import {
  Container,
  PanelSection,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessStrip() {
  return (
    <PanelSection tone="deep" className="py-16 sm:py-20 lg:py-24">
      <div
        className="k3-grid-lines absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            invert
            eyebrow="Quy trình"
            title="Sáu bước, không bước nào bị bỏ qua"
            description="Anh chị luôn biết mình đang ở đâu trong hành trình và bước tiếp theo cần gì."
          />
          <Link
            href="/quy-trinh/"
            className="group hidden shrink-0 items-center gap-2 font-display font-semibold text-white transition-colors hover:text-accent-bright lg:inline-flex"
          >
            Xem quy trình đầy đủ
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 50}>
              <div className="h-full rounded-3xl border border-white/12 bg-white/[0.05] p-7 transition-colors duration-300 hover:border-accent-bright/40 hover:bg-white/[0.09]">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="tabular font-display text-3xl font-bold text-accent-bright">
                    {step.step}
                  </span>
                  <span className="font-display text-xs tracking-[0.12em] text-canvas/55 uppercase">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-5 text-lg text-white">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-canvas/70">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 lg:hidden">
          <Link
            href="/quy-trinh/"
            className="inline-flex items-center gap-2 font-display font-semibold text-white transition-colors hover:text-accent-bright"
          >
            Xem quy trình đầy đủ
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </PanelSection>
  );
}

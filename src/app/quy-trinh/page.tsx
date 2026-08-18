import type { Metadata } from "next";
import { FileCheck2 } from "lucide-react";
import { processSteps } from "@/data/content";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Quy trình làm việc",
  description:
    "Sáu bước từ khảo sát đến bàn giao và bảo hành. Mỗi bước có thời lượng dự kiến và danh mục hồ sơ bàn giao cụ thể.",
  alternates: { canonical: "/quy-trinh/" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quy trình"
        title="Sáu bước, mỗi bước có hồ sơ bàn giao cụ thể"
        description="Anh chị luôn biết mình đang ở đâu, bước tiếp theo cần gì và sẽ nhận được tài liệu nào."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Quy trình" }]}
      />

      <Section tone="canvas">
        <Container>
          <ol className="relative space-y-0">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 50}>
                <div className="group relative grid gap-6 border-t border-line py-10 sm:grid-cols-12 sm:gap-10 lg:py-14">
                  {/* So thu tu */}
                  <div className="sm:col-span-3 lg:col-span-2">
                    <span
                      className="tabular font-display text-[3.5rem] leading-none font-bold text-numeral transition-colors duration-300 group-hover:text-accent lg:text-[4.5rem]"
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                    <p className="mt-2 font-display text-xs font-semibold tracking-[0.12em] text-accent uppercase">
                      {step.duration}
                    </p>
                  </div>

                  {/* Mo ta */}
                  <div className="sm:col-span-9 lg:col-span-6">
                    <h2 className="text-2xl">{step.title}</h2>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-fg">
                      {step.description}
                    </p>
                  </div>

                  {/* Ho so ban giao */}
                  <div className="sm:col-span-9 sm:col-start-4 lg:col-span-4 lg:col-start-9">
                    <div className="rounded-2xl border border-line bg-surface p-6">
                      <h3 className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.14em] text-muted-fg uppercase">
                        <FileCheck2 size={16} className="text-accent" aria-hidden="true" />
                        Hồ sơ bàn giao
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {step.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-mid"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
                              aria-hidden="true"
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Cam ket */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Cam kết"
            title="Ba điều luôn đúng ở mọi công trình"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Không phát sinh miệng",
                text: "Mọi thay đổi về khối lượng hoặc vật tư phải có phiếu xác nhận anh chị ký trước khi thực hiện. Không có ngoại lệ.",
              },
              {
                title: "Không đổi vật tư âm thầm",
                text: "Nếu thương hiệu trong hợp đồng hết hàng, chúng tôi đề xuất phương án thay thế và chờ anh chị duyệt, chứ không tự quyết.",
              },
              {
                title: "Không bàn giao khi còn lỗi",
                text: "Danh sách điểm cần chỉnh phải được xử lý hết trước khi ký biên bản bàn giao, kể cả những lỗi nhỏ về thẩm mỹ.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-3xl border border-line bg-surface p-8">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-fg">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

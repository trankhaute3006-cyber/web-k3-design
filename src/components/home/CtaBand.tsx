import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Button, Container, PanelSection } from "@/components/ui/Primitives";
import { telHref } from "@/lib/utils";

export function CtaBand() {
  return (
    <PanelSection tone="lime">
      <div
        className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-white/25 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] text-ink">
              Anh chị đang có một khu đất hoặc một căn nhà cần cải tạo?
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-mid">
              Gửi thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc để
              hẹn lịch khảo sát. Buổi khảo sát và khái toán chi phí đầu tiên
              hoàn toàn miễn phí.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              href="/lien-he/"
              size="lg"
              className="bg-deep text-white hover:bg-ink"
            >
              Đặt lịch khảo sát
              <ArrowRight size={19} aria-hidden="true" />
            </Button>
            <Button
              href={telHref(site.phoneRaw)}
              size="lg"
              variant="secondary"
              className="border-deep/30 text-ink hover:border-deep hover:bg-white"
            >
              <Phone size={18} aria-hidden="true" />
              <span className="tabular">{site.phone}</span>
            </Button>
          </div>
        </div>
      </Container>
    </PanelSection>
  );
}

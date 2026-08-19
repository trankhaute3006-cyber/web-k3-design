import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { site } from "@/data/site";
import { flatNav } from "@/data/nav";
import { Button, Container } from "@/components/ui/Primitives";
import { telHref } from "@/lib/utils";

export const metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <div className="k3-inset k3-on-dark relative isolate bg-canvas" style={{ paddingBottom: "var(--inset)" }}>
      <div className="k3-panel relative overflow-hidden bg-deep">
      <div className="k3-grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative flex min-h-[80vh] flex-col justify-center py-32 text-center">
        <span
          className="tabular font-display text-[clamp(4rem,3rem+8vw,10rem)] leading-none font-bold text-accent-bright/20"
          aria-hidden="true"
        >
          404
        </span>
        <h1 className="-mt-4 text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] text-white">
          Trang này không tồn tại
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-canvas/75">
          Có thể đường dẫn đã thay đổi hoặc anh chị gõ nhầm địa chỉ. Thử một
          trong các mục dưới đây nhé.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg" variant="sky">
            <Home size={18} aria-hidden="true" />
            Về trang chủ
          </Button>
          <Button href={telHref(site.phoneRaw)} size="lg" variant="onDark">
            <Phone size={18} aria-hidden="true" />
            <span className="tabular">{site.phone}</span>
          </Button>
        </div>

        <nav aria-label="Các trang chính" className="mt-14">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {flatNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-canvas/60 transition-colors hover:text-accent-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      </div>
    </div>
  );
}

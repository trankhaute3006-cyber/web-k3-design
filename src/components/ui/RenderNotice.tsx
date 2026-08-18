import { Info } from "lucide-react";

/**
 * Ghi chu cho nguoi xem biet hinh anh la phoi canh thiet ke,
 * khong phai anh chup cong trinh da hoan thanh.
 *
 * [SUA] Khi da thay bang anh chup cong trinh that, xoa component nay
 * khoi cac trang: du-an, du-an/[slug] va khoi FeaturedWork o trang chu.
 */
export function RenderNotice({ className }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2.5 rounded-2xl border border-line bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-mid ${className ?? ""}`}
    >
      <Info
        size={17}
        className="mt-0.5 shrink-0 text-accent"
        aria-hidden="true"
      />
      <span>
        Hình ảnh trong mục này là <strong className="font-semibold">phối cảnh thiết kế</strong>,
        dùng để minh họa phong cách và giải pháp không gian. Ảnh chụp công trình
        thực tế được cung cấp trực tiếp khi anh chị tới văn phòng hoặc theo yêu cầu.
      </span>
    </p>
  );
}

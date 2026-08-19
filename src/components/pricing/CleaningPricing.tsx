import { Info, ArrowRight } from "lucide-react";
import {
  cleaningNote,
  floorCleaning,
  formatVnd,
  glassCleaning,
} from "@/data/pricing";
import { Button } from "@/components/ui/Primitives";

const th =
  "px-4 py-3.5 text-left font-display text-xs font-semibold tracking-[0.1em] text-muted-fg uppercase whitespace-nowrap";
const td = "px-4 py-4 align-middle text-[0.9375rem] text-ink-mid";
const tdPrice =
  "tabular px-4 py-4 align-middle text-right font-display font-bold whitespace-nowrap text-accent";

const unit = (
  <span className="ml-1 font-sans text-xs font-medium text-muted-fg">đ/m²</span>
);

export function CleaningPricing() {
  return (
    <section
      aria-labelledby="bang-gia-ve-sinh"
      className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:p-10"
    >
      <h3
        id="bang-gia-ve-sinh"
        className="text-[clamp(1.25rem,1rem+1vw,1.75rem)]"
      >
        Bảng giá vệ sinh công nghiệp
      </h3>
      <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-fg">
        Tính theo mét vuông bề mặt cần làm sạch. Riêng phần kính, đơn giá phụ
        thuộc độ cao vì trên 4 m phải thi công bằng dây chuyên dụng thay vì
        thang thường.
      </p>

      {/* ---------- Bang 1: ve sinh san ---------- */}

      <h4 className="mt-9 font-display text-sm font-semibold tracking-[0.12em] text-ink uppercase">
        Vệ sinh sàn
      </h4>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <caption className="sr-only">
            Đơn giá vệ sinh sàn tính theo mét vuông
          </caption>
          <thead className="bg-canvas-alt">
            <tr>
              <th scope="col" className={th}>
                Hạng mục
              </th>
              <th scope="col" className={`${th} text-right`}>
                Đơn giá
              </th>
              <th scope="col" className={th}>
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {floorCleaning.map((row) => (
              <tr key={row.item} className="transition-colors hover:bg-canvas">
                <th
                  scope="row"
                  className={`${td} font-display font-semibold text-ink`}
                >
                  {row.item}
                </th>
                <td className={tdPrice}>
                  {formatVnd(row.min)} – {formatVnd(row.max)}
                  {unit}
                </td>
                <td className={td}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Bang 2: ve sinh kinh ---------- */}

      <h4 className="mt-10 font-display text-sm font-semibold tracking-[0.12em] text-ink uppercase">
        Vệ sinh kính nhà cao tầng
      </h4>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-left">
          <caption className="sr-only">
            Đơn giá vệ sinh kính nhà cao tầng theo độ cao và mặt kính
          </caption>
          <thead className="bg-canvas-alt">
            <tr>
              <th scope="col" className={th}>
                Độ cao
              </th>
              <th scope="col" className={`${th} text-right`}>
                Mặt ngoài
              </th>
              <th scope="col" className={`${th} text-right`}>
                Mặt trong
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {glassCleaning.map((row) => (
              <tr key={row.height} className="transition-colors hover:bg-canvas">
                <th
                  scope="row"
                  className={`${td} font-display font-semibold text-ink whitespace-nowrap`}
                >
                  {row.height}
                </th>
                <td className={tdPrice}>
                  {formatVnd(row.outside)}
                  {unit}
                </td>
                <td className={tdPrice}>
                  {formatVnd(row.inside)}
                  {unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-muted-fg sm:hidden">
        Vuốt ngang trên bảng để xem đủ các cột.
      </p>

      {/* ---------- Ghi chu + CTA ---------- */}

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-7 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex max-w-2xl items-start gap-2.5 text-sm leading-relaxed text-ink-mid">
          <Info
            size={17}
            className="mt-0.5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>{cleaningNote}</span>
        </p>
        <Button href="/lien-he/" className="shrink-0">
          Nhận báo giá chi tiết
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

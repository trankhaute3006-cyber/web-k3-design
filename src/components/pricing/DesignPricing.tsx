import { Info, ArrowRight } from "lucide-react";
import {
  areaBands,
  formatVnd,
  packagePrices,
  pricingNote,
  unitPrices,
} from "@/data/pricing";
import { Button } from "@/components/ui/Primitives";

/* Kieu dung chung cho ca hai bang */
const th =
  "px-4 py-3.5 text-left font-display text-xs font-semibold tracking-[0.1em] text-muted-fg uppercase whitespace-nowrap";
const td = "px-4 py-4 align-middle text-[0.9375rem] text-ink-mid";
const tdPrice =
  "tabular px-4 py-4 align-middle text-right font-display font-bold whitespace-nowrap text-accent";

export function DesignPricing() {
  return (
    <section
      aria-labelledby="bang-gia-thiet-ke"
      className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:p-10"
    >
      <h3
        id="bang-gia-thiet-ke"
        className="text-[clamp(1.25rem,1rem+1vw,1.75rem)]"
      >
        Bảng giá thiết kế
      </h3>
      <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-fg">
        Anh chị chọn một trong hai cách tính: theo mét vuông sàn, hoặc theo gói
        trọn gói cố định cho từng khoảng diện tích. Gói trọn gói thường có lợi
        hơn với công trình nhỏ và vừa.
      </p>

      {/* ---------- Bang 1: don gia theo m2 ---------- */}

      <h4 className="mt-9 font-display text-sm font-semibold tracking-[0.12em] text-ink uppercase">
        Cách 1 — Tính theo mét vuông
      </h4>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            Đơn giá thiết kế tính theo mét vuông sàn
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
                Hồ sơ bàn giao
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {unitPrices.map((row) => (
              <tr key={row.item} className="transition-colors hover:bg-canvas">
                <th
                  scope="row"
                  className={`${td} font-display font-semibold text-ink`}
                >
                  {row.item}
                </th>
                <td className={tdPrice}>
                  {formatVnd(row.pricePerM2)}
                  <span className="ml-1 font-sans text-xs font-medium text-muted-fg">
                    đ/m²
                  </span>
                </td>
                <td className={td}>{row.deliverable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Bang 2: goi tron goi ---------- */}

      <h4 className="mt-10 font-display text-sm font-semibold tracking-[0.12em] text-ink uppercase">
        Cách 2 — Gói trọn gói theo diện tích
      </h4>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">
            Giá gói thiết kế trọn gói theo từng khoảng diện tích, đơn vị đồng
          </caption>
          <thead className="bg-canvas-alt">
            <tr>
              <th scope="col" className={th}>
                Gói thiết kế
              </th>
              {areaBands.map((band) => (
                <th key={band} scope="col" className={`${th} text-right`}>
                  {band}
                </th>
              ))}
              <th scope="col" className={th}>
                Bàn giao
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {packagePrices.map((row) => (
              <tr key={row.name} className="transition-colors hover:bg-canvas">
                <th
                  scope="row"
                  className={`${td} font-display font-semibold text-ink`}
                >
                  {row.name}
                </th>
                {row.prices.map((p, i) => (
                  <td key={areaBands[i]} className={tdPrice}>
                    {formatVnd(p)}
                    <span className="ml-1 font-sans text-xs font-medium text-muted-fg">
                      đ
                    </span>
                  </td>
                ))}
                <td className={`${td} whitespace-nowrap`}>
                  <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                    {row.deliverable}
                  </span>
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
          <span>{pricingNote}</span>
        </p>
        <Button href="/lien-he/" className="shrink-0">
          Nhận báo giá chi tiết
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

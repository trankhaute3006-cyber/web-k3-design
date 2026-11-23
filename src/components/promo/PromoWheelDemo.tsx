"use client";

import { useRef, useState } from "react";
import { PrizeWheel, spinAngle } from "./PrizeWheel";
import { prizes, totalPrizes } from "@/data/promo";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Primitives";
import { telHref, zaloHref } from "@/lib/utils";

/**
 * Banh xe tren TRANG CONG KHAI — quay THU, khong trao giai.
 *
 * Co y khong luu gi va khong tru quy giai: quy giai la cua tung toa nha,
 * nhan vien truc booth moi tru duoc (trang /vong-quay/). Neu trang nay
 * trao giai that thi moi nguoi vao web deu "trung" goi 1.200.000d,
 * trong khi ca toa chi co 1 suat.
 */

/** Rut theo dung ty le so luong that, de khach khong ky vong sai */
function drawIndex() {
  const r = Math.random() * totalPrizes;
  let acc = 0;
  for (let i = 0; i < prizes.length; i++) {
    acc += prizes[i].quantity;
    if (r < acc) return i;
  }
  return prizes.length - 1;
}

export function PromoWheelDemo() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  // Ket qua rut ra ngay luc bam, nhung chi hien khi banh xe dung han
  const pending = useRef<number | null>(null);

  const spin = () => {
    if (spinning) return;
    const i = drawIndex();
    pending.current = i;
    setLanded(null);
    setSpinning(true);
    setRotation((r) => spinAngle(r, i, prizes.length));
  };

  const onSpinEnd = () => {
    setSpinning(false);
    setLanded(pending.current);
  };

  const result = landed === null ? null : prizes[landed];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <PrizeWheel prizes={prizes} rotation={rotation} onSpinEnd={onSpinEnd} />

      <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
        <span className="k3-eyebrow">Quay thử</span>
        <h3 className="mt-3 text-2xl">Xem mình có thể trúng gì</h3>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-fg">
          Đây là lượt quay thử trên website, tỉ lệ đúng như quỹ giải thật nhưng{" "}
          <strong className="text-ink">không tính là trúng thưởng</strong>. Lượt
          quay thật diễn ra tại bàn K3 ở sảnh tòa nhà, nhân viên đối chiếu số
          căn hộ rồi bấm quay.
        </p>

        <Button
          variant="primary"
          size="lg"
          className="mt-6 w-full"
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? "Đang quay…" : "Quay thử"}
        </Button>

        <div className="mt-5 min-h-[6.5rem]" role="status" aria-live="polite">
          {result ? (
            <div
              className="rounded-md border-t-4 bg-canvas p-5"
              style={{ borderTopColor: result.color }}
            >
              <p className="text-sm text-muted-fg">Quay thử trúng</p>
              <p className="mt-1 font-display text-xl font-bold text-ink">
                {result.name}
              </p>
              <p className="tabular mt-1 text-muted-fg">
                Trị giá {result.value.toLocaleString("vi-VN")} đ
              </p>
              <p className="mt-3 text-sm text-muted-fg">
                Muốn quay thật? Gọi K3 để hẹn lịch đặt booth tại tòa nhà của
                bạn.
              </p>
            </div>
          ) : spinning ? null : (
            <p className="text-sm text-muted-fg">
              Bấm “Quay thử” để xem cơ cấu giải hoạt động thế nào.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="navy" href={telHref(site.phoneRaw)}>
            Gọi {site.phone}
          </Button>
          <Button variant="secondary" href={zaloHref(site.zalo)} external>
            Nhắn Zalo
          </Button>
        </div>
      </div>
    </div>
  );
}

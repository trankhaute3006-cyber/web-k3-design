/**
 * BANG GIA THIET KE — so lieu that do K3 Design cung cap.
 *
 * [SUA] Doi gia o day la ca website tu cap nhat.
 * Don vi: dong (VND). Chi ghi so, phan cach hang nghin do formatVnd lo.
 *
 * scope quyet dinh dong nay hien o muc dich vu nao:
 *   "kien-truc"  -> chi hien o muc Thiet ke kien truc
 *   "noi-that"   -> chi hien o muc Thiet ke & thi cong noi that
 *   "ca-hai"     -> goi gop ca kien truc lan noi that, hien o muc kien truc
 */

export type Scope = "kien-truc" | "noi-that" | "ca-hai";

/** Muc dang xem: quyet dinh loc nhung dong nao */
export type PricingView = "kien-truc" | "noi-that";

/* ---------- Don gia tinh theo met vuong ---------- */

export type UnitPrice = {
  item: string;
  pricePerM2: number;
  deliverable: string;
  scope: Scope;
};

export const unitPrices: UnitPrice[] = [
  {
    item: "Thiết kế kiến trúc",
    pricePerM2: 210_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai kiến trúc",
    scope: "kien-truc",
  },
  {
    item: "Thiết kế nội thất",
    pricePerM2: 160_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai nội thất",
    scope: "noi-that",
  },
  {
    item: "Thiết kế kiến trúc + nội thất",
    pricePerM2: 260_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai kiến trúc + nội thất",
    scope: "ca-hai",
  },
];

/* ---------- Goi tron goi theo khoang dien tich ---------- */

/** Cac khoang dien tich, dung lam tieu de cot cua bang goi */
export const areaBands = ["0 – 100 m²", "100 – 300 m²", "300 – 500 m²"] as const;

export type PackagePrice = {
  name: string;
  /** Gia theo thu tu cua areaBands */
  prices: [number, number, number];
  deliverable: string;
  scope: Scope;
};

export const packagePrices: PackagePrice[] = [
  {
    name: "Gói thiết kế FnB (kiến trúc + nội thất)",
    prices: [19_000_000, 31_000_000, 63_000_000],
    deliverable: "Kiến trúc + nội thất",
    scope: "ca-hai",
  },
  {
    name: "Gói thiết kế nhà ở (kiến trúc + nội thất)",
    prices: [19_000_000, 31_000_000, 63_000_000],
    deliverable: "Kiến trúc + nội thất",
    scope: "ca-hai",
  },
  {
    name: "Gói thiết kế FnB (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
    scope: "noi-that",
  },
  {
    name: "Gói thiết kế nhà ở (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
    scope: "noi-that",
  },
  {
    name: "Gói thiết kế căn hộ chung cư (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
    scope: "noi-that",
  },
];

/**
 * Muc "Thiet ke kien truc" hien ca dong kien truc lan dong gop ca hai,
 * vi goi gop van la san pham cua hang muc kien truc.
 * Muc "Noi that" chi hien dung nhung dong noi that thuan.
 */
export function inView<T extends { scope: Scope }>(rows: T[], view: PricingView) {
  return rows.filter((r) =>
    view === "kien-truc"
      ? r.scope === "kien-truc" || r.scope === "ca-hai"
      : r.scope === "noi-that"
  );
}

/** Ghi chu bat buoc hien duoi bang */
export const pricingNote =
  "Giá trên chưa bao gồm chi phí triển khai kết cấu và MEP (điện, nước, điều hòa, phòng cháy).";

/** Ghi chu rieng cho muc noi that: bang nay la phi THIET KE */
export const interiorNote =
  "Đây là phí thiết kế nội thất. Chi phí thi công và sản xuất đồ gỗ được báo riêng sau khi khảo sát hiện trạng và chốt bảng vật tư.";

/** 19000000 -> "19.000.000" */
export function formatVnd(n: number) {
  return n.toLocaleString("vi-VN");
}

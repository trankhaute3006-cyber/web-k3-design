/**
 * BANG GIA THIET KE — so lieu that do K3 Design cung cap.
 *
 * [SUA] Doi gia o day la ca bang tren website tu cap nhat.
 * Don vi: dong (VND). Chi ghi so, phan cach hang nghin do ham formatVnd lo.
 */

/* ---------- Don gia tinh theo met vuong ---------- */

export type UnitPrice = {
  item: string;
  pricePerM2: number;
  deliverable: string;
};

export const unitPrices: UnitPrice[] = [
  {
    item: "Thiết kế kiến trúc",
    pricePerM2: 210_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai kiến trúc",
  },
  {
    item: "Thiết kế nội thất",
    pricePerM2: 160_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai nội thất",
  },
  {
    item: "Thiết kế kiến trúc + nội thất",
    pricePerM2: 260_000,
    deliverable: "Bản vẽ 2D, 3D, triển khai kiến trúc + nội thất",
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
};

export const packagePrices: PackagePrice[] = [
  {
    name: "Gói thiết kế FnB (kiến trúc + nội thất)",
    prices: [19_000_000, 31_000_000, 63_000_000],
    deliverable: "Kiến trúc + nội thất",
  },
  {
    name: "Gói thiết kế nhà ở (kiến trúc + nội thất)",
    prices: [19_000_000, 31_000_000, 63_000_000],
    deliverable: "Kiến trúc + nội thất",
  },
  {
    name: "Gói thiết kế FnB (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
  },
  {
    name: "Gói thiết kế nhà ở (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
  },
  {
    name: "Gói thiết kế căn hộ chung cư (nội thất)",
    prices: [16_000_000, 27_000_000, 47_000_000],
    deliverable: "Nội thất",
  },
];

/** Ghi chu bat buoc hien duoi bang */
export const pricingNote =
  "Giá trên chưa bao gồm chi phí triển khai kết cấu và MEP (điện, nước, điều hòa, phòng cháy).";

/** 19000000 -> "19.000.000" */
export function formatVnd(n: number) {
  return n.toLocaleString("vi-VN");
}

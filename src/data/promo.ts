/**
 * ============================================================
 *  CHUONG TRINH KHUYEN MAI — VONG QUAY TRI AN
 * ============================================================
 *  Nguon so lieu duy nhat cho CA HAI trang:
 *    /khuyen-mai/  — trang cong khai gioi thieu chuong trinh
 *    /vong-quay/   — cong cu nhan vien truc booth (an, khong cho Google)
 *
 *  Doi giai thuong hay so luong thi sua o day, ca hai trang tu cap nhat.
 *
 *  LUU Y QUAN TRONG:
 *  `quantity` la quy giai CO THAT cua mot toa nha. Trang cong khai chi
 *  HIEN THI con so nay, khong tru vao no. Chi trang /vong-quay/ moi tru,
 *  va cung chi tru tren dung may dang mo (luu bang localStorage).
 */

export type Prize = {
  /** Ten giai, hien tren banh xe va trong nhat ky */
  name: string;
  /** Ten ngan de ve len banh xe cho khong bi chat chu */
  shortName: string;
  /** Gia tri quy doi, dong */
  value: number;
  /** So luong trong quy giai cua MOT toa nha */
  quantity: number;
  /** Mau mieng banh xe */
  color: string;
  /** true = chu den tren mieng do, false = chu trang */
  darkText: boolean;
};

export const prizes: Prize[] = [
  {
    name: "Gói tổng vệ sinh miễn phí (căn ≤70m²)",
    shortName: "Gói tổng vệ sinh miễn phí",
    value: 1_200_000,
    quantity: 1,
    color: "#e00532",
    darkText: false,
  },
  {
    name: "Gói vệ sinh kính căn hộ miễn phí",
    shortName: "Vệ sinh kính miễn phí",
    value: 500_000,
    quantity: 2,
    color: "#f5a524",
    darkText: true,
  },
  {
    name: "Bộ cây lau 360° + gạt kính",
    shortName: "Bộ cây lau 360°",
    value: 137_000,
    quantity: 7,
    color: "#6ec1fa",
    darkText: true,
  },
  {
    name: "Voucher 200.000đ gói tổng vệ sinh",
    shortName: "Voucher 200.000đ",
    value: 200_000,
    quantity: 40,
    color: "#003d91",
    darkText: false,
  },
  {
    name: "Bộ quà vệ sinh mini",
    shortName: "Bộ quà mini",
    value: 40_000,
    quantity: 130,
    color: "#0e9f6e",
    darkText: false,
  },
];

/** Tong so phan qua mot toa nha, tinh tu bang tren — khong go tay */
export const totalPrizes = prizes.reduce((s, p) => s + p.quantity, 0);

/** Tong gia tri quy giai mot toa nha */
export const totalValue = prizes.reduce((s, p) => s + p.value * p.quantity, 0);

export const promo = {
  name: "Vòng quay tri ân – Nhà sạch đón Tết",
  /** [SUA] Thoi gian chay chuong trinh, hien tren trang cong khai */
  period: "Tháng 12/2026 – hết tháng 1/2027",
  /** Cau mo ta ngan, dung cho the mo ta trang va mang xa hoi */
  summary:
    "K3 Vệ Sinh mang vòng quay tri ân tới từng tòa chung cư: mỗi căn hộ một lượt quay miễn phí, " +
    "100% trúng thưởng, quà trao ngay tại sảnh.",
  /** Luat choi — hien o ca hai trang de nhan vien va khach doc cung mot ban */
  rules: [
    "Mỗi căn hộ trong tòa được 1 lượt quay miễn phí, không mua gì trước.",
    "Mỗi căn hộ chỉ quay 1 lần. Nhân viên đối chiếu số căn trước khi bấm quay.",
    "100% lượt quay đều trúng — quỹ giải cố định cho từng tòa, giải nào hết thì không ra nữa.",
    "Quà trao ngay tại bàn K3 ở sảnh. Voucher và gói dịch vụ có hiệu lực 90 ngày kể từ ngày quay.",
    "Một người đứng tên nhiều căn cần xuất trình giấy tờ của căn thứ hai trở đi.",
    "Chương trình không quy đổi quà thành tiền mặt.",
  ],
} as const;

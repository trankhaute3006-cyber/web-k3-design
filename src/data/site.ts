/**
 * ============================================================
 *  FILE DUY NHAT ANH CAN SUA DE DOI THONG TIN TOAN BO WEBSITE
 * ============================================================
 *  Moi dong co danh dau [SUA] la thong tin gia dinh (placeholder).
 *  Sua o day -> toan bo website tu dong cap nhat theo.
 */

export const site = {
  // ---------- Nhan dien ----------
  name: "K3 Design",
  legalName: "Công ty TNHH Thiết kế & Xây dựng K3 Design", // [SUA] ten phap nhan day du
  tagline: "Thiết kế – Thi công trọn gói",
  slogan: "Kiến tạo không gian sống bền vững",
  description:
    "K3 Design là đơn vị thiết kế kiến trúc, nội thất và thi công xây dựng trọn gói. Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến ngày bàn giao chìa khóa.",

  // ---------- Ten mien ----------
  url: "https://k3design.vn", // [SUA] ten mien that sau khi mua
  locale: "vi_VN",

  // ---------- Lien he ----------
  phone: "0900 000 000", // [SUA] hotline that
  phoneRaw: "+84900000000", // [SUA] dang quoc te, dung cho nut goi
  zalo: "0900000000", // [SUA] so Zalo
  email: "lienhe@k3design.vn", // [SUA]
  address: "Số 00, Đường ABC, Phường XYZ, TP. Hồ Chí Minh", // [SUA]
  addressShort: "TP. Hồ Chí Minh",
  workingHours: "Thứ 2 – Thứ 7: 08:00 – 17:30",
  taxCode: "0000000000", // [SUA] ma so thue

  // Nhung link mang xa hoi de trong "" se tu dong an khoi giao dien
  social: {
    facebook: "https://facebook.com/k3design", // [SUA]
    youtube: "", // [SUA]
    tiktok: "", // [SUA]
    instagram: "", // [SUA]
  },

  // ---------- Ban do ----------
  // [SUA] Vao Google Maps > Chia se > Nhung ban do > copy phan trong src="..."
  mapEmbedUrl:
    "https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed",

  // ---------- Form lien he ----------
  // Hostinger shared hosting KHONG chay Node server, nen form gui qua Web3Forms (mien phi).
  // [SUA] Lay access key mien phi tai https://web3forms.com (nhap email -> nhan key qua mail)
  // Tam de trong "" thi form se hien thong bao huong dan thay vi bao loi.
  web3formsKey: "",

  // ---------- Do luong ----------
  gaMeasurementId: "", // [SUA] vd "G-XXXXXXXXXX" - de trong thi khong nhung GA
  facebookPixelId: "", // [SUA]

  // ---------- Giai thuong / ghi nhan (hien goc phai hero) ----------
  // [SUA] Dien giai thuong that. De title: "" thi khoi nay tu dong AN di.
  // Khong nen ghi giai thuong chua tung nhan.
  award: {
    source: "",
    title: "",
  },

  // ---------- So lieu nang luc (hien o trang chu) ----------
  stats: [
    { value: 12, suffix: "+", label: "Năm kinh nghiệm" }, // [SUA]
    { value: 250, suffix: "+", label: "Công trình bàn giao" }, // [SUA]
    { value: 45, suffix: "", label: "Kỹ sư & kiến trúc sư" }, // [SUA]
    { value: 98, suffix: "%", label: "Khách hàng giới thiệu lại" }, // [SUA]
  ],
} as const;

export type Site = typeof site;

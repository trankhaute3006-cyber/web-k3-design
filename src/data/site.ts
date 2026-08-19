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
  phone: "0981 442 079", // hotline hien thi tren giao dien
  phoneRaw: "+84981442079", // dang quoc te, dung cho nut goi va schema.org
  zalo: "0981442079", // so Zalo
  email: "k3design2025@gmail.com",
  address:
    "26/10/2b Đường Làng Tăng Phú, Phường Tăng Nhơn Phú, TP. Hồ Chí Minh",
  addressShort: "TP. Hồ Chí Minh",
  workingHours: "Thứ 2 – Thứ 7: 08:00 – 17:30", // [SUA] neu gio lam khac
  taxCode: "0319293897",

  // Nhung link mang xa hoi de trong "" se tu dong an khoi giao dien
  social: {
    facebook: "https://facebook.com/k3design", // [SUA]
    youtube: "", // [SUA]
    tiktok: "", // [SUA]
    instagram: "", // [SUA]
  },

  // ---------- Ban do ----------
  // Ban do tim theo dia chi van phong o tren.
  // [SUA] Neu Google chua ghim dung vi tri: mo Google Maps, tim dung diem,
  // bam Chia se > Nhung ban do, copy phan trong src="..." roi dan vao day.
  mapEmbedUrl:
    "https://www.google.com/maps?q=26%2F10%2F2b%20%C4%90%C6%B0%E1%BB%9Dng%20L%C3%A0ng%20T%C4%83ng%20Ph%C3%BA%2C%20Ph%C6%B0%E1%BB%9Dng%20T%C4%83ng%20Nh%C6%A1n%20Ph%C3%BA%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam&hl=vi&z=17&output=embed",

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
    { value: 3, suffix: "", label: "Năm kinh nghiệm" }, // [SUA]
    { value: 20, suffix: "+", label: "Công trình bàn giao" }, // [SUA]
    { value: 10, suffix: "", label: "Kỹ sư & kiến trúc sư" }, // [SUA]
    { value: 95, suffix: "%", label: "Khách hàng giới thiệu lại" }, // [SUA]
  ],
} as const;

export type Site = typeof site;

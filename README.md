# K3 Design — Website công ty thiết kế & xây dựng

Website giới thiệu năng lực và thu lead cho công ty thiết kế kiến trúc – thi
công xây dựng K3 Design. Xây bằng Next.js, xuất ra HTML tĩnh để chạy được trên
Hostinger gói shared (không cần Node.js runtime trên máy chủ).

👉 **Cách đưa lên GitHub và Hostinger: xem [DEPLOY.md](DEPLOY.md)**

---

## Chạy trên máy

```bash
npm install
```

```bash
npm run dev
```

Mở http://localhost:3000

## Các lệnh

| Lệnh | Việc nó làm |
| --- | --- |
| `npm run dev` | Chạy bản phát triển, tự tải lại khi sửa file |
| `npm run build` | Build ra HTML tĩnh vào thư mục `out/` |
| `npm run start` | Xem thử thư mục `out/` như trên máy chủ thật |
| `npm run typecheck` | Kiểm tra lỗi kiểu dữ liệu TypeScript |
| `npm run placeholders` | Tạo lại bộ ảnh minh họa SVG trong `public/images/` |

---

## Công nghệ

| Thành phần | Lựa chọn | Lý do |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, `output: "export"`) | Xuất HTML tĩnh, chạy trên mọi hosting |
| Ngôn ngữ | TypeScript | Bắt lỗi trước khi lên production |
| CSS | Tailwind CSS v4 | Design token khai báo trong `globals.css` |
| Icon | lucide-react | SVG, một bộ duy nhất, không dùng emoji |
| Chữ | Archivo + Be Vietnam Pro | Cả hai hỗ trợ đầy đủ dấu tiếng Việt, tự host qua `next/font` |
| Logo | `public/logo.png` 512×512 nền trong suốt | Bóc từ `K3_DESIGN_logo_transparent.pdf`, giữ nguyên màu gốc |
| Form | Web3Forms | Không cần backend, phù hợp hosting tĩnh |
| CI/CD | GitHub Actions → FTP | Push là tự deploy |

---

## Cấu trúc thư mục

```
src/
├── app/                     # Các trang (App Router)
│   ├── page.tsx             # Trang chủ
│   ├── layout.tsx           # Khung chung: font, SEO, schema.org
│   ├── globals.css          # DESIGN TOKEN — màu, chữ, bóng đổ, animation
│   ├── gioi-thieu/
│   ├── dich-vu/
│   ├── du-an/               # Danh sách + [slug] trang chi tiết dự án
│   ├── quy-trinh/
│   ├── tin-tuc/             # Danh sách + [slug] trang bài viết
│   ├── lien-he/
│   ├── not-found.tsx        # Trang 404
│   ├── sitemap.ts           # Tự sinh sitemap.xml
│   └── robots.ts            # Tự sinh robots.txt
│
├── components/
│   ├── layout/              # Header, Footer, nút liên hệ nổi, Logo
│   ├── ui/                  # Button, Container, Section, FAQ, Reveal, Counter
│   ├── home/                # Các khối của trang chủ
│   ├── project/             # Thẻ dự án, bộ lọc, thư viện ảnh
│   └── forms/               # Form liên hệ
│
├── data/                    # ⭐ TOÀN BỘ NỘI DUNG NẰM Ở ĐÂY
│   ├── site.ts              # Thông tin công ty — sửa đầu tiên
│   ├── services.ts
│   ├── projects.ts
│   ├── posts.ts
│   ├── content.ts           # Quy trình, cảm nhận, FAQ, giá trị cốt lõi
│   └── nav.ts
│
└── lib/utils.ts

public/
├── .htaccess                # Cấu hình Apache/LiteSpeed cho Hostinger
├── images/                  # Ảnh (đang là placeholder SVG)
├── logo.png                 # Logo chính thức (512×512, nền trong suốt)
├── apple-touch-icon.png     # Icon khi lưu ra màn hình chính (180×180)
├── favicon.svg              # Icon tab trình duyệt (rút gọn còn chữ K)
└── og-image.svg             # Ảnh hiển thị khi chia sẻ link
```

---

## Hệ thống thiết kế

Phong cách **Corporate Editorial**: nền xám xanh nhạt, các khối lớn bo góc 20–32px
thụt vào khỏi mép màn hình, khối navy đậm làm điểm neo, glass card nổi trên ảnh
ở hero. Toàn bộ màu **lấy trực tiếp từ logo K3 Design**. Token khai báo trong
`src/app/globals.css`.

### Bảng màu

| Token | Mã màu | Dùng cho | Tương phản |
| --- | --- | --- | --- |
| `ink` | `#0B1B33` | Chữ chính | 15.8:1 |
| `ink-mid` | `#1F3A5F` | Chữ đoạn văn | 10.5:1 |
| `muted-fg` | `#4A5F7A` | Chữ phụ | 6.0:1 |
| `canvas` | `#F2F5FA` | Nền trang | — |
| `canvas-alt` | `#E7EDF7` | Nền phân đoạn xen kẽ | — |
| `surface` | `#FFFFFF` | Nền thẻ | — |
| `deep` | `#002E6E` | Khối navy: hero, quy trình, footer | chữ trắng 13:1 |
| `accent` | `#003D91` | **Navy của logo** — chữ, link, nút phụ | 9.3:1 |
| `accent-bright` | `#6EC1FA` | Xanh kính — chữ trên nền navy | 6.6:1 trên navy |
| `accent-pale` | `#C7E4FB` | Nền dải CTA | chữ ink 13:1 |
| `cta` | `#E00532` | **Đỏ của logo** — nút hành động chính | chữ trắng 5.0:1 |
| `cta-dark` | `#C8072F` | Hover của nút đỏ | 6.0:1 |
| `danger` | `#C8072F` | Chữ báo lỗi | 5.5:1 |
| `line` / `line-strong` | `#D6E0EE` / `#B9C8DD` | Viền, đường kẻ | — |

**Ba màu gốc lấy từ file logo** bằng cách đếm pixel: navy , đỏ ,
xanh kính .

Ba điều chỉnh nhỏ so với màu gốc, đều vì lý do tương phản:

- Đỏ nút bấm dùng  thay vì  — màu gốc chỉ đạt đúng 4.50:1 với
  chữ trắng, sát ngưỡng đến mức rủi ro; bản đậm hơn một chút đạt 4.96:1.
- Xanh kính  chỉ đạt 3.7:1 trên nền navy nên **không dùng làm chữ**;
  bản sáng hơn  (6.6:1) đảm nhiệm vai trò đó. Màu gốc vẫn dùng cho
  đồ họa và mảng màu.
- Logo giữ nguyên 100% màu gốc. Trên nền navy, logo được đặt trong **ô trắng bo
  góc** thay vì đổi màu logo — navy của logo sẽ chìm nếu đặt thẳng lên nền navy.

### Hình khối

| Thành phần | Bo góc |
| --- | --- |
| Khối lớn (hero, footer, dải CTA) | 20px mobile / 32px desktop |
| Thẻ nội dung | 24px |
| Ảnh trong thẻ | 16px |
| Nút, chip, thanh lọc | bo tròn hoàn toàn (pill) |
| Ô nhập liệu | 12px |

Các khối lớn thụt vào khỏi mép màn hình theo biến `--inset` (8px → 12px → 16px
theo breakpoint) để lộ nền kem bao quanh.

### Chữ

- Tiêu đề: **Archivo** 500–800, letter-spacing `-0.025em`
- Nội dung: **Be Vietnam Pro** 300–600, line-height 1.65
- Cỡ chữ nền 16px (tránh iOS tự phóng to khi bấm vào ô nhập)
- Số liệu dùng `.tabular` để cột không nhảy

## Đã kiểm tra

- Tương phản màu đạt WCAG AA cho toàn bộ cặp chữ/nền (kể cả trạng thái lỗi)
- Mọi vùng bấm ≥ 44×44px
- Điều hướng bằng bàn phím đầy đủ, có link "bỏ qua đến nội dung chính", viền
  focus luôn hiện
- Form: nhãn hiển thị rõ, kiểm tra khi rời ô (không kiểm tra từng phím gõ),
  lỗi đặt ngay dưới ô, tự đưa con trỏ về ô sai đầu tiên, có `role="alert"`
- Tôn trọng `prefers-reduced-motion` — tắt toàn bộ hiệu ứng khi người dùng yêu cầu
- Không tràn ngang ở 375px; vùng cuộn ngang (thanh lọc, menu dịch vụ) được
  giới hạn trong khung riêng
- Thanh liên hệ cố định trên mobile có chừa `env(safe-area-inset-bottom)`
- SEO: metadata riêng từng trang, canonical, Open Graph, `sitemap.xml`,
  `robots.txt`, schema.org `GeneralContractor` / `CreativeWork` / `Article`

---

## Việc cần làm trước khi lên production

- [ ] Điền thông tin thật vào `src/data/site.ts` (mọi dòng có ghi chú `[SUA]`)
- [ ] Thay ảnh dự án thật vào `public/images/projects/`
- [ ] Lấy access key Web3Forms để bật form liên hệ (DEPLOY.md, Phần 8)
- [ ] Đổi `site.url` sang tên miền thật
- [ ] Nhúng bản đồ Google Maps đúng vị trí văn phòng (`site.mapEmbedUrl`)
- [ ] Thêm mã Google Analytics nếu cần (`site.gaMeasurementId`)
- [ ] Bật SSL trên hPanel
- [ ] Khai báo website với Google Search Console và nộp `sitemap.xml`

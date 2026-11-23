import type { Metadata } from "next";
import { promo, totalPrizes } from "@/data/promo";
import { Container, PageHeader, Section } from "@/components/ui/Primitives";
import { BoothWheel } from "@/components/promo/BoothWheel";

/**
 * TRANG NOI BO — chi nhan vien truc booth dung.
 *
 * Co y KHONG dua vao mainNav, KHONG dua vao flatNav (nen cung khong vao
 * sitemap.xml). Chan Google bang the robots ngay duoi day.
 *
 * KHONG them Disallow: /vong-quay/ vao robots.txt — lam vay la cong bo
 * dia chi nay cho bat ky ai mo robots.txt. The noindex kin hon.
 */

export const metadata: Metadata = {
  title: "Vòng quay tri ân — máy trực booth",
  description:
    "Trang nội bộ K3 Vệ Sinh: quay giải cho cư dân tại sảnh chung cư.",
  alternates: { canonical: "/vong-quay/" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function BoothPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nội bộ K3"
        title={promo.name}
        description={`Quỹ giải ${totalPrizes} phần quà cho mỗi tòa · mỗi căn hộ 1 lượt · nhân viên đối chiếu số căn trước khi bấm quay.`}
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Vòng quay" }]}
      />

      <Section tone="canvas">
        <Container>
          <div className="mb-10 rounded-lg border-l-4 border-l-cta bg-surface p-5">
            <p className="font-display font-semibold">
              Trang dành cho máy trực booth — đừng gửi địa chỉ này cho khách.
            </p>
            <p className="mt-2 leading-relaxed text-muted-fg">
              Quỹ giải và nhật ký lưu trên <strong>chính máy này</strong>. Mỗi
              tòa chung cư dùng một máy, một quỹ giải. Đổi máy, đổi trình duyệt
              hoặc mở tab ẩn danh là quỹ giải mới tinh. Xóa dữ liệu duyệt web là
              mất nhật ký, nên cuối mỗi buổi phải bấm{" "}
              <strong>Sao chép nhật ký</strong> và dán vào sheet theo dõi.
            </p>
          </div>

          <BoothWheel />
        </Container>
      </Section>
    </>
  );
}

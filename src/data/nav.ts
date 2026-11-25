import { serviceHref, services } from "@/data/services";
import { categoryLabels, projects, type ProjectCategory } from "@/data/projects";

export type NavChild = {
  label: string;
  href: string;
  /** Dong mo ta ngan hien duoi ten muc trong menu xo xuong */
  hint?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Co children -> muc nay se co menu xo xuong */
  children?: NavChild[];
};

/** Chi liet ke nhom du an thuc su co cong trinh */
const projectCategories = (
  Object.keys(categoryLabels) as ProjectCategory[]
).filter((k) => projects.some((p) => p.category === k));

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Về chúng tôi",
    href: "/gioi-thieu/",
    children: [
      {
        label: "Câu chuyện K3 Design",
        href: "/gioi-thieu/",
        hint: "Chúng tôi bắt đầu từ đâu và vì sao",
      },
      {
        label: "Quy trình làm việc",
        href: "/quy-trinh/",
        hint: "Sáu bước từ khảo sát đến bảo hành",
      },
    ],
  },
  {
    label: "Dịch vụ",
    href: "/dich-vu/",
    children: [
      ...services.map((s) => ({
        label: s.title,
        href: serviceHref(s.slug),
        hint: s.priceHint,
      })),
      { label: "Xem tất cả dịch vụ", href: "/dich-vu/" },
    ],
  },
  { label: "Vệ sinh", href: "/ve-sinh/" },
  { label: "Khuyến mãi", href: "/khuyen-mai/" },
  {
    label: "Dự án",
    href: "/du-an/",
    children: [
      ...projectCategories.map((c) => ({
        label: categoryLabels[c],
        href: `/du-an/#${c}`,
        hint: `${projects.filter((p) => p.category === c).length} công trình`,
      })),
      { label: "Xem tất cả dự án", href: "/du-an/" },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc/" },
  { label: "Liên hệ", href: "/lien-he/" },
];

/** Danh sach phang, dung cho chan trang va trang 404 */
export const flatNav: NavChild[] = [
  { label: "Giới thiệu", href: "/gioi-thieu/" },
  { label: "Dịch vụ", href: "/dich-vu/" },
  { label: "Vệ sinh công nghiệp", href: "/ve-sinh/" },
  { label: "Khuyến mãi", href: "/khuyen-mai/" },
  { label: "Dự án", href: "/du-an/" },
  { label: "Quy trình", href: "/quy-trinh/" },
  { label: "Tin tức", href: "/tin-tuc/" },
  { label: "Liên hệ", href: "/lien-he/" },
];

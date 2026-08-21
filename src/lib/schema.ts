import { site } from "@/data/site";
import type { Faq } from "@/data/content";
import type { Service } from "@/data/services";

/**
 * Du lieu co cau truc gui cho Google (schema.org).
 *
 * Muc dich: giup Google hieu trang noi ve cai gi, va co co hoi hien
 * ket qua dang mo rong — cau hoi thuong gap, duong dan phan cap, gia
 * dich vu — thay vi chi mot dong link thong thuong.
 */

/** Bien "Thu 2 – Thu 7: 08:00 – 17:30" thanh dinh dang Google hieu */
function openingHours() {
  const m = site.workingHours.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  if (!m) return undefined;
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: m[1],
      closes: m[2],
    },
  ];
}

/** Doanh nghiep — dung o trang chu va lam goc cho cac trang khac */
export function organizationSchema() {
  const hasGeo = Boolean(site.geo.lat && site.geo.lng);

  return {
    "@type": "GeneralContractor",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phoneRaw,
    email: site.email,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    taxID: site.taxCode,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.addressShort,
      addressCountry: "VN",
    },
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.geo.lat,
            longitude: site.geo.lng,
          },
        }
      : {}),
    openingHoursSpecification: openingHours(),
    areaServed: [
      { "@type": "AdministrativeArea", name: "TP. Hồ Chí Minh" },
      { "@type": "AdministrativeArea", name: "Bình Dương" },
      { "@type": "AdministrativeArea", name: "Long An" },
      { "@type": "AdministrativeArea", name: "Đồng Nai" },
    ],
    priceRange: "$$",
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

/** Duong dan phan cap — Google hien thanh breadcrumb duoi tieu de ket qua */
export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };
}

/** Cau hoi thuong gap — co co hoi hien dang mo rong ngay tren trang ket qua */
export function faqSchema(items: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Tung hang muc dich vu, kem gia tham khao */
export function serviceSchema(services: Service[]) {
  return services.map((s) => ({
    "@type": "Service",
    "@id": `${site.url}/dich-vu/#${s.slug}`,
    name: s.title,
    description: s.short,
    serviceType: s.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "TP. Hồ Chí Minh" },
    offers: {
      "@type": "Offer",
      description: s.priceHint,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
  }));
}

/** Gop nhieu khoi thanh mot the JSON-LD duy nhat */
export function graph(...blocks: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": blocks.flat().filter(Boolean),
  };
}

/** Dung chung: the <script> chua JSON-LD */
export function jsonLdProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}

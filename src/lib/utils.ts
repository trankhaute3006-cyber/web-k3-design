export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** 2026-07-28 -> 28 tháng 7, 2026 */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} tháng ${m}, ${y}`;
}

/** "0981 442 079" -> "tel:+84981442079" — bo khoang trang, giu dau + */
export function telHref(raw: string) {
  return `tel:${raw.replace(/[^\d+]/g, "")}`;
}

export function zaloHref(phone: string) {
  return `https://zalo.me/${phone.replace(/\D/g, "")}`;
}

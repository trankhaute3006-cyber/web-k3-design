import { site } from "@/data/site";

/**
 * [SUA] Logo tam thoi dang SVG chu.
 * Khi co logo that: dat file vao /public/logo.svg roi thay toan bo ham nay bang
 *   <Image src="/logo.svg" alt="K3 Design" width={148} height={40} priority />
 */
export function Logo({
  dark = false,
  className,
}: {
  /** true = dat tren nen toi -> chu trang */
  dark?: boolean;
  className?: string;
}) {
  const ink = dark ? "#ffffff" : "#1b2110";
  const sub = dark ? "#c9d2a8" : "#5a6738";
  const markBg = dark ? "#b7e870" : "#2f3a16";
  const markFg = dark ? "#2f3a16" : "#b7e870";

  return (
    <svg
      viewBox="0 0 176 44"
      role="img"
      aria-label={`${site.name} — ${site.tagline}`}
      className={className ?? "h-10 w-auto"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Khoi monogram */}
      <rect x="0" y="4" width="36" height="36" rx="10" fill={markBg} />
      <path
        d="M10 13h4.6v7.2l6-7.2h5.9l-7.4 8.7 7.8 10.3h-6.2L14.6 24v8.2H10z"
        fill={markFg}
      />
      <rect
        x="28"
        y="13"
        width="2.6"
        height="19.2"
        rx="1.3"
        fill={markFg}
        opacity="0.6"
      />

      {/* Chu */}
      <text
        x="46"
        y="25"
        fill={ink}
        fontFamily="var(--font-archivo), Segoe UI, sans-serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="-0.4"
      >
        K3 DESIGN
      </text>
      <text
        x="46.5"
        y="37"
        fill={sub}
        fontFamily="var(--font-be-vietnam), Segoe UI, sans-serif"
        fontSize="8.4"
        fontWeight="500"
        letterSpacing="1.5"
      >
        THIẾT KẾ · THI CÔNG
      </text>
    </svg>
  );
}

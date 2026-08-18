import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Container                                                          */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-[80rem]",
    wide: "max-w-[92rem]",
  };
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        widths[size],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  className,
  id,
  tone = "canvas",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "surface" | "alt" | "deep";
}) {
  const tones = {
    canvas: "bg-canvas text-ink",
    surface: "bg-surface text-ink",
    alt: "bg-canvas-alt text-ink",
    deep: "bg-deep text-white k3-on-dark",
  };
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/**
 * Khoi bo goc lon, thut vao khoi mep man hinh — dung cho cac dai nhan manh.
 */
export function PanelSection({
  children,
  className,
  id,
  tone = "deep",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "deep" | "pale" | "surface";
}) {
  const tones = {
    deep: "bg-deep text-white k3-on-dark",
    pale: "bg-accent-pale text-ink",
    surface: "bg-surface text-ink",
  };
  return (
    <div className="k3-inset bg-canvas pb-[var(--inset)]">
      <section
        id={id}
        className={cn("k3-panel relative", tones[tone], className)}
      >
        {children}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <span className="k3-eyebrow" data-on-dark={invert || undefined}>
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "mt-4 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)]",
          invert && "text-white"
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-relaxed",
            invert ? "text-canvas/75" : "text-muted-fg"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Button — dang vien thuoc (pill)                                    */
/* ------------------------------------------------------------------ */

type ButtonVariant =
  | "primary"
  | "navy"
  | "secondary"
  | "ghost"
  | "onDark"
  | "sky"
  | "white";
type ButtonSize = "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out cursor-pointer " +
  "disabled:cursor-not-allowed disabled:opacity-50 select-none text-center active:scale-[0.98]";

const buttonVariants: Record<ButtonVariant, string> = {
  // Do = hanh dong chinh (mau do cua logo)
  primary: "bg-cta text-white hover:bg-cta-dark shadow-e1 hover:shadow-e2",
  // Navy = hanh dong manh nhung khong phai CTA chinh
  navy: "bg-accent text-white hover:bg-accent-dark shadow-e1 hover:shadow-e2",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-canvas-alt",
  // Dat tren nen toi
  white: "bg-white text-ink hover:bg-canvas shadow-e2",
  onDark: "bg-white/12 text-white border border-white/25 hover:bg-white/20",
  sky: "bg-accent-bright text-ink hover:brightness-[1.06] shadow-e2",
};

const buttonSizes: Record<ButtonSize, string> = {
  // min-height 48px -> dat chuan touch target
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-8 text-base",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  // tel: / mailto: khong mo tab moi
  const isProtocolLink = href ? /^(tel:|mailto:|sms:)/i.test(href) : false;

  if (href && isProtocolLink) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Đường dẫn" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-fg">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  PageHeader — the olive bo goc, dung chung moi trang con            */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <div className="k3-inset bg-canvas">
      <header className="k3-panel k3-on-dark relative bg-deep pt-32 pb-14 text-white sm:pt-36 sm:pb-16">
        <div
          className="k3-grid-lines absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent-bright/15 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="[&_a]:text-canvas/60 [&_a:hover]:text-accent-bright [&_span]:text-canvas/40 [&_[aria-current]]:text-white">
            <Breadcrumb items={breadcrumb} />
          </div>
          {eyebrow ? (
            <span className="k3-eyebrow mt-8" data-on-dark="true">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,1.2rem+3vw,3.5rem)] text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-canvas/72">
              {description}
            </p>
          ) : null}
          {children}
        </Container>
      </header>
    </div>
  );
}

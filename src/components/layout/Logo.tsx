import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Logo chinh thuc K3 Design (PNG nen trong suot, 512x512).
 * File goc: public/logo.png — thay file nay la doi logo toan site.
 *
 * Logo dung mau navy dam nen se chim tren nen toi. Vi vay tren nen toi
 * logo duoc dat trong mot the trang bo goc, giu nguyen mau thuong hieu
 * thay vi doi mau logo.
 */
export function Logo({
  dark = false,
  className,
}: {
  /** true = dat tren nen toi */
  dark?: boolean;
  className?: string;
}) {
  const img = (
    <Image
      src="/logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={512}
      height={512}
      priority
      className={cn("h-full w-auto", className)}
    />
  );

  if (dark) {
    return (
      <span className="inline-flex h-14 items-center justify-center rounded-2xl bg-white p-2 shadow-e1 sm:h-16">
        {img}
      </span>
    );
  }

  return <span className="inline-flex h-14 items-center sm:h-16">{img}</span>;
}

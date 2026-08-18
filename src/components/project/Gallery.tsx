"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

type Shot = { src: string; caption: string };

export function Gallery({
  images,
  projectTitle,
}: {
  images: Shot[];
  projectTitle: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  // Phim tat + khoa cuon nen khi mo
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2">
        {images.map((shot, i) => (
          <li key={shot.src} className={i === 0 ? "sm:col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Phóng to ảnh: ${shot.caption}`}
              className="group block w-full cursor-pointer text-left"
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-canvas-alt ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={`${projectTitle} — ${shot.caption}`}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
                <span
                  className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-deep/75 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <Expand size={17} />
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-fg">{shot.caption}</p>
            </button>
          </li>
        ))}
      </ul>

      {/* Xem anh phong to */}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh dự án ${projectTitle}`}
          className="fixed inset-0 z-80 flex flex-col bg-deep/96 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <p className="tabular text-sm text-canvas/60">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Đóng ảnh phóng to"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-accent-bright"
            >
              <X size={26} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-4 sm:px-6">
            <Image
              src={images[index].src}
              alt={`${projectTitle} — ${images[index].caption}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-4 pb-6 sm:px-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Ảnh trước"
              className="inline-flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-bright hover:bg-accent-bright hover:text-ink"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <p className="flex-1 text-center text-sm text-canvas/75">
              {images[index].caption}
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Ảnh tiếp theo"
              className="inline-flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-bright hover:bg-accent-bright hover:text-ink"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

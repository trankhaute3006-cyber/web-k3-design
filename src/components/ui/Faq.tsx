"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Accordion co the mo nhieu muc cung luc.
 * Dung <button aria-expanded> + vung noi dung co id de screen reader hieu dung.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number[]>([0]);

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <li key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
              >
                <span className="font-display text-[1.0625rem] font-semibold text-ink transition-colors hover:text-accent sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-transform duration-300 ease-out",
                    isOpen && "rotate-45 border-accent bg-accent text-white"
                  )}
                  aria-hidden="true"
                >
                  <Plus size={17} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="pr-14 pb-7"
            >
              <p className="text-[0.9375rem] leading-relaxed text-muted-fg">
                {item.answer}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

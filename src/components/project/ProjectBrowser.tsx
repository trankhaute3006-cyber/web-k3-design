"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import {
  categoryLabels,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Chi hien nhung nhom thuc su co du an
  const tabs = useMemo(() => {
    const counts = new Map<ProjectCategory, number>();
    projects.forEach((p) =>
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    );
    return [
      { key: "all" as const, label: "Tất cả", count: projects.length },
      ...(Object.keys(categoryLabels) as ProjectCategory[])
        .filter((k) => counts.has(k))
        .map((k) => ({
          key: k,
          label: categoryLabels[k],
          count: counts.get(k) ?? 0,
        })),
    ];
  }, [projects]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects]
  );

  return (
    <div>
      {/* Bo loc */}
      <div className="-mx-1 overflow-x-auto pb-1">
        <div
          role="tablist"
          aria-label="Lọc dự án theo loại công trình"
          className="flex min-w-max gap-2"
        >
          {tabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-5 font-display text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-200",
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong bg-surface text-ink-mid hover:border-ink hover:text-ink"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "tabular text-xs",
                    active ? "text-white/75" : "text-muted-fg"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ket qua */}
      <p aria-live="polite" className="sr-only">
        Đang hiển thị {visible.length} dự án.
      </p>

      {visible.length > 0 ? (
        <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i < 3}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-line bg-surface px-6 py-20 text-center">
          <SearchX
            size={40}
            className="mx-auto text-line-strong"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="mt-5 text-xl">Chưa có dự án trong nhóm này</h2>
          <p className="mx-auto mt-2.5 max-w-sm text-[0.9375rem] text-muted-fg">
            Chúng tôi vẫn nhận loại công trình này. Anh chị liên hệ để xem hồ sơ
            năng lực chi tiết.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={() => setFilter("all")}>
              Xem tất cả dự án
            </Button>
            <Button href="/lien-he/">Liên hệ tư vấn</Button>
          </div>
        </div>
      )}
    </div>
  );
}

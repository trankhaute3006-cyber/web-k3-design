import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { categoryLabels, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  priority = false,
  size = "default",
}: {
  project: Project;
  priority?: boolean;
  size?: "default" | "large";
}) {
  return (
    <article className="group relative">
      <Link
        href={`/du-an/${project.slug}/`}
        className="block focus-visible:outline-none"
        aria-label={`Xem chi tiết dự án ${project.title}`}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-canvas-alt",
            size === "large" ? "aspect-[4/3]" : "aspect-[3/2]"
          )}
        >
          <Image
            src={project.cover}
            alt={`Ảnh công trình ${project.title} tại ${project.location}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />

          {/* Lop phu tang tuong phan cho nhan */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-deep/75 via-deep/10 to-transparent"
            aria-hidden="true"
          />

          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-canvas/95 px-3.5 py-1.5 font-display text-xs font-semibold tracking-wide text-ink uppercase">
            {categoryLabels[project.category]}
          </span>

          <span
            className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-bright text-ink transition-transform duration-300 ease-out group-hover:-translate-y-1"
            aria-hidden="true"
          >
            <ArrowUpRight size={20} />
          </span>
        </div>

        <div className="pt-5">
          <div className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.12em] text-muted-fg uppercase">
            <span className="tabular">{project.year}</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span>{project.scope.split("+")[0].trim()}</span>
          </div>

          <h3
            className={cn(
              "mt-2.5 transition-colors group-hover:text-accent",
              size === "large" ? "text-2xl sm:text-[1.75rem]" : "text-xl"
            )}
          >
            {project.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted-fg">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-fg">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-accent" aria-hidden="true" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 size={15} className="text-accent" aria-hidden="true" />
              {project.area}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { Container, Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { RenderNotice } from "@/components/ui/RenderNotice";

export function FeaturedWork() {
  return (
    <Section tone="alt" id="du-an-tieu-bieu">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Phong cách thiết kế"
            title="Mỗi công trình bắt đầu từ một bài toán cụ thể"
            description="Chúng tôi trình bày bài toán và cách giải của từng dự án — thay vì chỉ trưng phối cảnh đẹp."
          />
          <Link
            href="/du-an/"
            className="group hidden shrink-0 items-center gap-2 font-display font-semibold text-ink transition-colors hover:text-accent lg:inline-flex"
          >
            Tất cả dự án
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <RenderNotice className="mt-10 max-w-3xl" />

        <div className="mt-10 grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 lg:hidden">
          <Link
            href="/du-an/"
            className="group inline-flex items-center gap-2 font-display font-semibold text-ink transition-colors hover:text-accent"
          >
            Tất cả dự án
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

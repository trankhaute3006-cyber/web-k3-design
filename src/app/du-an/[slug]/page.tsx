import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  projects,
  getProject,
  categoryLabels,
} from "@/data/projects";
import { site } from "@/data/site";
import {
  Breadcrumb,
  Button,
  Container,
  Section,
} from "@/components/ui/Primitives";
import { Gallery } from "@/components/project/Gallery";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { RenderNotice } from "@/components/ui/RenderNotice";
import { CtaBand } from "@/components/home/CtaBand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Không tìm thấy dự án" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/du-an/${project.slug}/` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      images: [{ url: project.cover, width: 1200, height: 800, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  const more = related.length > 0 ? related : projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const specs = [
    { label: "Chủ đầu tư", value: project.client },
    { label: "Địa điểm", value: project.location },
    { label: "Quy mô", value: project.area },
    { label: "Phạm vi công việc", value: project.scope },
    { label: "Thời gian thực hiện", value: project.duration },
    { label: "Năm hoàn thành", value: String(project.year) },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateCreated: String(project.year),
    locationCreated: { "@type": "Place", name: project.location },
    image: `${site.url}${project.cover}`,
    creator: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Anh bia */}
      <header className="k3-panel k3-on-dark relative isolate mx-[var(--inset)] mt-[var(--inset)] bg-deep">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={project.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/88 to-deep/55" />
        </div>

        <Container className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="[&_a]:text-canvas/60 [&_a:hover]:text-accent-bright [&_span]:text-canvas/40 [&_[aria-current]]:text-white">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Dự án", href: "/du-an/" },
                { label: project.title },
              ]}
            />
          </div>

          <span className="k3-eyebrow mt-8" data-on-dark="true">
            {categoryLabels[project.category]}
          </span>
          <h1 className="mt-4 max-w-4xl text-[clamp(2rem,1.2rem+3vw,3.5rem)] text-white">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-canvas/78">
            {project.summary}
          </p>
        </Container>
      </header>

      {/* Thong so */}
      <div className="bg-canvas">
        <Container>
          <dl className="grid gap-x-8 gap-y-7 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="font-display text-xs font-semibold tracking-[0.14em] text-muted-fg uppercase">
                  {spec.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-ink">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* Bai toan - Cach giai - Ket qua */}
      <Section tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-12">
                {[
                  { eyebrow: "Bài toán", title: "Ràng buộc ban đầu", text: project.challenge },
                  { eyebrow: "Cách giải", title: "Phương án chúng tôi chọn", text: project.solution },
                  { eyebrow: "Kết quả", title: "Sau khi bàn giao", text: project.result },
                ].map((block, i) => (
                  <Reveal key={block.eyebrow} delay={i * 60}>
                    <div className="border-l-2 border-accent pl-7">
                      <span className="k3-eyebrow">{block.eyebrow}</span>
                      <h2 className="mt-3 text-2xl">{block.title}</h2>
                      <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-mid">
                        {block.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Diem noi bat */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl border border-line bg-surface p-7 lg:p-8">
                <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-muted-fg uppercase">
                  Điểm nổi bật kỹ thuật
                </h2>
                <ul className="mt-5 space-y-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check
                        size={19}
                        className="mt-0.5 shrink-0 text-accent"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-ink-mid">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-7">
                  <p className="text-[0.9375rem] leading-relaxed text-muted-fg">
                    Anh chị có công trình tương tự? Chúng tôi khảo sát và khái
                    toán miễn phí.
                  </p>
                  <Button href="/lien-he/" className="mt-5 w-full">
                    Nhận tư vấn cho dự án của anh chị
                    <ArrowRight size={17} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Thu vien anh */}
      <Section tone="alt">
        <Container>
          <h2 className="text-2xl">Phối cảnh thiết kế</h2>
          <p className="mt-2.5 text-[0.9375rem] text-muted-fg">
            Bấm vào ảnh để xem kích thước lớn. Dùng phím mũi tên để chuyển ảnh.
          </p>
          <RenderNotice className="mt-6 max-w-3xl" />
          <div className="mt-9">
            <Gallery images={project.gallery} projectTitle={project.title} />
          </div>
        </Container>
      </Section>

      {/* Dieu huong truoc / sau */}
      <div className="bg-canvas-alt">
        <Container>
          <nav
            aria-label="Chuyển dự án"
            className="grid gap-px divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0"
          >
            <Link
              href={`/du-an/${prev.slug}/`}
              className="group flex items-center gap-4 py-8 transition-colors hover:text-accent sm:pr-8"
            >
              <ArrowLeft
                size={22}
                className="shrink-0 text-accent transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block font-display text-xs tracking-[0.12em] text-muted-fg uppercase">
                  Dự án trước
                </span>
                <span className="mt-1 block truncate font-display text-lg font-semibold">
                  {prev.title}
                </span>
              </span>
            </Link>
            <Link
              href={`/du-an/${next.slug}/`}
              className="group flex items-center justify-end gap-4 py-8 text-right transition-colors hover:text-accent sm:pl-8"
            >
              <span className="min-w-0">
                <span className="block font-display text-xs tracking-[0.12em] text-muted-fg uppercase">
                  Dự án tiếp theo
                </span>
                <span className="mt-1 block truncate font-display text-lg font-semibold">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                size={22}
                className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </nav>
        </Container>
      </div>

      {/* Du an lien quan */}
      <Section tone="canvas">
        <Container>
          <h2 className="text-2xl">Công trình khác</h2>
          <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

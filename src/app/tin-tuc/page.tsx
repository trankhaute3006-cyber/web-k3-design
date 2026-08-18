import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { sortedPosts } from "@/data/posts";
import { Container, PageHeader, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tin tức & kinh nghiệm xây dựng",
  description:
    "Kinh nghiệm thực tế về chi phí xây nhà, chống thấm, chọn nhà thầu và thiết kế thông gió — viết bởi đội ngũ kỹ sư K3 Design.",
  alternates: { canonical: "/tin-tuc/" },
};

export default function NewsPage() {
  const [lead, ...rest] = sortedPosts;

  return (
    <>
      <PageHeader
        eyebrow="Tin tức"
        title="Kinh nghiệm từ công trường, không phải bài viết chuẩn SEO"
        description="Những gì chúng tôi học được từ công trường, viết lại để anh chị dùng được ngay cả khi không làm việc với chúng tôi."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
      />

      <Section tone="canvas">
        <Container>
          {/* Bai noi bat */}
          <Reveal>
            <article className="group overflow-hidden rounded-3xl border border-line bg-surface">
              <Link href={`/tin-tuc/${lead.slug}/`} className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-canvas-alt lg:aspect-auto lg:min-h-[24rem]">
                  <Image
                    src={lead.cover}
                    alt={`Ảnh minh họa bài viết: ${lead.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 lg:p-12">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-fg">
                    <span className="inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1 font-display text-xs font-semibold tracking-wide text-accent uppercase">
                      {lead.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={15} aria-hidden="true" />
                      <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={15} aria-hidden="true" />
                      {lead.readingTime}
                    </span>
                  </div>

                  <h2 className="mt-5 text-[clamp(1.4rem,1.1rem+1.4vw,2rem)] transition-colors group-hover:text-accent">
                    {lead.title}
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-fg">
                    {lead.excerpt}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-accent">
                    Đọc bài viết
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>

          {/* Cac bai con lai */}
          <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal as="article" key={post.slug} delay={i * 70}>
                <Link href={`/tin-tuc/${post.slug}/`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-canvas-alt">
                    <Image
                      src={post.cover}
                      alt={`Ảnh minh họa bài viết: ${post.title}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-fg">
                    <span className="font-display text-xs font-semibold tracking-wide text-accent uppercase">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2.5 text-xl transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-fg">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

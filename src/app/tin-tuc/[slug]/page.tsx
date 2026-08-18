import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { posts, getPost, sortedPosts } from "@/data/posts";
import { site } from "@/data/site";
import {
  Breadcrumb,
  Button,
  Container,
  Section,
} from "@/components/ui/Primitives";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/tin-tuc/${post.slug}/` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover, width: 1200, height: 750, alt: post.title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: `${site.url}${post.cover}`,
    inLanguage: "vi-VN",
    author: { "@type": "Organization", name: site.legalName },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/tin-tuc/${post.slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="k3-panel k3-on-dark mx-[var(--inset)] mt-[var(--inset)] bg-deep pt-32 pb-14 text-white sm:pt-36 sm:pb-16">
        <Container size="narrow">
          <div className="[&_a]:text-canvas/60 [&_a:hover]:text-accent-bright [&_span]:text-canvas/40 [&_[aria-current]]:text-white">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Tin tức", href: "/tin-tuc/" },
                { label: post.category },
              ]}
            />
          </div>

          <span className="k3-eyebrow mt-8" data-on-dark="true">{post.category}</span>
          <h1 className="mt-4 text-[clamp(1.8rem,1.2rem+2.6vw,3rem)] text-white">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-canvas/60">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
        </Container>
      </header>

      <Section tone="canvas" className="pt-0! sm:pt-0!">
        <Container size="narrow">
          {/* Anh bia */}
          <div className="relative -mt-10 aspect-[16/10] overflow-hidden rounded-3xl bg-canvas-alt shadow-e3 sm:-mt-12">
            <Image
              src={post.cover}
              alt={`Ảnh minh họa bài viết: ${post.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
            />
          </div>

          {/* Noi dung */}
          <div className="mt-12">
            <p className="border-l-2 border-accent pl-6 font-display text-lg leading-relaxed font-medium text-ink">
              {post.excerpt}
            </p>

            <div className="mt-10 space-y-6">
              {post.body.map((block, i) =>
                block.startsWith("## ") ? (
                  <h2 key={i} className="pt-6 text-2xl">
                    {block.replace("## ", "")}
                  </h2>
                ) : (
                  <p
                    key={i}
                    className="text-[1.0625rem] leading-[1.8] text-ink-mid"
                  >
                    {block}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Khoi CTA cuoi bai */}
          <div className="mt-14 rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <h2 className="text-xl">Cần tư vấn cụ thể cho công trình của anh chị?</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-fg">
              Bài viết chỉ nêu nguyên tắc chung. Mỗi khu đất và mỗi gia đình có
              ràng buộc riêng — chúng tôi khảo sát và khái toán miễn phí.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/lien-he/">
                Đặt lịch khảo sát
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button href="/du-an/" variant="secondary">
                Xem công trình đã làm
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/tin-tuc/"
              className="group inline-flex items-center gap-2 font-display font-semibold text-ink transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Quay lại danh sách bài viết
            </Link>
          </div>
        </Container>
      </Section>

      {/* Bai viet khac */}
      <Section tone="alt">
        <Container>
          <h2 className="text-2xl">Bài viết khác</h2>
          <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <article key={p.slug}>
                <Link href={`/tin-tuc/${p.slug}/`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-canvas-alt">
                    <Image
                      src={p.cover}
                      alt={`Ảnh minh họa bài viết: ${p.title}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 text-sm text-muted-fg">
                    <span className="font-display text-xs font-semibold tracking-wide text-accent uppercase">
                      {p.category}
                    </span>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </div>
                  <h3 className="mt-2.5 text-lg transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

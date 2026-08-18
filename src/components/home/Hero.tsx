import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, BedDouble, Bath, Ruler, Award } from "lucide-react";
import { site } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { Button } from "@/components/ui/Primitives";
import { Counter } from "@/components/ui/Counter";

/** Anh dai dien khach hang — chi mang tinh trang tri */
function AvatarStack() {
  const avatars = [1, 2, 3, 4];
  return (
    <div className="flex items-center" aria-hidden="true">
      {avatars.map((n, i) => (
        <span
          key={n}
          className="relative -ml-2.5 inline-block h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/70 first:ml-0"
          style={{ zIndex: avatars.length - i }}
        >
          <Image
            src={`/images/avatars/avatar-${n}.svg`}
            alt=""
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
      <span className="-ml-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-bright text-[0.7rem] font-bold text-ink ring-2 ring-white/70">
        +
      </span>
    </div>
  );
}

export function Hero() {
  const featured = featuredProjects[0];
  const trusted = site.stats[1]; // "Cong trinh ban giao"
  const hasAward = Boolean(site.award.title);

  return (
    <section className="k3-inset bg-canvas pb-[var(--inset)]">
      <div className="k3-panel k3-on-dark relative isolate flex min-h-[46rem] flex-col justify-end bg-deep lg:min-h-[48rem]">
        {/* Anh nen */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="/images/hero.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Phu olive: dam ben trai de chu luon doc duoc, mo dan sang phai
              de van thay duoc cong trinh trong anh */}
          <div className="absolute inset-0 bg-deep/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/78 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/35" />
        </div>

        <div className="relative mx-auto w-full max-w-[80rem] px-6 pt-32 pb-10 sm:px-10 sm:pt-36 lg:px-14 lg:pb-14">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
            {/* ---------- Cot chu ---------- */}
            <div className="lg:col-span-7">
              <span className="k3-eyebrow" data-on-dark="true">
                {site.tagline}
              </span>

              <h1 className="mt-6 max-w-[23ch] text-[clamp(2.25rem,1.2rem+3.2vw,3.5rem)] text-white">
                Kiến tạo không gian,
                <span className="mt-1 block text-accent-bright">
                  bền vững theo thời gian
                </span>
              </h1>

              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-canvas/78">
                Chúng tôi thiết kế và thi công những công trình được tính toán
                kỹ để bền theo năm tháng — minh bạch chi phí, cam kết tiến độ
                ngay trong hợp đồng.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/du-an/" variant="white" size="lg">
                  Xem dự án
                </Button>
                <Button href="/dich-vu/" variant="onDark" size="lg">
                  Dịch vụ của chúng tôi
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>

              <Link
                href="/quy-trinh/"
                className="group mt-9 inline-flex items-center gap-2 font-display text-[0.9375rem] font-semibold text-white underline decoration-accent-bright decoration-2 underline-offset-[6px] transition-colors hover:text-accent-bright"
              >
                Xem quy trình làm việc
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* ---------- Cot the kinh ---------- */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start lg:flex-col lg:items-end">
                {/* The: du an tieu bieu */}
                <Link
                  href={`/du-an/${featured.slug}/`}
                  className="k3-glass group block w-full rounded-2xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:max-w-sm lg:w-full lg:max-w-[20rem]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-accent-bright">
                      <Building2 size={19} aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      size={19}
                      className="text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-canvas/65 uppercase">
                    Dự án tiêu biểu
                  </p>
                  <p className="mt-1.5 font-display text-2xl leading-tight font-bold text-accent-bright">
                    {featured.title}
                  </p>
                  <p className="mt-2 text-sm text-canvas/72">
                    {featured.location}
                  </p>

                  <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-sm text-white">
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={15} className="text-accent-bright" aria-hidden="true" />
                      <dt className="sr-only">Phòng ngủ</dt>
                      <dd className="tabular">4 phòng ngủ</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={15} className="text-accent-bright" aria-hidden="true" />
                      <dt className="sr-only">Phòng tắm</dt>
                      <dd className="tabular">3 phòng tắm</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ruler size={15} className="text-accent-bright" aria-hidden="true" />
                      <dt className="sr-only">Diện tích sàn</dt>
                      <dd className="tabular">420 m²</dd>
                    </div>
                  </dl>
                </Link>

                {/* The: so lieu tin cay */}
                <div className="k3-glass w-full rounded-2xl p-6 sm:max-w-xs lg:w-full lg:max-w-[18rem] lg:-mt-2 lg:mr-6">
                  <p className="text-xs font-semibold tracking-[0.14em] text-canvas/65 uppercase">
                    Được tin tưởng bởi
                  </p>
                  <p className="mt-2 font-display text-[2.75rem] leading-none font-bold text-accent-bright">
                    <Counter value={trusted.value} suffix={trusted.suffix} />
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">
                    {trusted.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-canvas/72">
                    Bàn giao đúng hẹn, minh bạch chi phí và đồng hành lâu dài
                    sau khi công trình hoàn thành.
                  </p>
                  <div className="mt-5">
                    <AvatarStack />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Ghi nhan / giai thuong ---------- */}
          {hasAward ? (
            <div className="mt-10 flex justify-end lg:mt-6">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-bright text-ink">
                  <Award size={18} aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block text-canvas/65">
                    {site.award.source}
                  </span>
                  <span className="block font-display font-semibold text-white">
                    {site.award.title}
                  </span>
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyUs } from "@/components/home/WhyUs";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline} | ${site.slogan}`,
  description:
    "Công ty thiết kế kiến trúc và thi công xây dựng trọn gói tại TP.HCM. Bảng vật tư minh bạch, cam kết tiến độ trong hợp đồng, bảo hành kết cấu 60 tháng.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedWork />
      <WhyUs />
      <ProcessStrip />
      <Testimonials />
      <CtaBand />
    </>
  );
}

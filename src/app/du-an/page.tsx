import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Container, PageHeader, Section } from "@/components/ui/Primitives";
import { RenderNotice } from "@/components/ui/RenderNotice";
import { ProjectBrowser } from "@/components/project/ProjectBrowser";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Phối cảnh & phong cách thiết kế",
  description:
    "Nhà phố, biệt thự, văn phòng và nhà xưởng do K3 Design thiết kế. Mỗi dự án trình bày rõ bài toán, cách giải và kết quả hướng tới.",
  alternates: { canonical: "/du-an/" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dự án"
        title="Phong cách thiết kế của chúng tôi"
        description="Mỗi dự án được trình bày theo bài toán ban đầu, phương án xử lý và kết quả hướng tới — để anh chị đánh giá bằng cách nghĩ, không chỉ bằng ảnh."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Dự án" }]}
      />

      <Section tone="canvas">
        <Container>
          <RenderNotice className="mb-10 max-w-3xl" />
          <ProjectBrowser projects={projects} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

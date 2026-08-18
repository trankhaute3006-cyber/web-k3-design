import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Container, PageHeader, Section } from "@/components/ui/Primitives";
import { ProjectBrowser } from "@/components/project/ProjectBrowser";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Dự án đã thực hiện",
  description:
    "Nhà phố, biệt thự, căn hộ, văn phòng và nhà xưởng do K3 Design thiết kế và thi công. Mỗi dự án ghi rõ bài toán, cách giải và kết quả.",
  alternates: { canonical: "/du-an/" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dự án"
        title="Công trình đã bàn giao"
        description="Chúng tôi ghi lại bài toán ban đầu, cách giải quyết và kết quả đo được của từng dự án — để anh chị đánh giá bằng nội dung, không chỉ bằng ảnh."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Dự án" }]}
      />

      <Section tone="canvas">
        <Container>
          <ProjectBrowser projects={projects} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

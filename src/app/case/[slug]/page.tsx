import { notFound } from "next/navigation";
import ProjectCaseView from "../../../components/ProjectCaseView";
import { projects } from "../../../data/portfolio";

export default function CasePage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseView project={project} />;
}

import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ProjectDetails } from "./project-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HouseProjectDetailsPage({ params }: PageProps) {
  const { t } = await getServerI18n();
  const project = await prisma.houseProject.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      assignedTo: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">
          {t("houseProjects.details.pageTitle", "House Project Details")}
        </h1>
      </div>

      <ProjectDetails project={project} />
    </div>
  );
}

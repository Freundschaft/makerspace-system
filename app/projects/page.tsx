import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localizePathname } from "@/lib/i18n/config";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { ProjectsTable } from "./projects-table";

export default async function ProjectsPage() {
  const { locale, t } = await getServerI18n();
  const projects = await prisma.project.findMany({
    include: {
      assignedTo: true,
    },
    orderBy: [
      { startDate: "desc" },
      { createdAt: "desc" },
    ],
  });

  const serializedProjects = projects.map((project) => ({
    ...project,
    startDate: project.startDate ? project.startDate.toISOString() : null,
    endDate: project.endDate ? project.endDate.toISOString() : null,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    assignedTo: project.assignedTo
      ? {
          email: project.assignedTo.email,
        }
      : null,
  }));

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-2xl font-bold">{t("modules.projects.title", "Projects")}</h1>
        <Button asChild>
          <Link href={localizePathname("/projects/new", locale)}>
            {t("modules.projects.new", "New Project")}
          </Link>
        </Button>
      </div>
      <ProjectsTable data={serializedProjects} />
    </div>
  );
}

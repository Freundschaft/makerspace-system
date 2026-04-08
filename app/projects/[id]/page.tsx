import { notFound } from "next/navigation";

import { BackButton } from "@/components/BackButton";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { ProjectDetails } from "./project-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
  const project = await prisma.project.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">{t("projects.details.pageTitle", "Project Details")}</h1>
      </div>

      <ProjectDetails
        project={project}
        locale={locale}
        labels={{
          projectInfo: t("projects.details.projectInfo", "Project Information"),
          name: t("projects.fields.name", "Name"),
          assignee: t("projects.fields.assignee", "Assignee"),
          status: t("common.status", "Status"),
          startDate: t("projects.fields.startDate", "Start Date"),
          endDate: t("projects.fields.endDate", "End Date"),
          purpose: t("projects.fields.purpose", "Purpose"),
          hashtag: t("projects.fields.hashtag", "Hashtag"),
          notes: t("common.notes", "Notes"),
          album: t("projects.fields.googlePhotosAlbumLink", "Google Photos Album Link"),
          openAlbum: t("projects.actions.openAlbum", "Open album"),
          edit: t("common.edit", "Edit"),
          statusLabels: {
            [project.status]: t(`projects.statuses.${project.status}`, project.status),
          },
        }}
      />
    </div>
  );
}

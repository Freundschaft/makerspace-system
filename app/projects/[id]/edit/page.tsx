import { notFound } from "next/navigation";

import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../../new/project-form";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("projects.edit.pageTitle", "Edit Project")}</h1>
      </div>
      <ProjectForm
        mode="edit"
        projectId={project.id}
        initialData={{
          name: project.name,
          notes: project.notes,
          assignee: project.assignee,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
          googlePhotosAlbumLink: project.googlePhotosAlbumLink,
          hashtag: project.hashtag,
          purpose: project.purpose,
        }}
      />
    </div>
  );
}

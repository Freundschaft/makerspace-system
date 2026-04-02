import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { ProjectDetails } from "./project-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HouseProjectDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
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

      <ProjectDetails
        project={project}
        locale={locale}
        labels={{
          financeContextLabel: t(
            "finance.expenses.source.houseProjectLinked",
            `Linked to house project: ${project.houseName}`
          ),
          financeTitle: project.workType,
          logExpense: t("finance.expenses.actions.logExpense", "Log expense"),
          projectInfo: t("houseProjects.details.projectInfo", "Project Information"),
          houseName: t("houseProjects.fields.houseName", "House"),
          location: t("houseProjects.fields.location", "Location / Room"),
          workType: t("houseProjects.fields.workType", "Work Type"),
          status: t("common.status", "Status"),
          date: t("houseProjects.fields.date", "Date"),
          timeNeeded: t("houseProjects.fields.timeNeeded", "Time Needed"),
          materialCosts: t("houseProjects.fields.materialCosts", "Material Costs (€)"),
          assignedTo: t("houseProjects.details.assignedTo", "Assigned To"),
          description: t("common.description", "Description"),
          notes: t("common.notes", "Notes"),
          photo: t("common.photo", "Photo"),
          photoAlt: t("houseProjects.details.photoAlt", "House project"),
          statusLabels: {
            [project.status]: t(`houseProjects.statuses.${project.status}`, project.status),
          },
        }}
      />
    </div>
  );
}

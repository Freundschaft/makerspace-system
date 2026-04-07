import { ProjectsTable } from "./projects-table"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { localizePathname } from "@/lib/i18n/config"

export default async function CarpentryProjectsPage() {
  const { locale, t } = await getServerI18n()
  const projects = await prisma.carpentryProject.findMany({
    include: {
      assignedTo: true
    },
    orderBy: {
      date: 'desc'
    }
  })
  const serializedProjects = projects.map((project) => ({
    ...project,
    date: project.date.toISOString(),
    materialCosts: project.materialCosts === null ? null : Number(project.materialCosts),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    assignedTo: project.assignedTo
      ? {
          email: project.assignedTo.email,
        }
      : null,
  }))

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.carpentry.title", "Carpentry Projects")}</h1>
        <Button asChild>
          <Link href={localizePathname("/carpentry/projects/new", locale)}>{t("modules.carpentry.new", "New Project")}</Link>
        </Button>
      </div>
      <ProjectsTable data={serializedProjects} />
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation"
import { ProjectDetails } from "./project-details"
import { BackButton } from "@/components/BackButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CarpentryProjectDetailsPage({ params }: PageProps) {
  const { t } = await getServerI18n();
  const project = await prisma.carpentryProject.findUnique({
    where: {
      id: (await params).id
    },
    include: {
      assignedTo: true
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
         <BackButton />
         <h1 className="text-2xl font-bold">{t("carpentry.details.pageTitle", "Carpentry Project Details")}</h1>
      </div>

      <ProjectDetails project={project} />
    </div>
  )
}

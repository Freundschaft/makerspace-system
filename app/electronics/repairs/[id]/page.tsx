import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation"
import { RepairDetails } from "./repair-details"
import { BackButton } from "@/components/BackButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ElectronicsRepairDetailsPage({ params }: PageProps) {
  const { t } = await getServerI18n();
  const repair = await prisma.electronicsRepair.findUnique({
    where: {
      id: (await params).id
    },
    include: {
      repairer: true
    }
  })

  if (!repair) {
    notFound()
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
         <BackButton />
         <h1 className="text-2xl font-bold">{t("electronics.details.pageTitle", "Electronics Repair Details")}</h1>
      </div>

      <RepairDetails repair={repair} />
    </div>
  )
}

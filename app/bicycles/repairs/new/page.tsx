import { RepairForm } from "./repair-form"
import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server"

export default async function NewRepairPage() {
  const { t } = await getServerI18n()
  const problemTypes = await prisma.problemType.findMany({
    orderBy: {
      index: 'asc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t("modules.repairs.newPageTitle", "New Bicycle Repair")}</h1>
      <RepairForm problemTypes={problemTypes} />
    </div>
  )
} 

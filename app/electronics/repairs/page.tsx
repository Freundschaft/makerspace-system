import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { RepairsTable } from "./repairs-table"
import type { ElectronicsRepair } from "./columns"
import { localizePathname } from "@/lib/i18n/config"

export default async function ElectronicsRepairsPage() {
  const { locale, t } = await getServerI18n()
  const repairsResult = await prisma.electronicsRepair.findMany({
    include: {
      repairer: true
    },
    orderBy: {
      createdDate: 'desc'
    }
  })

  const repairs: ElectronicsRepair[] = repairsResult.map((repair) => ({
    id: repair.id,
    repairId: repair.repairId,
    customerName: repair.customerName,
    customerIdCardNumber: repair.customerIdCardNumber ?? "",
    category: repair.category,
    item: repair.item,
    whatsapp: repair.whatsapp,
    serialNumber: repair.serialNumber,
    status: repair.status,
    repairable: repair.repairable,
    notes: repair.notes,
    photoPath: repair.photoPath,
    createdDate: repair.createdDate,
    repairer: repair.repairer,
  }))

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.electronics.title", "Electronics Repairs")}</h1>
        <Button asChild>
          <Link href={localizePathname("/electronics/repairs/new", locale)}>{t("modules.electronics.new", "New Repair")}</Link>
        </Button>
      </div>
      <RepairsTable data={repairs} />
    </div>
  )
}

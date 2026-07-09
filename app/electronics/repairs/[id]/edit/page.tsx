import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server"
import { ElectronicsRepairForm } from "../../new/repair-form"

interface EditElectronicsRepairPageProps {
  params: Promise<{ id: string }>
}

export default async function EditElectronicsRepairPage({
  params,
}: EditElectronicsRepairPageProps) {
  const { t } = await getServerI18n()
  const { id } = await params

  const repair = await prisma.electronicsRepair.findUnique({
    where: { id },
  })

  if (!repair) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
        {t("electronics.edit.pageTitle", "Edit Electronics Repair")}
      </h1>
      <ElectronicsRepairForm
        mode="edit"
        repairId={repair.id}
        initialData={{
          createdDate: repair.createdDate.toISOString().slice(0, 10),
          customerName: repair.customerName,
          customerIdCardNumber: repair.customerIdCardNumber,
          category: repair.category,
          item: repair.item ?? "",
          whatsapp: repair.whatsapp ?? "",
          serialNumber: repair.serialNumber ?? "",
          status: repair.status,
          repairable: repair.repairable ?? undefined,
          notes: repair.notes ?? "",
          photoPath: repair.photoPath ?? "",
        }}
      />
    </div>
  )
}

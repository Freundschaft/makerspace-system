import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { RepairDetails } from "./repair-details"
import { BackButton } from "@/components/BackButton"
import { getServerI18n } from "@/lib/i18n/server"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RepairDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n()
  const repair = await prisma.bicycleRepair.findUnique({
    where: {
      id: (await params).id
    },
    include: {
      partsUsed: {
        include: {
          part: true
        }
      }
    }
  })

  if (!repair) {
    notFound()
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
         <BackButton />
         <h1 className="text-2xl font-bold">{t("modules.repairs.detailsTitle", "Repair Details")}</h1>
      </div>
      
      <RepairDetails
        repair={repair}
        locale={locale}
        labels={{
          contactInfo: t("repairs.details.contactInfo", "Contact Information"),
          contactInfoDesc: t("repairs.details.contactInfoDesc", "Details about the bicycle owner"),
          ownerName: t("repairs.form.ownerName", "Owner Name"),
          ownerIdCardNumber: t("repairs.form.ownerIdCardNumber", "ID Card Number"),
          phone: t("common.phone", "Phone"),
          repairInfo: t("repairs.details.repairInfo", "Repair Information"),
          repairInfoDesc: t("repairs.details.repairInfoDesc", "Details about the repair"),
          status: t("common.status", "Status"),
          problemTypes: t("repairs.details.problemTypes", "Problem Types"),
          receivedDate: t("repairs.details.receivedDate", "Received Date"),
          repairedDate: t("repairs.details.repairedDate", "Repaired Date"),
          pickupDate: t("repairs.details.pickupDate", "Pickup Date"),
          description: t("common.description", "Description"),
          bicyclePhoto: t("repairs.details.bicyclePhoto", "Bicycle Photo"),
          photoAlt: t("common.photo", "Photo"),
          partsUsed: t("repairs.details.partsUsed", "Parts Used"),
          part: t("repairs.details.part", "Part"),
          quantity: t("repairs.details.quantity", "Quantity"),
          edit: t("common.edit", "Edit"),
          delete: t("common.delete", "Delete"),
          statusLabels: {
            [repair.status]: t(`common.statuses.${repair.status}`, repair.status),
          },
          problemTypeLabels: Object.fromEntries(
            JSON.parse(repair.problemTypes).map((type: string) => [
              type,
              t(`bicycles.problemTypes.${type}`, type),
            ])
          ),
        }}
      />
    </div>
  )
} 

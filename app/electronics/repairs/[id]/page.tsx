import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation"
import { RepairDetails } from "./repair-details"
import { BackButton } from "@/components/BackButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ElectronicsRepairDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
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

      <RepairDetails
        repair={repair}
        locale={locale}
        labels={{
          customerInfo: t("electronics.details.customerInfo", "Customer Information"),
          customerInfoDesc: t("electronics.details.customerInfoDesc", "Contact details and device info"),
          repairId: t("electronics.details.repairId", "Repair ID"),
          customer: t("electronics.details.customer", "Customer"),
          customerIdCardNumber: t("electronics.new.fields.customerIdCardNumber", "ID Card Number"),
          whatsapp: t("electronics.new.fields.whatsapp", "WhatsApp"),
          serialNumber: t("electronics.new.fields.serialNumber", "Serial Number"),
          repairInfo: t("electronics.details.repairInfo", "Repair Information"),
          repairInfoDesc: t("electronics.details.repairInfoDesc", "Device and repair status"),
          category: t("electronics.new.fields.category", "Category"),
          item: t("electronics.details.item", "Item"),
          status: t("common.status", "Status"),
          repairable: t("electronics.new.fields.repairable", "Repairable"),
          notAssessed: t("electronics.details.notAssessed", "Not assessed"),
          yes: t("common.yes", "Yes"),
          no: t("common.no", "No"),
          created: t("common.created", "Created"),
          repairer: t("electronics.details.repairer", "Repairer"),
          notes: t("common.notes", "Notes"),
          photo: t("electronics.new.fields.photo", "Device Photo"),
          devicePhotoAlt: t("electronics.details.devicePhotoAlt", "Electronic device"),
          edit: t("common.edit", "Edit"),
          delete: t("common.delete", "Delete"),
          categoryLabels: {
            [repair.category]: t(`electronics.categories.${repair.category}`, repair.category),
          },
          statusLabels: {
            [repair.status]: t(`common.statuses.${repair.status}`, repair.status),
          },
        }}
      />
    </div>
  )
}

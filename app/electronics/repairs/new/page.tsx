import { getServerI18n } from "@/lib/i18n/server";
import { ElectronicsRepairForm } from "./repair-form"

export default async function NewElectronicsRepairPage() {
  const { t } = await getServerI18n();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t("electronics.new.pageTitle", "New Electronics Repair")}</h1>
      <ElectronicsRepairForm />
    </div>
  )
}

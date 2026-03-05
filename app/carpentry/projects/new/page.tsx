import { getServerI18n } from "@/lib/i18n/server";
import { CarpentryProjectForm } from "./project-form"

export default async function NewCarpentryProjectPage() {
  const { t } = await getServerI18n();
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t("carpentry.new.pageTitle", "New Carpentry Project")}</h1>
      <CarpentryProjectForm />
    </div>
  )
}

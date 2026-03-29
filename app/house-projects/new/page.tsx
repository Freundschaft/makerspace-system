import { getServerI18n } from "@/lib/i18n/server";
import { HouseProjectForm } from "./project-form";

export default async function NewHouseProjectPage() {
  const { t } = await getServerI18n();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <h1 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
        {t("houseProjects.new.pageTitle", "New House Project")}
      </h1>
      <HouseProjectForm />
    </div>
  );
}

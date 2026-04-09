import { getServerI18n } from "@/lib/i18n/server";
import { JobForm } from "./job-form";

export default async function NewJobPage() {
  const { t } = await getServerI18n();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("jobs.new.pageTitle", "New Job")}</h1>
      </div>
      <JobForm mode="create" />
    </div>
  );
}

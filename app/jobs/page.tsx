import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localizePathname } from "@/lib/i18n/config";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { JobsTable } from "./jobs-table";

export default async function JobsPage() {
  const { locale, t } = await getServerI18n();
  const jobs = await prisma.job.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });

  const serializedJobs = jobs.map((job) => ({
    ...job,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  }));

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-2xl font-bold">{t("modules.jobs.title", "Jobs")}</h1>
        <Button asChild>
          <Link href={localizePathname("/jobs/new", locale)}>
            {t("modules.jobs.new", "New Job")}
          </Link>
        </Button>
      </div>
      <JobsTable data={serializedJobs} />
    </div>
  );
}

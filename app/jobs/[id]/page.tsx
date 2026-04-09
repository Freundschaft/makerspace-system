import { notFound } from "next/navigation";

import { BackButton } from "@/components/BackButton";
import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { JobDetails } from "./job-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
  const job = await prisma.job.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">{t("jobs.details.pageTitle", "Job Details")}</h1>
      </div>

      <JobDetails
        job={job}
        locale={locale}
        labels={{
          jobInfo: t("jobs.details.jobInfo", "Job Information"),
          name: t("jobs.fields.name", "Name"),
          status: t("common.status", "Status"),
          slug: t("jobs.fields.slug", "Slug"),
          notes: t("common.notes", "Notes"),
          edit: t("common.edit", "Edit"),
          statusLabels: {
            [job.status]: t(`jobs.statuses.${job.status}`, job.status),
          },
        }}
      />
    </div>
  );
}

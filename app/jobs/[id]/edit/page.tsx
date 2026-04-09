import { notFound } from "next/navigation";

import { getServerI18n } from "@/lib/i18n/server";
import { prisma } from "@/lib/prisma";
import { JobForm } from "../../new/job-form";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("jobs.edit.pageTitle", "Edit Job")}</h1>
      </div>
      <JobForm
        mode="edit"
        jobId={job.id}
        initialData={{
          name: job.name,
          notes: job.notes,
          status: job.status,
          slug: job.slug,
        }}
      />
    </div>
  );
}

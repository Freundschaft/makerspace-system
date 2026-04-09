import { Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/generated/prisma";
import { Locale, localizePathname } from "@/lib/i18n/config";

interface JobDetailsProps {
  job: Job;
  locale: Locale;
  labels: {
    jobInfo: string;
    name: string;
    status: string;
    slug: string;
    notes: string;
    edit: string;
    statusLabels: Record<string, string>;
  };
}

function getStatusVariant(status: Job["status"]) {
  switch (status) {
    case "CLOSED":
      return "secondary";
    default:
      return "default";
  }
}

export async function JobDetails({ job, locale, labels }: JobDetailsProps) {
  const editHref = localizePathname(`/jobs/${job.id}/edit`, locale);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={editHref}>
            <Pencil className="mr-2 h-4 w-4" />
            {labels.edit}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{labels.jobInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.name}:</div>
              <div>{job.name}</div>

              <div className="font-medium">{labels.status}:</div>
              <div>
                <Badge variant={getStatusVariant(job.status)}>
                  {labels.statusLabels[job.status] ?? job.status}
                </Badge>
              </div>

              <div className="font-medium">{labels.slug}:</div>
              <div>{job.slug || "—"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.notes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{job.notes || "—"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

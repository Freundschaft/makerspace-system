import { ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/generated/prisma";
import { Locale, localizePathname } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";

interface ProjectDetailsProps {
  project: Project;
  locale: Locale;
  labels: {
    projectInfo: string;
    name: string;
    assignee: string;
    status: string;
    startDate: string;
    endDate: string;
    purpose: string;
    hashtag: string;
    notes: string;
    album: string;
    openAlbum: string;
    edit: string;
    statusLabels: Record<string, string>;
  };
}

function getStatusVariant(status: Project["status"]) {
  switch (status) {
    case "DONE":
      return "secondary";
    case "IN_PROGRESS":
      return "default";
    case "OFF":
      return "outline";
    default:
      return "destructive";
  }
}

export async function ProjectDetails({ project, locale, labels }: ProjectDetailsProps) {
  const editHref = localizePathname(`/projects/${project.id}/edit`, locale);

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
            <CardTitle>{labels.projectInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.name}:</div>
              <div>{project.name}</div>

              <div className="font-medium">{labels.assignee}:</div>
              <div>{project.assignee || "—"}</div>

              <div className="font-medium">{labels.status}:</div>
              <div>
                <Badge variant={getStatusVariant(project.status)}>
                  {labels.statusLabels[project.status] ?? project.status}
                </Badge>
              </div>

              <div className="font-medium">{labels.startDate}:</div>
              <div>{project.startDate ? formatDate(project.startDate) : "—"}</div>

              <div className="font-medium">{labels.endDate}:</div>
              <div>{project.endDate ? formatDate(project.endDate) : "—"}</div>

              <div className="font-medium">{labels.purpose}:</div>
              <div>{project.purpose || "—"}</div>

              <div className="font-medium">{labels.hashtag}:</div>
              <div>{project.hashtag || "—"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.notes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{project.notes || "—"}</p>
          </CardContent>
        </Card>

        {project.googlePhotosAlbumLink ? (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.album}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href={project.googlePhotosAlbumLink} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {labels.openAlbum}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

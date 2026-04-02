import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HouseProject, User } from "@/generated/prisma";
import { formatDate } from "@/lib/utils";
import { Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Locale, localizePathname } from "@/lib/i18n/config";

type ProjectWithAssignedTo = HouseProject & {
  assignedTo: User | null;
};

interface ProjectDetailsProps {
  project: ProjectWithAssignedTo;
  locale: Locale;
  labels: {
    financeContextLabel: string;
    financeTitle: string;
    logExpense: string;
    projectInfo: string;
    houseName: string;
    location: string;
    workType: string;
    status: string;
    date: string;
    timeNeeded: string;
    materialCosts: string;
    assignedTo: string;
    description: string;
    notes: string;
    photo: string;
    photoAlt: string;
    statusLabels: Record<string, string>;
  };
}

function getStatusVariant(status: HouseProject["status"]) {
  switch (status) {
    case "COMPLETED":
      return "secondary";
    case "IN_PROGRESS":
      return "default";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

export async function ProjectDetails({ project, locale, labels }: ProjectDetailsProps) {
  const financeHref = localizePathname(
    `/finance/new-expense?houseProjectId=${project.id}&contextLabel=${encodeURIComponent(labels.financeContextLabel)}&title=${encodeURIComponent(labels.financeTitle)}`,
    locale,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={financeHref}>
            <Receipt className="mr-2 h-4 w-4" />
            {labels.logExpense}
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
            <div className="font-medium">{labels.houseName}:</div>
            <div>{project.houseName}</div>

            <div className="font-medium">{labels.location}:</div>
            <div>{project.location || "—"}</div>

            <div className="font-medium">{labels.workType}:</div>
            <div>{project.workType}</div>

            <div className="font-medium">{labels.status}:</div>
            <div>
              <Badge variant={getStatusVariant(project.status)}>
                {labels.statusLabels[project.status] ?? project.status}
              </Badge>
            </div>

            <div className="font-medium">{labels.date}:</div>
            <div>{formatDate(project.date)}</div>

            <div className="font-medium">{labels.timeNeeded}:</div>
            <div>{project.timeNeeded ? `${project.timeNeeded}h` : "—"}</div>

            <div className="font-medium">{labels.materialCosts}:</div>
            <div>{project.materialCosts ? `€${Number(project.materialCosts).toFixed(2)}` : "—"}</div>

            <div className="font-medium">{labels.assignedTo}:</div>
            <div>{project.assignedTo?.email || "—"}</div>
          </div>
        </CardContent>
      </Card>

        <Card>
          <CardHeader>
          <CardTitle>{labels.description}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{project.description}</p>
        </CardContent>
      </Card>

      {project.notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{labels.notes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{project.notes}</p>
          </CardContent>
        </Card>
      )}

      {project.photoPath && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{labels.photo}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={project.photoPath}
              alt={labels.photoAlt}
              width={1200}
              height={900}
              unoptimized
              className="h-auto max-w-full rounded-lg"
            />
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}

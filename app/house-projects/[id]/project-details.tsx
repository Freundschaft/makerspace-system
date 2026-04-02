"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HouseProject, User } from "@/generated/prisma";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/app/components/I18nProvider";
import { Receipt } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProjectWithAssignedTo = HouseProject & {
  assignedTo: User | null;
};

interface ProjectDetailsProps {
  project: ProjectWithAssignedTo;
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

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            router.push(
              `/finance/new-expense?houseProjectId=${project.id}&contextLabel=${encodeURIComponent(
                t("finance.expenses.source.houseProjectLinked", `Linked to house project: ${project.houseName}`),
              )}&title=${encodeURIComponent(project.workType)}`,
            )
          }
        >
          <Receipt className="mr-2 h-4 w-4" />
          {t("finance.expenses.actions.logExpense", "Log expense")}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("houseProjects.details.projectInfo", "Project Information")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">{t("houseProjects.fields.houseName", "House")}:</div>
            <div>{project.houseName}</div>

            <div className="font-medium">{t("houseProjects.fields.location", "Location / Room")}:</div>
            <div>{project.location || "—"}</div>

            <div className="font-medium">{t("houseProjects.fields.workType", "Work Type")}:</div>
            <div>{project.workType}</div>

            <div className="font-medium">{t("common.status", "Status")}:</div>
            <div>
              <Badge variant={getStatusVariant(project.status)}>
                {t(`houseProjects.statuses.${project.status}`, project.status)}
              </Badge>
            </div>

            <div className="font-medium">{t("houseProjects.fields.date", "Date")}:</div>
            <div>{formatDate(project.date)}</div>

            <div className="font-medium">{t("houseProjects.fields.timeNeeded", "Time Needed")}:</div>
            <div>{project.timeNeeded ? `${project.timeNeeded}h` : "—"}</div>

            <div className="font-medium">{t("houseProjects.fields.materialCosts", "Material Costs (€)")}:</div>
            <div>{project.materialCosts ? `€${Number(project.materialCosts).toFixed(2)}` : "—"}</div>

            <div className="font-medium">{t("houseProjects.details.assignedTo", "Assigned To")}:</div>
            <div>{project.assignedTo?.email || "—"}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("common.description", "Description")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{project.description}</p>
        </CardContent>
      </Card>

      {project.notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("common.notes", "Notes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{project.notes}</p>
          </CardContent>
        </Card>
      )}

      {project.photoPath && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("common.photo", "Photo")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={project.photoPath}
              alt={t("houseProjects.details.photoAlt", "House project")}
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

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

const statusLabels: Record<string, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export type HouseProject = {
  id: string;
  date: Date;
  houseName: string;
  location: string | null;
  workType: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  timeNeeded: number | null;
  materialCosts: any | null;
  notes: string | null;
  photoPath: string | null;
  assignedTo: {
    email: string | null;
  } | null;
};

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

export function getColumns(t: Translator): ColumnDef<HouseProject>[] {
  return [
    {
      accessorKey: "date",
      header: t("houseProjects.fields.date", "Date"),
      cell: ({ row }) => {
        const id = row.original.id;
        const date = row.getValue("date") as Date;
        return (
          <Link href={`/house-projects/${id}`} className="block">
            {format(new Date(date), "PPP")}
          </Link>
        );
      },
    },
    {
      accessorKey: "houseName",
      header: t("houseProjects.fields.houseName", "House"),
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link href={`/house-projects/${id}`} className="block">
            {row.getValue("houseName")}
          </Link>
        );
      },
    },
    {
      accessorKey: "workType",
      header: t("houseProjects.fields.workType", "Work Type"),
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link href={`/house-projects/${id}`} className="block">
            {row.getValue("workType")}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: t("common.status", "Status"),
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.getValue("status") as HouseProject["status"];
        return (
          <Link href={`/house-projects/${id}`} className="block">
            <Badge variant={getStatusVariant(status)}>
              {t(`houseProjects.statuses.${status}`, statusLabels[status] || status)}
            </Badge>
          </Link>
        );
      },
    },
    {
      accessorKey: "location",
      header: t("houseProjects.fields.location", "Location"),
      cell: ({ row }) => {
        const id = row.original.id;
        const location = row.getValue("location") as string | null;
        return (
          <Link href={`/house-projects/${id}`} className="block">
            {location || "—"}
          </Link>
        );
      },
    },
    {
      accessorKey: "timeNeeded",
      header: t("houseProjects.fields.timeNeeded", "Time Needed"),
      cell: ({ row }) => {
        const id = row.original.id;
        const timeNeeded = row.getValue("timeNeeded") as number | null;
        return (
          <Link href={`/house-projects/${id}`} className="block">
            {timeNeeded ? `${timeNeeded}h` : "—"}
          </Link>
        );
      },
    },
  ];
}

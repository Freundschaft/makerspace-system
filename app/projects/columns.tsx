import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

const statusLabels: Record<string, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  OFF: "Off",
};

export type ProjectRow = {
  id: string;
  name: string;
  notes: string | null;
  assignee: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "OFF";
  startDate: string | null;
  endDate: string | null;
  googlePhotosAlbumLink: string | null;
  hashtag: string | null;
  purpose: string | null;
  assignedTo: {
    email: string | null;
  } | null;
};

function getStatusVariant(status: ProjectRow["status"]) {
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

export function getColumns(t: Translator): ColumnDef<ProjectRow>[] {
  return [
    {
      accessorKey: "name",
      header: t("projects.fields.name", "Name"),
      cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`} className="block">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: t("common.status", "Status"),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Link href={`/projects/${row.original.id}`} className="block">
            <Badge variant={getStatusVariant(status)}>
              {t(`projects.statuses.${status}`, statusLabels[status] || status)}
            </Badge>
          </Link>
        );
      },
    },
    {
      accessorKey: "assignee",
      header: t("projects.fields.assignee", "Assignee"),
      cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`} className="block">
          {row.original.assignee || "—"}
        </Link>
      ),
    },
    {
      accessorKey: "startDate",
      header: t("projects.fields.startDate", "Start Date"),
      cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`} className="block">
          {row.original.startDate ? format(new Date(row.original.startDate), "PPP") : "—"}
        </Link>
      ),
    },
    {
      accessorKey: "endDate",
      header: t("projects.fields.endDate", "End Date"),
      cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`} className="block">
          {row.original.endDate ? format(new Date(row.original.endDate), "PPP") : "—"}
        </Link>
      ),
    },
    {
      accessorKey: "hashtag",
      header: t("projects.fields.hashtag", "Hashtag"),
      cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`} className="block">
          {row.original.hashtag || "—"}
        </Link>
      ),
    },
  ];
}

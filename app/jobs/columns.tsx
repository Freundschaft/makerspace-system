import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

const statusLabels: Record<string, string> = {
  OPEN: "Open",
  CLOSED: "Closed",
};

export type JobRow = {
  id: string;
  name: string;
  notes: string | null;
  status: "OPEN" | "CLOSED";
  slug: string | null;
};

function getStatusVariant(status: JobRow["status"]) {
  switch (status) {
    case "CLOSED":
      return "secondary";
    default:
      return "default";
  }
}

export function getColumns(t: Translator): ColumnDef<JobRow>[] {
  return [
    {
      accessorKey: "name",
      header: t("jobs.fields.name", "Name"),
      cell: ({ row }) => (
        <Link href={`/jobs/${row.original.id}`} className="block">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: t("common.status", "Status"),
      cell: ({ row }) => (
        <Link href={`/jobs/${row.original.id}`} className="block">
          <Badge variant={getStatusVariant(row.original.status)}>
            {t(`jobs.statuses.${row.original.status}`, statusLabels[row.original.status])}
          </Badge>
        </Link>
      ),
    },
    {
      accessorKey: "slug",
      header: t("jobs.fields.slug", "Slug"),
      cell: ({ row }) => (
        <Link href={`/jobs/${row.original.id}`} className="block">
          {row.original.slug || "—"}
        </Link>
      ),
    },
    {
      accessorKey: "notes",
      header: t("common.notes", "Notes"),
      cell: ({ row }) => (
        <Link href={`/jobs/${row.original.id}`} className="block truncate max-w-[24rem]">
          {row.original.notes || "—"}
        </Link>
      ),
    },
  ];
}

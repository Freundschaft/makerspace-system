import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

const directionLabels: Record<string, string> = {
  INCOMING: "Incoming",
  OUTGOING: "Outgoing",
};

const statusLabels: Record<string, string> = {
  PLANNED: "Planned",
  RECEIVED: "Received",
  DISTRIBUTED: "Distributed",
  CANCELLED: "Cancelled",
};

export type InKindDonationRow = {
  id: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PLANNED" | "RECEIVED" | "DISTRIBUTED" | "CANCELLED";
  date: string;
  item: string;
  quantity: number | null;
  unit: string | null;
  contactName: string | null;
  location: string | null;
  estimatedValue: number | null;
  notes: string | null;
};

function getStatusVariant(status: InKindDonationRow["status"]) {
  switch (status) {
    case "CANCELLED":
      return "secondary";
    case "RECEIVED":
    case "DISTRIBUTED":
      return "default";
    default:
      return "outline";
  }
}

function formatQuantity(row: InKindDonationRow) {
  if (row.quantity === null) {
    return "—";
  }

  const quantity = Number.isInteger(row.quantity) ? row.quantity.toString() : row.quantity.toFixed(2);
  return row.unit ? `${quantity} ${row.unit}` : quantity;
}

export function getColumns(t: Translator): ColumnDef<InKindDonationRow>[] {
  return [
    {
      accessorKey: "date",
      header: t("inKindDonations.fields.date", "Date"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          {format(new Date(row.original.date), "PPP")}
        </Link>
      ),
    },
    {
      accessorKey: "direction",
      header: t("inKindDonations.fields.direction", "Direction"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          <Badge variant={row.original.direction === "INCOMING" ? "default" : "secondary"}>
            {t(
              `inKindDonations.directions.${row.original.direction}`,
              directionLabels[row.original.direction]
            )}
          </Badge>
        </Link>
      ),
    },
    {
      accessorKey: "item",
      header: t("inKindDonations.fields.item", "Item"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block font-medium">
          {row.original.item}
        </Link>
      ),
    },
    {
      accessorKey: "quantity",
      header: t("inKindDonations.fields.quantity", "Quantity"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          {formatQuantity(row.original)}
        </Link>
      ),
    },
    {
      accessorKey: "contactName",
      header: t("inKindDonations.fields.contactName", "Donor / Recipient"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          {row.original.contactName || "—"}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: t("common.status", "Status"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          <Badge variant={getStatusVariant(row.original.status)}>
            {t(`inKindDonations.statuses.${row.original.status}`, statusLabels[row.original.status])}
          </Badge>
        </Link>
      ),
    },
    {
      accessorKey: "estimatedValue",
      header: t("inKindDonations.fields.estimatedValue", "Estimated Value"),
      cell: ({ row }) => (
        <Link href={`/in-kind-donations/${row.original.id}`} className="block">
          {row.original.estimatedValue === null ? "—" : `€${row.original.estimatedValue.toFixed(2)}`}
        </Link>
      ),
    },
  ];
}

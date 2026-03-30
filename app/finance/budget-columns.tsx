import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

export type BudgetRow = {
  id: string;
  name: string;
  allocatedAmount: any;
  spentAmount: number;
  remainingAmount: number;
  periodLabel: string | null;
  createdAt: Date;
};

export function getBudgetColumns(t: Translator): ColumnDef<BudgetRow>[] {
  return [
    {
      accessorKey: "name",
      header: t("finance.budgets.fields.name", "Budget"),
    },
    {
      accessorKey: "periodLabel",
      header: t("finance.budgets.fields.periodLabel", "Period"),
      cell: ({ row }) => row.original.periodLabel || "—",
    },
    {
      accessorKey: "allocatedAmount",
      header: t("finance.budgets.fields.allocatedAmount", "Allocated (€)"),
      cell: ({ row }) => `€${Number(row.original.allocatedAmount).toFixed(2)}`,
    },
    {
      accessorKey: "spentAmount",
      header: t("finance.budgets.fields.spentAmount", "Spent (€)"),
      cell: ({ row }) => `€${row.original.spentAmount.toFixed(2)}`,
    },
    {
      accessorKey: "remainingAmount",
      header: t("finance.budgets.fields.remainingAmount", "Remaining (€)"),
      cell: ({ row }) => `€${row.original.remainingAmount.toFixed(2)}`,
    },
    {
      accessorKey: "createdAt",
      header: t("finance.budgets.fields.createdAt", "Created"),
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      id: "actions",
      header: t("common.actions", "Actions"),
      cell: ({ row }) => (
        <Link href={`/finance/budgets/${row.original.id}/edit`} className="text-primary underline">
          {t("common.edit", "Edit")}
        </Link>
      ),
    },
  ];
}

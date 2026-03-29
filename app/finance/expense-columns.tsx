import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

export type ExpenseRow = {
  id: string;
  date: Date;
  title: string;
  vendor: string | null;
  amount: any;
  budget: { name: string } | null;
  createdBy: { email: string | null } | null;
  carpentryProject: { id: string } | null;
  houseProject: { id: string } | null;
};

export function getExpenseColumns(t: Translator): ColumnDef<ExpenseRow>[] {
  return [
    {
      accessorKey: "date",
      header: t("finance.expenses.fields.date", "Date"),
      cell: ({ row }) => format(new Date(row.original.date), "PPP"),
    },
    {
      accessorKey: "title",
      header: t("finance.expenses.fields.title", "Expense"),
    },
    {
      accessorKey: "vendor",
      header: t("finance.expenses.fields.vendor", "Vendor"),
      cell: ({ row }) => row.original.vendor || "—",
    },
    {
      accessorKey: "budget",
      header: t("finance.expenses.fields.budget", "Budget"),
      cell: ({ row }) => row.original.budget?.name || "—",
    },
    {
      id: "source",
      header: t("finance.expenses.fields.source", "Source"),
      cell: ({ row }) => {
        if (row.original.carpentryProject) {
          return t("finance.expenses.source.carpentryProject", "Carpentry Project");
        }
        if (row.original.houseProject) {
          return t("finance.expenses.source.houseProject", "House Project");
        }
        return "—";
      },
    },
    {
      accessorKey: "amount",
      header: t("finance.expenses.fields.amount", "Amount (€)"),
      cell: ({ row }) => `€${Number(row.original.amount).toFixed(2)}`,
    },
    {
      accessorKey: "createdBy",
      header: t("finance.expenses.fields.createdBy", "Logged By"),
      cell: ({ row }) => row.original.createdBy?.email || "—",
    },
    {
      id: "actions",
      header: t("common.actions", "Actions"),
      cell: ({ row }) => (
        <Link href={`/finance/expenses/${row.original.id}/edit`} className="text-primary underline">
          {t("common.edit", "Edit")}
        </Link>
      ),
    },
  ];
}

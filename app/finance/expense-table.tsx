"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getExpenseColumns, type ExpenseRow } from "./expense-columns";

export function ExpenseTable({ data }: { data: ExpenseRow[] }) {
  const { t } = useI18n();
  return <DataTable columns={getExpenseColumns(t)} data={data} />;
}

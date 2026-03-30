"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getBudgetColumns, type BudgetRow } from "./budget-columns";

export function BudgetTable({ data }: { data: BudgetRow[] }) {
  const { t } = useI18n();
  return <DataTable columns={getBudgetColumns(t)} data={data} showPagination={false} />;
}

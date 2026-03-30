"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type Repair } from "./columns";

interface RepairsTableProps {
  data: Repair[];
}

export function RepairsTable({ data }: RepairsTableProps) {
  const { t } = useI18n();
  const columns = getColumns(t);

  return <DataTable columns={columns} data={data} showPagination={false} />;
}


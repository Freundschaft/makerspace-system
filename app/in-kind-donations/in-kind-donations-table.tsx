"use client";

import { useI18n } from "@/app/components/I18nProvider";
import { DataTable } from "@/components/ui/data-table";
import { getColumns, type InKindDonationRow } from "./columns";

interface InKindDonationsTableProps {
  data: InKindDonationRow[];
}

export function InKindDonationsTable({ data }: InKindDonationsTableProps) {
  const { t } = useI18n();
  const columns = getColumns(t);

  return <DataTable columns={columns} data={data} />;
}

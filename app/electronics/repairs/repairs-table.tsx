"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { type Locale } from "@/lib/i18n/config";
import { getColumns, type ElectronicsRepair } from "./columns";
import { useMemo } from "react";

interface RepairsTableProps {
  data: ElectronicsRepair[];
  locale: Locale;
}

export function RepairsTable({ data, locale }: RepairsTableProps) {
  const { t } = useI18n();
  const columns = useMemo(() => getColumns(t, locale), [locale, t]);

  return <DataTable columns={columns} data={data} showPagination={false} />;
}

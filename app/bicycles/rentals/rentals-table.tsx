"use client";

import { RentalsDataTable } from "@/components/ui/rentals-data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { type Locale } from "@/lib/i18n/config";
import { getColumns, type Rental } from "./columns";
import { useMemo } from "react";

interface RentalsTableProps {
  data: Rental[];
  locale: Locale;
}

export function RentalsTable({ data, locale }: RentalsTableProps) {
  const { t } = useI18n();
  const columns = useMemo(() => getColumns(t, locale), [locale, t]);

  return <RentalsDataTable columns={columns} data={data} />;
}

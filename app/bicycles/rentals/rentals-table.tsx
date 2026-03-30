"use client";

import { RentalsDataTable } from "@/components/ui/rentals-data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type Rental } from "./columns";

interface RentalsTableProps {
  data: Rental[];
}

export function RentalsTable({ data }: RentalsTableProps) {
  const { t } = useI18n();
  const columns = getColumns(t);

  return <RentalsDataTable columns={columns} data={data} />;
}


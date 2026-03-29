"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type HouseProject } from "./columns";

interface ProjectsTableProps {
  data: HouseProject[];
}

export function ProjectsTable({ data }: ProjectsTableProps) {
  const { t } = useI18n();
  const columns = getColumns(t);

  return <DataTable columns={columns} data={data} />;
}

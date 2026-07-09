import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

import { WhatsAppLink } from "@/components/WhatsAppLink";
import { localizePathname, type Locale } from "@/lib/i18n/config";
import { RepairStatusSelect } from "./repair-status-select";

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string;

export type Repair = {
  id: string;
  problemTypes: string;
  description: string | null;
  repairDetails: string | null;
  receivedDate: Date;
  repairedDate: Date | null;
  pickupDate: Date | null;
  ownerName: string;
  ownerIdCardNumber: string | null;
  ownerPhone: string | null;
  status: "PENDING" | "IN_PROGRESS" | "WAITING_FOR_PARTS" | "COMPLETED" | "PICKED_UP" | "CANCELLED";
  photoPath: string | null;
  partsUsed: {
    part: {
      name: string;
    };
    quantity: number;
  }[];
};

interface RepairSelectionConfig {
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
  visibleIds: string[];
}

interface RepairColumnOptions {
  locale: Locale;
  selection?: RepairSelectionConfig;
  onStatusUpdated?: (repairId: string, status: Repair["status"]) => void;
}

export function getColumns(
  t: Translator,
  { locale, selection, onStatusUpdated }: RepairColumnOptions
): ColumnDef<Repair>[] {
  const selectionColumn: ColumnDef<Repair>[] = selection
    ? [
        {
          id: "select",
          header: () => {
            const allSelected =
              selection.visibleIds.length > 0 &&
              selection.visibleIds.every((id) => selection.selectedIds.includes(id));
            const someSelected = selection.visibleIds.some((id) =>
              selection.selectedIds.includes(id)
            );

            return (
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    selection.onSelectedIdsChange(
                      Array.from(new Set([...selection.selectedIds, ...selection.visibleIds]))
                    );
                    return;
                  }

                  selection.onSelectedIdsChange(
                    selection.selectedIds.filter((id) => !selection.visibleIds.includes(id))
                  );
                }}
                aria-label={t("common.selectAll", "Select all")}
              />
            );
          },
          cell: ({ row }) => (
            <Checkbox
              checked={selection.selectedIds.includes(row.original.id)}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  selection.onSelectedIdsChange(
                    Array.from(new Set([...selection.selectedIds, row.original.id]))
                  );
                  return;
                }

                selection.onSelectedIdsChange(
                  selection.selectedIds.filter((id) => id !== row.original.id)
                );
              }}
              aria-label={t("common.selectRow", "Select row")}
            />
          ),
        },
      ]
    : [];

  return [
    ...selectionColumn,
    {
      accessorKey: "photoPath",
      header: t("common.photo", "Photo"),
      cell: ({ row }) => {
        const photoPath = row.getValue("photoPath") as string | null;
        const href = localizePathname(`/bicycles/repairs/${row.original.id}`, locale);

        return (
          <Link href={href} className="block">
            {photoPath ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${photoPath}`}
                  alt={t("modules.repairs.title", "Bicycle Repairs")}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : null}
          </Link>
        );
      },
    },
    {
      accessorKey: "problemTypes",
      header: t("repairs.details.problemTypes", "Problem Types"),
      cell: ({ row }) => {
        const types = JSON.parse(row.getValue("problemTypes") as string) as string[];
        const href = localizePathname(`/bicycles/repairs/${row.original.id}`, locale);

        return (
          <Link href={href} className="block">
            <div className="flex flex-wrap gap-1">
              {types.map((type) => (
                <Badge key={type} variant="outline">
                  {t(`bicycles.problemTypes.${type}`, type)}
                </Badge>
              ))}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "ownerName",
      header: t("repairs.form.ownerName", "Owner Name"),
      cell: ({ row }) => {
        const href = localizePathname(`/bicycles/repairs/${row.original.id}`, locale);
        return <Link href={href} className="block">{row.getValue("ownerName")}</Link>;
      },
    },
    {
      accessorKey: "ownerPhone",
      header: t("repairs.form.ownerPhone", "Owner Phone"),
      cell: ({ row }) => {
        const ownerPhone = row.getValue("ownerPhone") as string | null;
        const href = localizePathname(`/bicycles/repairs/${row.original.id}`, locale);

        return (
          <WhatsAppLink
            value={ownerPhone}
            fallbackHref={href}
            className="block"
            fallbackClassName="block"
          />
        );
      },
    },
    {
      accessorKey: "receivedDate",
      header: t("repairs.details.receivedDate", "Received Date"),
      cell: ({ row }) => {
        const date = row.getValue("receivedDate") as Date;
        const href = localizePathname(`/bicycles/repairs/${row.original.id}`, locale);
        return <Link href={href} className="block">{format(date, "PPP")}</Link>;
      },
    },
    {
      accessorKey: "status",
      header: t("common.status", "Status"),
      cell: ({ row }) => (
        <RepairStatusSelect
          repairId={row.original.id}
          value={row.getValue("status") as Repair["status"]}
          labels={{
            PENDING: t("common.statuses.PENDING", "Pending"),
            IN_PROGRESS: t("common.statuses.IN_PROGRESS", "In Progress"),
            WAITING_FOR_PARTS: t("common.statuses.WAITING_FOR_PARTS", "Waiting for Parts"),
            COMPLETED: t("common.statuses.COMPLETED", "Completed"),
            PICKED_UP: t("common.statuses.PICKED_UP", "Picked Up"),
            CANCELLED: t("common.statuses.CANCELLED", "Cancelled"),
          }}
          onUpdated={(status) => onStatusUpdated?.(row.original.id, status)}
        />
      ),
    },
  ];
}

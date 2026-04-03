"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { type Locale } from "@/lib/i18n/config";
import { getColumns, type ElectronicsRepair } from "./columns";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElectronicsRepairStatus } from "@/generated/prisma";

interface RepairsTableProps {
  data: ElectronicsRepair[];
  locale: Locale;
}

export function RepairsTable({ data, locale }: RepairsTableProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [repairs, setRepairs] = useState(data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ElectronicsRepairStatus>("UNCHECKED");
  const [isUpdating, setIsUpdating] = useState(false);
  const columns = useMemo(
    () =>
      getColumns(t, locale, {
        selectedIds,
        onSelectedIdsChange: setSelectedIds,
        visibleIds: repairs.map((repair) => repair.id),
      }),
    [locale, repairs, selectedIds, t]
  );

  useEffect(() => {
    setRepairs(data);
    setSelectedIds([]);
  }, [data]);

  const handleBulkUpdate = async () => {
    if (!selectedIds.length || isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);
      const response = await fetch("/api/electronics/repairs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
          status: bulkStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update electronics repairs");
      }

      setRepairs((current) =>
        current.map((repair) =>
          selectedIds.includes(repair.id)
            ? {
                ...repair,
                status: bulkStatus,
              }
            : repair
        )
      );
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Error updating electronics repairs:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {selectedIds.length ? (
          <>
            <Select
              value={bulkStatus}
              onValueChange={(value) => setBulkStatus(value as ElectronicsRepairStatus)}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder={t("common.status", "Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNCHECKED">{t("common.statuses.UNCHECKED", "Unchecked")}</SelectItem>
                <SelectItem value="CHECKED">{t("common.statuses.CHECKED", "Checked")}</SelectItem>
                <SelectItem value="IN_PROGRESS">{t("common.statuses.IN_PROGRESS", "In Progress")}</SelectItem>
                <SelectItem value="READY_FOR_PICKUP">{t("common.statuses.READY_FOR_PICKUP", "Ready for Pickup")}</SelectItem>
                <SelectItem value="DONE">{t("common.statuses.DONE", "Done")}</SelectItem>
                <SelectItem value="PICKED_UP">{t("common.statuses.PICKED_UP", "Picked Up")}</SelectItem>
                <SelectItem value="NO_WAY_TO_FIX">{t("common.statuses.NO_WAY_TO_FIX", "No Way to Fix")}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => void handleBulkUpdate()} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.updating", "Updating...")}
                </>
              ) : (
                t("common.apply", "Apply")
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t("team.bulk.selectedCount", "{count} selected", {
                count: selectedIds.length,
              })}
            </span>
          </>
        ) : null}
      </div>
      <DataTable columns={columns} data={repairs} showPagination={false} />
    </div>
  );
}

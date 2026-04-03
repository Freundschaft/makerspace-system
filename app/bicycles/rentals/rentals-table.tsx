"use client";

import { RentalsDataTable } from "@/components/ui/rentals-data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { type Locale } from "@/lib/i18n/config";
import { getColumns, type Rental } from "./columns";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { RentalStatus } from "@/generated/prisma";

interface RentalsTableProps {
  data: Rental[];
  locale: Locale;
}

export function RentalsTable({ data, locale }: RentalsTableProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [rentals, setRentals] = useState(data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<RentalStatus>("ACTIVE");
  const [isUpdating, setIsUpdating] = useState(false);
  const columns = useMemo(
    () =>
      getColumns(t, locale, {
        selectedIds,
        onSelectedIdsChange: setSelectedIds,
        visibleIds: rentals.map((rental) => rental.id),
      }),
    [locale, rentals, selectedIds, t]
  );

  useEffect(() => {
    setRentals(data);
    setSelectedIds([]);
  }, [data]);

  const handleBulkUpdate = async () => {
    if (!selectedIds.length || isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);
      const response = await fetch("/api/bicycles/rentals", {
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
        throw new Error("Failed to update rentals");
      }

      setRentals((current) =>
        current.map((rental) =>
          selectedIds.includes(rental.id)
            ? {
                ...rental,
                status: bulkStatus,
                actualReturnDate:
                  bulkStatus === "RETURNED" ? new Date() : null,
              }
            : rental
        )
      );
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Error updating rentals:", error);
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
              onValueChange={(value) => setBulkStatus(value as RentalStatus)}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder={t("common.status", "Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">{t("rentals.statuses.ACTIVE", "ACTIVE")}</SelectItem>
                <SelectItem value="RETURNED">{t("rentals.statuses.RETURNED", "RETURNED")}</SelectItem>
                <SelectItem value="OVERDUE">{t("rentals.statuses.OVERDUE", "OVERDUE")}</SelectItem>
                <SelectItem value="CANCELLED">{t("rentals.statuses.CANCELLED", "CANCELLED")}</SelectItem>
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
      <RentalsDataTable columns={columns} data={rentals} />
    </div>
  );
}

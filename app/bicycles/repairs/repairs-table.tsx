"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type Repair } from "./columns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { WhatsAppLink } from "@/components/WhatsAppLink";
import { localizePathname, type Locale } from "@/lib/i18n/config";
import { RepairStatusSelect } from "./repair-status-select";

function formatDisplayText(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

interface RepairsTableProps {
  data: Repair[];
  locale: Locale;
}

type RepairStatusFilter = Repair["status"] | "ALL";

export function RepairsTable({ data, locale }: RepairsTableProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [repairs, setRepairs] = useState(data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<Repair["status"]>("PENDING");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RepairStatusFilter>("ALL");

  const filteredData =
    statusFilter === "ALL"
      ? repairs
      : repairs.filter((repair) => repair.status === statusFilter);

  const updateRepairStatus = (repairId: string, status: Repair["status"]) => {
    setRepairs((current) =>
      current.map((repair) => {
        if (repair.id !== repairId) {
          return repair;
        }

        const now = new Date();
        return {
          ...repair,
          status,
          repairedDate:
            status === "COMPLETED"
              ? now
              : repair.repairedDate,
          pickupDate:
            status === "PICKED_UP"
              ? now
              : repair.pickupDate,
        };
      })
    );
  };

  const columns = useMemo(
    () =>
      getColumns(t, {
        locale,
        selection: {
          selectedIds,
          onSelectedIdsChange: setSelectedIds,
          visibleIds: filteredData.map((repair) => repair.id),
        },
        onStatusUpdated: updateRepairStatus,
      }),
    [filteredData, locale, selectedIds, t]
  );

  const statusFilters: RepairStatusFilter[] = [
    "ALL",
    "PENDING",
    "IN_PROGRESS",
    "WAITING_FOR_PARTS",
    "COMPLETED",
    "PICKED_UP",
    "CANCELLED",
  ];

  useEffect(() => {
    setRepairs(data);
    setSelectedIds([]);
  }, [data]);

  const handleBulkUpdate = async () => {
    if (!selectedIds.length || isUpdating || isDeleting) {
      return;
    }

    try {
      setIsUpdating(true);
      const response = await fetch("/api/bicycles/repairs", {
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
        throw new Error("Failed to update repairs");
      }

      selectedIds.forEach((id) => updateRepairStatus(id, bulkStatus));
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Error updating repairs:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length || isDeleting || isUpdating) {
      return;
    }

    if (!window.confirm(t("common.confirmDeleteSelected", "Delete the selected items?"))) {
      return;
    }

    const deletingAllVisible =
      filteredData.length > 0 &&
      filteredData.every((repair) => selectedIds.includes(repair.id));

    if (
      deletingAllVisible &&
      !window.confirm(
        t(
          "repairs.list.confirmDeletePageSelection",
          "This will delete all repairs currently shown on this page. Continue?"
        )
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch("/api/bicycles/repairs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete repairs");
      }

      setRepairs((current) => current.filter((repair) => !selectedIds.includes(repair.id)));
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Error deleting repairs:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {statusFilters.map((filterValue) => (
          <Button
            key={filterValue}
            variant={statusFilter === filterValue ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(filterValue)}
          >
            {filterValue === "ALL"
              ? t("common.all", "All")
              : t(`common.statuses.${filterValue}`, formatDisplayText(filterValue))}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {selectedIds.length ? (
          <>
            <Select
              value={bulkStatus}
              onValueChange={(value) => setBulkStatus(value as Repair["status"])}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder={t("common.status", "Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">{t("common.statuses.PENDING", "Pending")}</SelectItem>
                <SelectItem value="IN_PROGRESS">{t("common.statuses.IN_PROGRESS", "In Progress")}</SelectItem>
                <SelectItem value="WAITING_FOR_PARTS">{t("common.statuses.WAITING_FOR_PARTS", "Waiting for Parts")}</SelectItem>
                <SelectItem value="COMPLETED">{t("common.statuses.COMPLETED", "Completed")}</SelectItem>
                <SelectItem value="PICKED_UP">{t("common.statuses.PICKED_UP", "Picked Up")}</SelectItem>
                <SelectItem value="CANCELLED">{t("common.statuses.CANCELLED", "Cancelled")}</SelectItem>
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
            <Button variant="destructive" onClick={() => void handleBulkDelete()} disabled={isDeleting || isUpdating}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.deleting", "Deleting...")}
                </>
              ) : (
                t("common.delete", "Delete")
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

      <div className="grid gap-3 lg:hidden">
        {filteredData.length ? (
          filteredData.map((repair) => {
            const href = localizePathname(`/bicycles/repairs/${repair.id}`, locale);
            const problemTypes = JSON.parse(repair.problemTypes) as string[];
            const visibleProblemTypes = problemTypes.slice(0, 3);
            const extraProblemTypes = problemTypes.length - visibleProblemTypes.length;
            const partsSummary = repair.partsUsed
              .map((part) => `${part.part.name} (${part.quantity})`)
              .join(", ");

            return (
              <Link key={repair.id} href={href} className="block">
                <Card className="gap-0 rounded-2xl border-border/70 bg-card/90 py-0 shadow-sm transition-colors hover:bg-accent/10">
                  <div className="flex items-stretch gap-3 p-3">
                    <div
                      className="pt-1"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      <Checkbox
                        checked={selectedIds.includes(repair.id)}
                        onCheckedChange={(checked) => {
                          if (checked === true) {
                            setSelectedIds((current) => Array.from(new Set([...current, repair.id])));
                            return;
                          }

                          setSelectedIds((current) => current.filter((id) => id !== repair.id));
                        }}
                        aria-label={t("common.selectRow", "Select row")}
                      />
                    </div>
                    {repair.photoPath ? (
                      <div className="relative min-h-20 w-30 shrink-0 self-stretch overflow-hidden rounded-xl bg-muted/50">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${repair.photoPath}`}
                          alt={t("common.photo", "Photo")}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-20 w-30 shrink-0 self-stretch items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {t("common.photo", "Photo")}
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                        >
                          <RepairStatusSelect
                            repairId={repair.id}
                            value={repair.status}
                            labels={{
                              PENDING: t("common.statuses.PENDING", "Pending"),
                              IN_PROGRESS: t("common.statuses.IN_PROGRESS", "In Progress"),
                              WAITING_FOR_PARTS: t("common.statuses.WAITING_FOR_PARTS", "Waiting for Parts"),
                              COMPLETED: t("common.statuses.COMPLETED", "Completed"),
                              PICKED_UP: t("common.statuses.PICKED_UP", "Picked Up"),
                              CANCELLED: t("common.statuses.CANCELLED", "Cancelled"),
                            }}
                            onUpdated={(status) => updateRepairStatus(repair.id, status)}
                          />
                        </div>
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {format(repair.receivedDate, "MMM d")}
                        </span>
                      </div>

                      {repair.description ? (
                        <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                          {repair.description}
                        </p>
                      ) : null}

                      {repair.repairDetails ? (
                        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {repair.repairDetails}
                        </p>
                      ) : null}

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{repair.ownerName}</span>
                        {repair.ownerPhone ? (
                          <WhatsAppLink
                            value={repair.ownerPhone}
                            fallback={repair.ownerPhone}
                            onClick={(event) => event.stopPropagation()}
                            className="rounded-full bg-muted px-2 py-1 font-medium text-foreground underline-offset-4 hover:underline"
                            fallbackClassName="rounded-full bg-muted px-2 py-1 font-medium text-foreground"
                          />
                        ) : null}
                        {partsSummary ? (
                          <span className="truncate">
                            {t("repairs.details.partsUsed", "Parts Used")}: {partsSummary}
                          </span>
                        ) : null}
                      </div>

                      {visibleProblemTypes.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {visibleProblemTypes.map((type) => (
                            <span
                              key={type}
                              className="rounded-full border border-border/70 px-2 py-0.5 text-[10px]"
                            >
                              {t(`bicycles.problemTypes.${type}`, type)}
                            </span>
                          ))}
                          {extraProblemTypes > 0 ? (
                            <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px]">
                              +{extraProblemTypes}
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="text-[11px] text-muted-foreground">
                        {t("repairs.form.ownerIdCardNumber", "ID Card Number")}: {repair.ownerIdCardNumber || "—"}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })
        ) : (
          <div className="py-8 text-center">{t("tables.noResults", "No results.")}</div>
        )}
      </div>

      <div className="hidden lg:block">
        <DataTable columns={columns} data={filteredData} showPagination={false} />
      </div>
    </div>
  );
}

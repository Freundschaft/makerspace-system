"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type Repair } from "./columns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function formatDisplayText(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusVariant(status: Repair["status"]) {
  if (status === "COMPLETED" || status === "IN_PROGRESS") {
    return "default";
  }

  if (status === "WAITING_FOR_PARTS" || status === "PICKED_UP") {
    return "secondary";
  }

  if (status === "CANCELLED") {
    return "destructive";
  }

  return "outline";
}

interface RepairsTableProps {
  data: Repair[];
}

type RepairStatusFilter = Repair["status"] | "ALL";

export function RepairsTable({ data }: RepairsTableProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [repairs, setRepairs] = useState(data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<Repair["status"]>("PENDING");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RepairStatusFilter>("ALL");
  const filteredData =
    statusFilter === "ALL"
      ? repairs
      : repairs.filter((repair) => repair.status === statusFilter);
  const columns = useMemo(
    () =>
      getColumns(t, {
        selectedIds,
        onSelectedIdsChange: setSelectedIds,
        visibleIds: filteredData.map((repair) => repair.id),
      }),
    [filteredData, selectedIds, t]
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
    if (!selectedIds.length || isUpdating) {
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

      setRepairs((current) =>
        current.map((repair) => {
          if (!selectedIds.includes(repair.id)) {
            return repair;
          }

          const now = new Date();
          return {
            ...repair,
            status: bulkStatus,
            repairedDate: bulkStatus === "COMPLETED" ? now : repair.repairedDate,
            pickupDate: bulkStatus === "PICKED_UP" ? now : repair.pickupDate,
          };
        })
      );
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.error("Error updating repairs:", error);
    } finally {
      setIsUpdating(false);
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
            const problemTypes = JSON.parse(repair.problemTypes) as string[];
            const visibleProblemTypes = problemTypes.slice(0, 3);
            const extraProblemTypes = problemTypes.length - visibleProblemTypes.length;
            const partsSummary = repair.partsUsed
              .map((part) => `${part.part.name} (${part.quantity})`)
              .join(", ");

            return (
              <Link key={repair.id} href={`/bicycles/repairs/${repair.id}`} className="block">
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
                            setSelectedIds((current) =>
                              Array.from(new Set([...current, repair.id]))
                            );
                            return;
                          }

                          setSelectedIds((current) =>
                            current.filter((id) => id !== repair.id)
                          );
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
                        <Badge
                          variant={getStatusVariant(repair.status)}
                          className="rounded-full px-2.5 py-0.5 text-[10px] tracking-[0.12em]"
                        >
                          {formatDisplayText(repair.status)}
                        </Badge>
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {format(repair.receivedDate, "MMM d")}
                        </span>
                      </div>

                      {repair.description ? (
                        <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                          {repair.description}
                        </p>
                      ) : null}

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {repair.ownerName}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 font-medium text-foreground">
                          {repair.ownerPhone}
                        </span>
                        {partsSummary ? (
                          <span className="truncate">
                            {t("repairs.details.partsUsed", "Parts Used")}: {partsSummary}
                          </span>
                        ) : null}
                      </div>

                      {visibleProblemTypes.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {visibleProblemTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="rounded-full border-border/70 px-2 py-0.5 text-[10px]"
                            >
                              {t(`bicycles.problemTypes.${type}`, type)}
                            </Badge>
                          ))}
                          {extraProblemTypes > 0 ? (
                            <Badge
                              variant="outline"
                              className="rounded-full border-border/70 px-2 py-0.5 text-[10px]"
                            >
                              +{extraProblemTypes}
                            </Badge>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="text-[11px] text-muted-foreground">
                        {t("repairs.form.ownerIdCardNumber", "ID Card Number")}: {repair.ownerIdCardNumber}
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

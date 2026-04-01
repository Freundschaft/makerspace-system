"use client";

import { DataTable } from "@/components/ui/data-table";
import { useI18n } from "@/app/components/I18nProvider";
import { getColumns, type Repair } from "./columns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

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

export function RepairsTable({ data }: RepairsTableProps) {
  const { t } = useI18n();
  const columns = getColumns(t);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:hidden">
        {data.length ? (
          data.map((repair) => {
            const problemTypes = JSON.parse(repair.problemTypes) as string[];
            const visibleProblemTypes = problemTypes.slice(0, 3);
            const extraProblemTypes = problemTypes.length - visibleProblemTypes.length;
            const partsSummary = repair.partsUsed
              .map((part) => `${part.part.name} (${part.quantity})`)
              .join(", ");

            return (
              <Link key={repair.id} href={`/bicycles/repairs/${repair.id}`} className="block">
                <Card className="gap-0 rounded-2xl border-border/70 bg-card/90 py-0 shadow-sm transition-colors hover:bg-accent/10">
                  <div className="flex gap-3 p-3">
                    {repair.photoPath ? (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted/50">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || "https://files.system.makerspace-lesvos.org"}${repair.photoPath}`}
                          alt={t("common.photo", "Photo")}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/30 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
        <DataTable columns={columns} data={data} showPagination={false} />
      </div>
    </div>
  );
}

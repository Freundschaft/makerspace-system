"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/app/components/I18nProvider";
import { localizePathname, type Locale } from "@/lib/i18n/config";

type ElectronicsStatusFilter =
  | "ALL"
  | "UNCHECKED"
  | "CHECKED"
  | "IN_PROGRESS"
  | "READY_FOR_PICKUP"
  | "DONE"
  | "PICKED_UP"
  | "NO_WAY_TO_FIX";

interface RepairsPageFiltersProps {
  locale: Locale;
  statusFilter: ElectronicsStatusFilter;
  searchQuery: string;
}

const electronicsStatuses: Exclude<ElectronicsStatusFilter, "ALL">[] = [
  "UNCHECKED",
  "CHECKED",
  "IN_PROGRESS",
  "READY_FOR_PICKUP",
  "DONE",
  "PICKED_UP",
  "NO_WAY_TO_FIX",
];

export function RepairsPageFilters({
  locale,
  statusFilter,
  searchQuery,
}: RepairsPageFiltersProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [isPending, startTransition] = useTransition();
  const [draftQuery, setDraftQuery] = useState(searchQuery);
  const basePath = localizePathname("/electronics/repairs", locale);

  const statusOptions = useMemo(
    () => [
      { value: "ALL" as const, label: t("common.all", "All") },
      ...electronicsStatuses.map((value) => ({
        value,
        label: t(`common.statuses.${value}`, value),
      })),
    ],
    [t]
  );

  const navigate = (nextStatus: ElectronicsStatusFilter, nextQuery: string) => {
    const params = new URLSearchParams();
    const trimmedQuery = nextQuery.trim();

    if (nextStatus !== "ALL") {
      params.set("status", nextStatus);
    }

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }

    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${basePath}?${query}` : basePath);
    });
  };

  return (
    <div className="mb-6 flex flex-col gap-3">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(statusFilter, draftQuery);
        }}
      >
        <Input
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
          placeholder={t(
            "electronics.new.placeholders.customerName",
            "Enter customer name"
          )}
          className="sm:max-w-sm"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="outline" disabled={isPending}>
            {t("common.apply", "Apply")}
          </Button>
          {(searchQuery || statusFilter !== "ALL") && (
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => {
                setDraftQuery("");
                navigate("ALL", "");
              }}
            >
              {t("common.reset", "Reset")}
            </Button>
          )}
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={statusFilter === option.value ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            onClick={() => navigate(option.value, draftQuery)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

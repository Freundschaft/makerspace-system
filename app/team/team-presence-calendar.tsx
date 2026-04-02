"use client";

import { useMemo, useState } from "react";
import { TeamMemberWithRole, TeamPresenceEntry } from "./team-types";
import { eachDayOfInterval, endOfMonth, format, isWithinInterval, min, max, parseISO, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/app/components/I18nProvider";
import { cn } from "@/lib/utils";

interface TeamPresenceCalendarProps {
  teamMembers: TeamMemberWithRole[];
  presenceEntries: TeamPresenceEntry[];
  month: string;
  onTogglePresence: (teamMemberId: string, dates: string[], present: boolean) => void;
}

type RangeAnchor = {
  teamMemberId: string;
  date: string;
  present: boolean;
} | null;

type HoveredRangeCell = {
  teamMemberId: string;
  date: string;
} | null;

function getDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function TeamPresenceCalendar({
  teamMembers,
  presenceEntries,
  month,
  onTogglePresence,
}: TeamPresenceCalendarProps) {
  const { t } = useI18n();
  const [rangeAnchor, setRangeAnchor] = useState<RangeAnchor>(null);
  const [hoveredCell, setHoveredCell] = useState<HoveredRangeCell>(null);
  const monthDate = new Date(`${month}-01T00:00:00`);
  const days = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(monthDate), end: endOfMonth(monthDate) }),
    [month]
  );
  const presenceKeys = useMemo(
    () =>
      new Set(
        presenceEntries.map((entry) => `${entry.teamMemberId}:${entry.date.slice(0, 10)}`)
      ),
    [presenceEntries]
  );
  const handleCellClick = (teamMemberId: string, date: string, present: boolean) => {
    if (!rangeAnchor || rangeAnchor.teamMemberId !== teamMemberId) {
      setRangeAnchor({ teamMemberId, date, present });
      setHoveredCell(null);
      onTogglePresence(teamMemberId, [date], present);
      return;
    }

    const anchorDate = parseISO(`${rangeAnchor.date}T00:00:00`);
    const targetDate = parseISO(`${date}T00:00:00`);
    const interval = {
      start: min([anchorDate, targetDate]),
      end: max([anchorDate, targetDate]),
    };
    const rangeDates = days
      .filter((day) => isWithinInterval(day, interval))
      .map((day) => getDateKey(day));

    onTogglePresence(teamMemberId, rangeDates, rangeAnchor.present);
    setRangeAnchor(null);
    setHoveredCell(null);
  };

  const getPreviewKeys = () => {
    if (
      !rangeAnchor ||
      !hoveredCell ||
      hoveredCell.teamMemberId !== rangeAnchor.teamMemberId
    ) {
      return new Set<string>();
    }

    const anchorDate = parseISO(`${rangeAnchor.date}T00:00:00`);
    const targetDate = parseISO(`${hoveredCell.date}T00:00:00`);
    const interval = {
      start: min([anchorDate, targetDate]),
      end: max([anchorDate, targetDate]),
    };

    return new Set(
      days
        .filter((day) => isWithinInterval(day, interval))
        .map((day) => `${rangeAnchor.teamMemberId}:${getDateKey(day)}`)
    );
  };
  const previewKeys = getPreviewKeys();

  if (teamMembers.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        {t("team.presence.empty", "No team members on this page.")}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="grid w-full gap-px rounded-md border bg-border"
        style={{ gridTemplateColumns: `fit-content(12rem) repeat(${days.length}, minmax(0, 1fr))` }}
      >
        <div className="sticky left-0 z-10 flex items-center bg-background px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm">
          {t("team.table.name", "Name")}
        </div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="flex min-w-0 flex-col items-center justify-center bg-background px-0.5 py-1.5 text-center sm:px-1 sm:py-2"
          >
            <div className="text-[9px] uppercase leading-none text-muted-foreground sm:text-[10px]">
              {format(day, "EEEEE")}
            </div>
            <div className="text-xs font-medium leading-none sm:text-sm">{format(day, "d")}</div>
          </div>
        ))}

        {teamMembers.map((member) => (
          <FragmentRow
            key={member.id}
            member={member}
            days={days}
            presenceKeys={presenceKeys}
            onTogglePresence={handleCellClick}
            rangeAnchor={rangeAnchor}
            previewKeys={previewKeys}
            onHoverCell={setHoveredCell}
          />
        ))}
      </div>
    </div>
  );
}

function FragmentRow({
  member,
  days,
  presenceKeys,
  onTogglePresence,
  rangeAnchor,
  previewKeys,
  onHoverCell,
}: {
  member: TeamMemberWithRole;
  days: Date[];
  presenceKeys: Set<string>;
  onTogglePresence: (teamMemberId: string, date: string, present: boolean) => void;
  rangeAnchor: RangeAnchor;
  previewKeys: Set<string>;
  onHoverCell: (cell: HoveredRangeCell) => void;
}) {
  return (
    <>
      <div className="sticky left-0 z-10 flex items-center bg-background px-2 py-2 text-xs sm:px-3 sm:text-sm">
        <div className="min-w-0 max-w-[12rem]">
          <div className="truncate font-medium">
            {member.givenNames} {member.familyName}
          </div>
          <div className="truncate text-[10px] text-muted-foreground sm:text-xs">{member.department}</div>
        </div>
      </div>
      {days.map((day) => {
        const dateKey = getDateKey(day);
        const isPresent = presenceKeys.has(`${member.id}:${dateKey}`);
        const isAnchor =
          rangeAnchor?.teamMemberId === member.id && rangeAnchor.date === dateKey;
        const isPreview = previewKeys.has(`${member.id}:${dateKey}`);

        return (
          <div key={`${member.id}-${dateKey}`} className="flex bg-background p-0.5 sm:p-1">
            <Button
              type="button"
              variant={isPresent ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-full min-h-7 w-full min-w-0 self-stretch px-0 text-[11px] sm:min-h-9",
                !isPresent && "text-muted-foreground",
                isPreview &&
                  "border-primary bg-primary/20 text-foreground shadow-[inset_0_0_0_2px_hsl(var(--primary))]",
                isAnchor && "ring-2 ring-primary ring-offset-1"
              )}
              onClick={() => onTogglePresence(member.id, dateKey, !isPresent)}
              onMouseEnter={() => onHoverCell({ teamMemberId: member.id, date: dateKey })}
              onFocus={() => onHoverCell({ teamMemberId: member.id, date: dateKey })}
              onMouseLeave={() => onHoverCell(null)}
            >
              {isPresent ? "✓" : "—"}
            </Button>
          </div>
        );
      })}
    </>
  );
}

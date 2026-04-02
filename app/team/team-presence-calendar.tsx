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
    <div className="overflow-x-auto">
      <div
        className="grid min-w-max gap-px rounded-md border bg-border"
        style={{ gridTemplateColumns: `max-content repeat(${days.length}, minmax(2.5rem, 1fr))` }}
      >
        <div className="sticky left-0 z-10 flex items-center whitespace-nowrap bg-background px-3 py-2 text-sm font-medium">
          {t("team.table.name", "Name")}
        </div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="flex flex-col items-center justify-center bg-background px-1 py-2 text-center"
          >
            <div className="text-[10px] uppercase text-muted-foreground">
              {format(day, "EEE")}
            </div>
            <div className="text-sm font-medium">{format(day, "d")}</div>
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
      <div className="sticky left-0 z-10 flex items-center whitespace-nowrap bg-background px-3 py-2 text-sm">
        <div>
          <div className="font-medium">
            {member.givenNames} {member.familyName}
          </div>
          <div className="text-xs text-muted-foreground">{member.department}</div>
        </div>
      </div>
      {days.map((day) => {
        const dateKey = getDateKey(day);
        const isPresent = presenceKeys.has(`${member.id}:${dateKey}`);
        const isAnchor =
          rangeAnchor?.teamMemberId === member.id && rangeAnchor.date === dateKey;
        const isPreview = previewKeys.has(`${member.id}:${dateKey}`);

        return (
          <div key={`${member.id}-${dateKey}`} className="bg-background p-1">
            <Button
              type="button"
              variant={isPresent ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-9 w-full px-0",
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

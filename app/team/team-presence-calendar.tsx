"use client";

import { useEffect, useMemo, useState } from "react";
import { TeamMemberWithRole, TeamPresenceEntry } from "./team-types";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isWithinInterval,
  min,
  max,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/app/components/I18nProvider";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const TOUCH_WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(
    teamMembers[0]?.id ?? null
  );
  const [touchRangeAnchor, setTouchRangeAnchor] = useState<string | null>(null);
  const [touchSelectedDates, setTouchSelectedDates] = useState<string[]>([]);
  const monthDate = new Date(`${month}-01T00:00:00`);
  const days = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(monthDate), end: endOfMonth(monthDate) }),
    [month]
  );
  const touchCalendarDays = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 }),
      }),
    [monthDate]
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

  useEffect(() => {
    if (!teamMembers.length) {
      setSelectedMemberId(null);
      return;
    }

    if (!selectedMemberId || !teamMembers.some((member) => member.id === selectedMemberId)) {
      setSelectedMemberId(teamMembers[0].id);
    }
  }, [selectedMemberId, teamMembers]);

  const selectedMember =
    teamMembers.find((member) => member.id === selectedMemberId) ?? teamMembers[0] ?? null;
  const selectedMemberPresenceDates = selectedMember
    ? presenceEntries
        .filter((entry) => entry.teamMemberId === selectedMember.id)
        .map((entry) => parseISO(entry.date))
    : [];
  const selectedMemberPresenceKeys = new Set(
    selectedMemberPresenceDates.map((date) => getDateKey(date))
  );

  const handleTouchDatePress = (date: Date) => {
    const dateKey = getDateKey(date);

    if (!touchRangeAnchor) {
      setTouchRangeAnchor(dateKey);
      setTouchSelectedDates([dateKey]);
      return;
    }

    const anchorDate = parseISO(`${touchRangeAnchor}T00:00:00`);
    const targetDate = parseISO(`${dateKey}T00:00:00`);
    const rangeDates = eachDayOfInterval({
      start: min([anchorDate, targetDate]),
      end: max([anchorDate, targetDate]),
    }).map((day) => getDateKey(day));

    setTouchSelectedDates(rangeDates);
  };

  const applySelectedRange = (present: boolean) => {
    if (!selectedMember || touchSelectedDates.length === 0) {
      return;
    }

    onTogglePresence(
      selectedMember.id,
      touchSelectedDates,
      present
    );
    setTouchRangeAnchor(null);
    setTouchSelectedDates([]);
  };

  if (teamMembers.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        {t("team.presence.empty", "No team members on this page.")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 xl:hidden">
        <div className="space-y-2">
          <div className="text-sm font-medium">
            {t("team.presence.member", "Team member")}
          </div>
          <Select
            value={selectedMember?.id}
            onValueChange={(value) => {
              setSelectedMemberId(value);
              setTouchRangeAnchor(null);
              setTouchSelectedDates([]);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("team.presence.selectMember", "Select team member")} />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.givenNames} {member.familyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedMember ? (
            <div className="text-sm text-muted-foreground">
              {selectedMember.department}
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border p-2 sm:p-4">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="grid grid-cols-7 gap-1">
              {TOUCH_WEEKDAY_LABELS.map((label) => (
                <div
                  key={label}
                  className="flex h-8 items-center justify-center text-[11px] font-medium text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {touchCalendarDays.map((day) => {
                const dateKey = getDateKey(day);
                const inCurrentMonth = isSameMonth(day, monthDate);
                const isPresent = selectedMemberPresenceKeys.has(dateKey);
                const isSelected = touchSelectedDates.includes(dateKey);
                const isAnchor = touchRangeAnchor === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    disabled={!inCurrentMonth}
                    onClick={() => handleTouchDatePress(day)}
                    className={cn(
                      "aspect-square min-w-0 rounded-md border text-sm font-medium transition-colors",
                      inCurrentMonth
                        ? "border-border bg-background text-foreground active:bg-accent"
                        : "border-transparent bg-transparent text-transparent",
                      isPresent && "bg-primary/15",
                      isSelected && "border-primary bg-primary/20 text-foreground",
                      isAnchor && "ring-2 ring-primary ring-offset-1"
                    )}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {touchSelectedDates.length > 0
            ? t("team.presence.selectionCount", "{count} day(s) selected", {
                count: touchSelectedDates.length,
              })
            : t(
                "team.presence.selectionHelp",
                "Tap a start day, then an end day, then use the action buttons below."
              )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            disabled={!selectedMember || touchSelectedDates.length === 0}
            onClick={() => applySelectedRange(true)}
            className="w-full"
          >
            {t("team.presence.markPresent", "Mark Present")}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!selectedMember || touchSelectedDates.length === 0}
            onClick={() => applySelectedRange(false)}
            className="w-full"
          >
            {t("team.presence.clearSelected", "Clear Selected")}
          </Button>
        </div>
      </div>

      <div className="hidden xl:block">
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

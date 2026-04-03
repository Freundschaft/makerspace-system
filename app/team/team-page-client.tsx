"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMemberStatus, UserRole } from "@/generated/prisma";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { TeamMemberWithRole, TeamPresenceEntry } from "./team-types";
import { localizePathname, type Locale } from "@/lib/i18n/config";
import { addMonths, format } from "date-fns";
import { TeamPresenceCalendar } from "./team-presence-calendar";
import { PageJump } from "@/components/ui/page-jump";

interface TeamPageClientProps {
  initialTeamMembers: TeamMemberWithRole[];
  initialPresenceEntries: TeamPresenceEntry[];
  currentUserEmail: string | null;
  locale: Locale;
  currentPage: number;
  totalPages: number;
  totalMembers: number;
  statusFilter: StatusFilter;
  month: string;
}

type StatusFilter = "ACTIVE" | "INACTIVE" | "ALL";
type TeamView = "members" | "presence";

export function TeamPageClient({
  initialTeamMembers,
  initialPresenceEntries,
  currentUserEmail,
  locale,
  currentPage,
  totalPages,
  totalMembers,
  statusFilter,
  month,
}: TeamPageClientProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [presenceEntries, setPresenceEntries] = useState(initialPresenceEntries);
  const [syncing, setSyncing] = useState(false);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState<TeamMemberStatus | null>(
    null
  );
  const [activeView, setActiveView] = useState<TeamView>("members");
  const basePath = localizePathname("/team", locale);
  const monthDate = new Date(`${month}-01T00:00:00`);
  const monthLabel = format(monthDate, "MMMM yyyy");
  const currentMonthKey = format(new Date(), "yyyy-MM");

  useEffect(() => {
    setTeamMembers(initialTeamMembers);
    setSelectedIds([]);
  }, [initialTeamMembers]);

  useEffect(() => {
    setPresenceEntries(initialPresenceEntries);
  }, [initialPresenceEntries]);

  const getListingHref = (
    nextStatus: StatusFilter = statusFilter,
    nextPage: number = currentPage,
    nextMonth: string = month
  ) => {
    const params = new URLSearchParams();
    if (nextStatus !== "ACTIVE") {
      params.set("status", nextStatus);
    }
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    if (nextMonth !== currentMonthKey) {
      params.set("month", nextMonth);
    }

    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const navigateToListing = (
    nextStatus: StatusFilter,
    nextPage: number,
    nextMonth: string = month
  ) => {
    router.push(getListingHref(nextStatus, nextPage, nextMonth));
  };

  const handleMonthChange = (offset: number) => {
    const nextMonth = addMonths(monthDate, offset);
    navigateToListing(
      statusFilter,
      1,
      `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`
    );
  };

  const handleEdit = (member: TeamMemberWithRole) => {
    const returnTo = getListingHref();
    router.push(
      `${localizePathname(`/team/${member.id}/edit`, locale)}?returnTo=${encodeURIComponent(returnTo)}`
    );
  };

  const handleDelete = async (member: TeamMemberWithRole) => {
    if (!window.confirm(t("team.confirmDelete", "Are you sure you want to delete this team member?"))) {
      return;
    }

    try {
      const response = await fetch(`/api/team/${member.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(t("team.errors.deleteFailed", "Failed to delete team member"));
      }
      setTeamMembers((prev) => prev.filter((m) => m.id !== member.id));
      setSelectedIds((prev) => prev.filter((id) => id !== member.id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleSelectedIdsChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleBulkStatusUpdate = async (nextStatus: TeamMemberStatus) => {
    if (selectedIds.length === 0) {
      return;
    }

    setUpdatingStatus(nextStatus);

    try {
      const response = await fetch("/api/team", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedIds,
          status: nextStatus,
        }),
      });

      const result = (await response.json()) as
        | { teamMembers?: Array<{ id: string; status: TeamMemberStatus }>; error?: string }
        | undefined;

      if (!response.ok || !result?.teamMembers) {
        throw new Error(
          result?.error ??
            t("team.errors.statusUpdateFailed", "Failed to update team status")
        );
      }

      const statusById = new Map(
        result.teamMembers.map((member) => [member.id, member.status])
      );

      setTeamMembers((prev) =>
        prev.map((member) =>
          statusById.has(member.id)
            ? { ...member, status: statusById.get(member.id)! }
            : member
        )
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Error updating team status:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : t("team.errors.statusUpdateFailed", "Failed to update team status")
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleRoleChange = async (
    member: TeamMemberWithRole,
    nextRole: UserRole
  ) => {
    setUpdatingRoleId(member.id);

    try {
      const response = await fetch(`/api/team/${member.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: nextRole }),
      });

      const result = (await response.json()) as
        | { role?: UserRole; error?: string }
        | undefined;

      if (!response.ok || !result?.role) {
        throw new Error(
          result?.error ??
            t("team.errors.roleUpdateFailed", "Failed to update team role")
        );
      }

      setTeamMembers((prev) =>
        prev.map((item) =>
          item.id === member.id
            ? { ...item, userRole: result.role ?? item.userRole }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating team role:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : t("team.errors.roleUpdateFailed", "Failed to update team role")
      );
    } finally {
      setUpdatingRoleId(null);
    }
  };

  const handlePresenceToggle = async (
    teamMemberId: string,
    dates: string[],
    present: boolean
  ) => {
    try {
      const response = await fetch("/api/team/presence", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamMemberId,
          dates,
          present,
        }),
      });

      const result = (await response.json()) as
        | { presences?: TeamPresenceEntry[]; error?: string }
        | undefined;

      if (!response.ok) {
        throw new Error(
          result?.error ??
            t("team.presence.errors.updateFailed", "Failed to update team presence")
        );
      }

      setPresenceEntries((prev) => {
        const dateKeys = new Set(dates.map((date) => `${teamMemberId}:${date}`));
        const next = prev.filter(
          (entry) => !dateKeys.has(`${entry.teamMemberId}:${entry.date.slice(0, 10)}`)
        );
        if (present && result?.presences?.length) {
          next.push(...result.presences);
        }
        return next;
      });
    } catch (error) {
      console.error("Error updating team presence:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : t("team.presence.errors.updateFailed", "Failed to update team presence")
      );
    }
  };

  const renderStatusFilters = () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={statusFilter === "ACTIVE" ? "default" : "outline"}
        size="sm"
        onClick={() => navigateToListing("ACTIVE", 1)}
      >
        {t("common.active", "Active")}
      </Button>
      <Button
        variant={statusFilter === "INACTIVE" ? "default" : "outline"}
        size="sm"
        onClick={() => navigateToListing("INACTIVE", 1)}
      >
        {t("common.inactive", "Inactive")}
      </Button>
      <Button
        variant={statusFilter === "ALL" ? "default" : "outline"}
        size="sm"
        onClick={() => navigateToListing("ALL", 1)}
      >
        {t("common.all", "All")}
      </Button>
    </div>
  );

  const handleSync = async () => {
    setSyncing(true);

    try {
      const response = await fetch("/api/team/sync", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(
          t("team.errors.syncFailed", "Failed to sync with Google Workspace")
        );
      }

          window.alert(
        t("team.sync.success", "Successfully synced with Google Workspace")
      );
      router.refresh();
    } catch (error) {
      console.error("Error syncing team members:", error);
      window.alert(
        t("team.errors.syncFailed", "Failed to sync with Google Workspace")
      );
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{t("team.list.title", "Team Members")}</h1>
          <div className="inline-flex rounded-lg border bg-muted/30 p-1">
            <Button
              variant={activeView === "members" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("members")}
            >
              {t("team.tabs.members", "Members")}
            </Button>
            <Button
              variant={activeView === "presence" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("presence")}
            >
              {t("team.tabs.presence", "Presence")}
            </Button>
          </div>
        </div>
        {activeView === "members" ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => void handleSync()}
              disabled={syncing}
            >
              {syncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("team.sync.inProgress", "Syncing...")}
                </>
              ) : (
                t("team.sync.action", "Sync with Google Workspace")
              )}
            </Button>
            <button
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push(localizePathname("/team/new", locale))}
            >
              {t("team.list.add", "Add Team Member")}
            </button>
          </div>
        ) : null}
      </div>
      {activeView === "members" ? (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {renderStatusFilters()}
            {selectedIds.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={updatingStatus !== null}
                  onClick={() => void handleBulkStatusUpdate("ACTIVE")}
                >
                  {updatingStatus === "ACTIVE" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("team.bulk.updating", "Updating...")}
                    </>
                  ) : (
                    t("team.bulk.markActive", "Mark Active")
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={updatingStatus !== null}
                  onClick={() => void handleBulkStatusUpdate("INACTIVE")}
                >
                  {updatingStatus === "INACTIVE" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("team.bulk.updating", "Updating...")}
                    </>
                  ) : (
                    t("team.bulk.markInactive", "Mark Inactive")
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t("team.bulk.selectedCount", "{count} selected", {
                    count: selectedIds.length,
                  })}
                </span>
              </>
            )}
          </div>
          <TeamMemberDataTable
            data={teamMembers}
            currentUserEmail={currentUserEmail}
            selectedIds={selectedIds}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
            onSelectedIdsChange={handleSelectedIdsChange}
            updatingRoleId={updatingRoleId}
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {totalMembers} {t("team.list.title", "Team Members")}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => navigateToListing(statusFilter, currentPage - 1)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t("tables.previous", "Previous")}
              </Button>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{t("tables.pagination.page", "Page")}</span>
                <PageJump
                  basePath={basePath}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  preservedParams={{
                    status: statusFilter !== "ACTIVE" ? statusFilter : undefined,
                    month: month !== currentMonthKey ? month : undefined,
                  }}
                  inputLabel={t("tables.pagination.page", "Page")}
                />
                <span>
                  {t("tables.pagination.of", "of")} {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => navigateToListing(statusFilter, currentPage + 1)}
              >
                {t("tables.next", "Next")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">
                {t("team.presence.title", "Presence Calendar")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t(
                  "team.presence.description",
                  "Track which team members are present in the makerspace each day."
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleMonthChange(-1)}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t("common.previousMonth", "Previous month")}
              </Button>
              <div className="min-w-32 text-center text-sm font-medium">{monthLabel}</div>
              <Button variant="outline" size="sm" onClick={() => handleMonthChange(1)}>
                {t("common.nextMonth", "Next month")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          {renderStatusFilters()}
          <TeamPresenceCalendar
            teamMembers={teamMembers}
            presenceEntries={presenceEntries}
            month={month}
            onTogglePresence={handlePresenceToggle}
          />
        </div>
      )}
    </div>
  );
}

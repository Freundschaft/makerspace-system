"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMemberStatus, UserRole } from "@/generated/prisma";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { TeamMemberWithRole } from "./team-types";
import { localizePathname, type Locale } from "@/lib/i18n/config";

interface TeamPageClientProps {
  initialTeamMembers: TeamMemberWithRole[];
  currentUserEmail: string | null;
  locale: Locale;
  currentPage: number;
  totalPages: number;
  totalMembers: number;
  statusFilter: StatusFilter;
}

type StatusFilter = "ACTIVE" | "INACTIVE" | "ALL";

export function TeamPageClient({
  initialTeamMembers,
  currentUserEmail,
  locale,
  currentPage,
  totalPages,
  totalMembers,
  statusFilter,
}: TeamPageClientProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [syncing, setSyncing] = useState(false);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState<TeamMemberStatus | null>(
    null
  );
  const basePath = localizePathname("/team", locale);

  const navigateToListing = (nextStatus: StatusFilter, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextStatus !== "ALL") {
      params.set("status", nextStatus);
    }
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  const handleEdit = (member: TeamMemberWithRole) => {
    router.push(localizePathname(`/team/${member.id}/edit`, locale));
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("team.list.title", "Team Members")}</h1>
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
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
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
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {t("tables.pagination.page", "Page")} {currentPage} {t("tables.pagination.of", "of")} {totalPages} ({totalMembers} {t("team.list.title", "Team Members")})
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => navigateToListing(statusFilter, currentPage - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            {t("tables.previous", "Previous")}
          </Button>
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
    </div>
  );
}

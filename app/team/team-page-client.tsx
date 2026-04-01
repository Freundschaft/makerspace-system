"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMemberStatus, UserRole } from "@/generated/prisma";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TeamMemberWithRole } from "./team-types";

interface TeamPageClientProps {
  initialTeamMembers: TeamMemberWithRole[];
  currentUserEmail: string | null;
}

type StatusFilter = "ACTIVE" | "INACTIVE" | "ALL";

export function TeamPageClient({
  initialTeamMembers,
  currentUserEmail,
}: TeamPageClientProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ACTIVE");
  const [syncing, setSyncing] = useState(false);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState<TeamMemberStatus | null>(
    null
  );

  const filteredTeamMembers = teamMembers.filter((member) => {
    if (statusFilter === "ALL") {
      return true;
    }

    return member.status === statusFilter;
  });

  const handleEdit = (member: TeamMemberWithRole) => {
    router.push(`/team/${member.id}/edit`);
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
          item.id === member.id ? { ...item, userRole: result.role } : item
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
            onClick={() => router.push("/team/new")}
          >
            {t("team.list.add", "Add Team Member")}
          </button>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button
          variant={statusFilter === "ACTIVE" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("ACTIVE")}
        >
          {t("common.active", "Active")}
        </Button>
        <Button
          variant={statusFilter === "INACTIVE" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("INACTIVE")}
        >
          {t("common.inactive", "Inactive")}
        </Button>
        <Button
          variant={statusFilter === "ALL" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("ALL")}
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
        data={filteredTeamMembers}
        currentUserEmail={currentUserEmail}
        selectedIds={selectedIds}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
        onSelectedIdsChange={handleSelectedIdsChange}
        updatingRoleId={updatingRoleId}
      />
    </div>
  );
}

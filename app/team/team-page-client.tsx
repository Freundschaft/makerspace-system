"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/generated/prisma";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { useI18n } from "@/app/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TeamPageClientProps {
  initialTeamMembers: TeamMember[];
}

type StatusFilter = "ACTIVE" | "INACTIVE" | "ALL";

export function TeamPageClient({ initialTeamMembers }: TeamPageClientProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ACTIVE");
  const [syncing, setSyncing] = useState(false);

  const filteredTeamMembers = teamMembers.filter((member) => {
    if (statusFilter === "ALL") {
      return true;
    }

    return member.status === statusFilter;
  });

  const handleEdit = (member: TeamMember) => {
    router.push(`/team/${member.id}/edit`);
  };

  const handleDelete = async (member: TeamMember) => {
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
    } catch (error) {
      console.error("Error deleting team member:", error);
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
      </div>
      <TeamMemberDataTable
        data={filteredTeamMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/generated/prisma";
import { TeamMemberDataTable } from "../components/team/TeamMemberDataTable";
import { useI18n } from "@/app/components/I18nProvider";

interface TeamPageClientProps {
  initialTeamMembers: TeamMember[];
}

export function TeamPageClient({ initialTeamMembers }: TeamPageClientProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("team.list.title", "Team Members")}</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          onClick={() => router.push("/team/new")}
        >
          {t("team.list.add", "Add Team Member")}
        </button>
      </div>
      <TeamMemberDataTable
        data={teamMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

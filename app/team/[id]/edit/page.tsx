import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamMemberForm } from "../../team-member-form";
import { getServerI18n } from "@/lib/i18n/server";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { t } = await getServerI18n();
  const { id } = await params;

  const teamMember = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!teamMember) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("team.edit.title", "Edit Team Member")}</h1>
        <TeamMemberForm mode="edit" initialData={teamMember} />
      </div>
    </div>
  );
}

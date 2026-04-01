import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamMemberForm } from "../../team-member-form";
import { getServerI18n } from "@/lib/i18n/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { UserRole } from "@/generated/prisma";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

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

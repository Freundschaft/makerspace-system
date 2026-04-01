import { TeamMemberForm } from "../team-member-form";
import { getServerI18n } from "@/lib/i18n/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { UserRole } from "@/generated/prisma";

export default async function NewTeamMemberPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  const { t } = await getServerI18n();

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("team.new.title", "Add New Team Member")}</h1>
        <TeamMemberForm mode="create" />
      </div>
    </div>
  );
} 

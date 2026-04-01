import { prisma } from "@/lib/prisma";
import { TeamPageClient } from "./team-page-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/generated/prisma";
import { authOptions } from "@/lib/auth-options";

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: [{ familyName: "asc" }, { givenNames: "asc" }],
  });
  const users = await prisma.user.findMany({
    where: {
      email: {
        in: teamMembers.map((member) => member.email),
      },
    },
    select: {
      email: true,
      role: true,
    },
  });

  const roleByEmail = new Map(users.map((user) => [user.email, user.role]));
  const teamMembersWithRoles = teamMembers.map((member) => ({
    ...member,
    userRole: roleByEmail.get(member.email) ?? null,
  }));

  return (
    <TeamPageClient
      initialTeamMembers={teamMembersWithRoles}
      currentUserEmail={session.user?.email ?? null}
    />
  );
}

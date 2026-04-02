import { prisma } from "@/lib/prisma";
import { TeamPageClient } from "./team-page-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TeamMemberStatus, UserRole } from "@/generated/prisma";
import { authOptions } from "@/lib/auth-options";
import { getServerI18n } from "@/lib/i18n/server";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
}

const PAGE_SIZE = 25;

export default async function TeamPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  const { locale } = await getServerI18n();
  const params = await searchParams;
  const requestedPage = Number(params.page ?? "1");
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const statusFilter =
    params.status === TeamMemberStatus.ACTIVE ||
    params.status === TeamMemberStatus.INACTIVE
      ? params.status
      : "ALL";

  const where =
    statusFilter === "ALL"
      ? undefined
      : {
          status: statusFilter,
        };

  const [totalMembers, teamMembers] = await Promise.all([
    prisma.teamMember.count({ where }),
    prisma.teamMember.findMany({
      where,
      orderBy: [{ familyName: "asc" }, { givenNames: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalMembers / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
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
      locale={locale}
      currentPage={currentPage}
      totalPages={totalPages}
      totalMembers={totalMembers}
      statusFilter={statusFilter}
    />
  );
}

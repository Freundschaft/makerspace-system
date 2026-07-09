import { prisma } from "@/lib/prisma";
import { TeamPageClient } from "./team-page-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TeamMemberStatus, UserRole } from "@/generated/prisma";
import { authOptions } from "@/lib/auth-options";
import { getServerI18n } from "@/lib/i18n/server";
import { endOfMonth, startOfMonth } from "date-fns";
import type { Prisma } from "@/generated/prisma";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    month?: string;
    q?: string;
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
  const searchQuery = typeof params.q === "string" ? params.q.trim() : "";
  const parsedMonth =
    typeof params.month === "string" && /^\d{4}-\d{2}$/.test(params.month)
      ? new Date(`${params.month}-01T00:00:00`)
      : new Date();
  const month = Number.isNaN(parsedMonth.getTime()) ? new Date() : parsedMonth;
  const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
  const statusFilter =
    params.status === TeamMemberStatus.ACTIVE ||
    params.status === TeamMemberStatus.INACTIVE ||
    params.status === "ALL"
      ? params.status
      : TeamMemberStatus.ACTIVE;

  const filters: Prisma.TeamMemberWhereInput[] = [];

  if (statusFilter !== "ALL") {
    filters.push({ status: statusFilter });
  }

  if (searchQuery) {
    filters.push({
      OR: [
        { familyName: { contains: searchQuery } },
        { givenNames: { contains: searchQuery } },
        { department: { contains: searchQuery } },
        { email: { contains: searchQuery } },
        { secondaryEmail: { contains: searchQuery } },
        { phone: { contains: searchQuery } },
        { cardNumber: { contains: searchQuery } },
      ],
    });
  }

  const where: Prisma.TeamMemberWhereInput | undefined =
    filters.length > 0 ? { AND: filters } : undefined;

  const totalMembers = await prisma.teamMember.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalMembers / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const teamMembers = await prisma.teamMember.findMany({
    where,
    orderBy: [{ familyName: "asc" }, { givenNames: "asc" }],
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
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
  const presenceEntries = await prisma.teamMemberPresence.findMany({
    where: {
      teamMemberId: {
        in: teamMembers.map((member) => member.id),
      },
      date: {
        gte: startOfMonth(month),
        lte: endOfMonth(month),
      },
    },
    select: {
      id: true,
      teamMemberId: true,
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <TeamPageClient
      initialTeamMembers={teamMembersWithRoles}
      initialPresenceEntries={presenceEntries.map((entry) => ({
        ...entry,
        date: entry.date.toISOString(),
      }))}
      currentUserEmail={session.user?.email ?? null}
      locale={locale}
      currentPage={currentPage}
      totalPages={totalPages}
      totalMembers={totalMembers}
      statusFilter={statusFilter}
      month={monthKey}
      searchQuery={searchQuery}
    />
  );
}

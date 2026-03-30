import { prisma } from "@/lib/prisma";
import { TeamPageClient } from "./team-page-client";

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: [{ familyName: "asc" }, { givenNames: "asc" }],
  });

  return <TeamPageClient initialTeamMembers={teamMembers} />;
}

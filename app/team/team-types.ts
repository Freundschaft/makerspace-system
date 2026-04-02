import { TeamMember, UserRole } from "@/generated/prisma";

export interface TeamMemberWithRole extends TeamMember {
  userRole: UserRole | null;
}

export interface TeamPresenceEntry {
  id: string;
  teamMemberId: string;
  date: string;
}

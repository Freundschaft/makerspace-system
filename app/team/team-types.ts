import { TeamMember, UserRole } from "@/generated/prisma";

export interface TeamMemberWithRole extends TeamMember {
  userRole: UserRole | null;
}

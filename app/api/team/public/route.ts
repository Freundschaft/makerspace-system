import { hasAdminSessionOrApiSecret } from "@/lib/api-secret";
import { prisma } from "@/lib/prisma";

import { createPublicTeamGetHandler } from "./handler";

export const GET = createPublicTeamGetHandler({
  authorize: hasAdminSessionOrApiSecret,
  findMany: (args) => prisma.teamMember.findMany(args),
});

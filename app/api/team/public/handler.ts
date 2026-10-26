import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type TeamMemberStatus = "ACTIVE" | "INACTIVE";

export interface PublicTeamProfile {
  id: string;
  givenNames: string;
  familyName: string;
  department: string;
  photoPath: string | null;
  publicBio: string | null;
}

export interface PublicTeamFindManyArgs {
  where?: {
    status?: TeamMemberStatus;
    department?: string;
  };
  select: {
    id: true;
    givenNames: true;
    familyName: true;
    department: true;
    photoPath: true;
    publicBio: true;
  };
  orderBy: Array<{ givenNames: "asc" } | { familyName: "asc" }>;
}

interface PublicTeamHandlerDependencies {
  authorize: (request: NextRequest) => Promise<boolean>;
  findMany: (
    args: PublicTeamFindManyArgs
  ) => Promise<Array<PublicTeamProfile>>;
}

const publicTeamQuerySchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  department: z.string().min(1).optional(),
});

export function createPublicTeamGetHandler({
  authorize,
  findMany,
}: PublicTeamHandlerDependencies) {
  return async function GET(request: NextRequest) {
    try {
      if (!(await authorize(request))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const query = publicTeamQuerySchema.safeParse({
        status: request.nextUrl.searchParams.get("status") ?? undefined,
        department:
          request.nextUrl.searchParams.get("department") ?? undefined,
      });

      if (!query.success) {
        return NextResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 }
        );
      }

      const teamMembers = await findMany({
        where:
          query.data.status || query.data.department
            ? {
                ...(query.data.status ? { status: query.data.status } : {}),
                ...(query.data.department
                  ? { department: query.data.department }
                  : {}),
              }
            : undefined,
        select: {
          id: true,
          givenNames: true,
          familyName: true,
          department: true,
          photoPath: true,
          publicBio: true,
        },
        orderBy: [{ givenNames: "asc" }, { familyName: "asc" }],
      });

      return NextResponse.json(
        teamMembers.map((teamMember) => ({
          id: teamMember.id,
          givenNames: teamMember.givenNames,
          familyName: teamMember.familyName,
          department: teamMember.department,
          photoPath: teamMember.photoPath,
          publicBio: teamMember.publicBio,
        }))
      );
    } catch (error) {
      console.error("Error fetching public team profiles:", error);
      return NextResponse.json(
        { error: "Failed to fetch public team profiles" },
        { status: 500 }
      );
    }
  };
}

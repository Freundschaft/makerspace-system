import { NextRequest, NextResponse } from "next/server";

import { GoogleWorkspaceService } from "@/app/services/google-workspace";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isConflictError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === 409
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    const googleWorkspace = await GoogleWorkspaceService.getInstance();
    await googleWorkspace.createUser(teamMember);

    if (!teamMember.googleAccountActive) {
      await googleWorkspace.suspendUser(teamMember.email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating Google Workspace user:", error);

    if (isConflictError(error)) {
      return NextResponse.json(
        { error: "Google Workspace user already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create Google Workspace user" },
      { status: 500 }
    );
  }
}

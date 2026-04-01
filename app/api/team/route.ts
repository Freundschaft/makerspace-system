import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleWorkspaceService } from "@/app/services/google-workspace";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: [{ familyName: "asc" }, { givenNames: "asc" }],
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (
      !body.familyName ||
      !body.givenNames ||
      !body.startDate ||
      !body.department ||
      !body.email ||
      !body.secondaryEmail ||
      !body.phone ||
      !body.dateOfBirth
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        familyName: body.familyName,
        givenNames: body.givenNames,
        nationality: body.nationality || null,
        photoPath: body.photoPath || null,
        status: body.status || "ACTIVE",
        googleAccountActive: body.googleAccountActive ?? true,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        department: body.department,
        email: body.email,
        secondaryEmail: body.secondaryEmail,
        phone: body.phone,
        homeAddress: body.homeAddress || null,
        dateOfBirth: new Date(body.dateOfBirth),
        legalStatus: body.legalStatus || null,
      },
    });

    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance();
      await googleWorkspace.createUser(teamMember);
      if (!teamMember.googleAccountActive) {
        await googleWorkspace.suspendUser(teamMember.email);
      }
    } catch (googleError) {
      console.error("Error creating Google Workspace user:", googleError);
      await prisma.teamMember.delete({
        where: { id: teamMember.id },
      });
      throw googleError;
    }

    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      ids?: unknown;
      status?: unknown;
    };

    if (
      !Array.isArray(body.ids) ||
      body.ids.length === 0 ||
      !body.ids.every((id) => typeof id === "string")
    ) {
      return NextResponse.json(
        { error: "At least one team member must be selected" },
        { status: 400 }
      );
    }

    if (body.status !== "ACTIVE" && body.status !== "INACTIVE") {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    await prisma.teamMember.updateMany({
      where: {
        id: {
          in: body.ids,
        },
      },
      data: {
        status: body.status,
      },
    });

    const updatedMembers = await prisma.teamMember.findMany({
      where: {
        id: {
          in: body.ids,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });

    return NextResponse.json({ teamMembers: updatedMembers });
  } catch (error) {
    console.error("Error updating team members:", error);
    return NextResponse.json(
      { error: "Failed to update team members" },
      { status: 500 }
    );
  }
}

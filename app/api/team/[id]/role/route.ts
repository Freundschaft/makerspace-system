import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function isUserRole(value: unknown): value is UserRole {
  return value === UserRole.ADMIN || value === UserRole.TEAM_MEMBER;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await requireAdmin(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { role?: unknown };

    if (!isUserRole(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: teamMember.email },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    const user = existingUser
      ? existingUser
      : await prisma.user.create({
          data: {
            email: teamMember.email,
            role: body.role,
            enabled: true,
          },
          select: {
            id: true,
            email: true,
            role: true,
          },
        });

    if (user.id === currentUser.id && body.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "You cannot remove your own admin access." },
        { status: 400 }
      );
    }

    if (user.role === UserRole.ADMIN && body.role === UserRole.TEAM_MEMBER) {
      const adminCount = await prisma.user.count({
        where: { role: UserRole.ADMIN },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "At least one admin must remain." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: body.role },
      select: {
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating team role:", error);
    return NextResponse.json(
      { error: "Failed to update team role" },
      { status: 500 }
    );
  }
}

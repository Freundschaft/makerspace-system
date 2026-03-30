import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const project = await prisma.houseProject.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!project) {
      return NextResponse.json({ error: "House project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching house project:", error);
    return NextResponse.json({ error: "Failed to fetch house project" }, { status: 500 });
  }
}

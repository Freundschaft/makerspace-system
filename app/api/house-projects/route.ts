import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.houseProject.findMany({
      include: {
        assignedTo: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching house projects:", error);
    return NextResponse.json({ error: "Failed to fetch house projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.houseName || !body.workType || !body.description || !body.date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.houseProject.create({
      data: {
        date: new Date(body.date),
        houseName: body.houseName,
        location: body.location || null,
        workType: body.workType,
        description: body.description,
        status: body.status || "OPEN",
        timeNeeded: body.timeNeeded ? Number.parseInt(body.timeNeeded, 10) : null,
        materialCosts: body.materialCosts ? body.materialCosts : null,
        notes: body.notes || null,
        photoPath: body.photoPath || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating house project:", error);
    return NextResponse.json({ error: "Failed to create house project" }, { status: 500 });
  }
}

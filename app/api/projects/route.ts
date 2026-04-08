import { NextRequest, NextResponse } from "next/server";

import { hasSessionOrApiSecret } from "@/lib/api-secret";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      include: {
        assignedTo: true,
      },
      orderBy: [
        { startDate: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name: body.name,
        notes: body.notes || null,
        assignee: body.assignee || null,
        status: body.status || "TODO",
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        googlePhotosAlbumLink: body.googlePhotosAlbumLink || null,
        hashtag: body.hashtag || null,
        purpose: body.purpose || null,
      },
      include: {
        assignedTo: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

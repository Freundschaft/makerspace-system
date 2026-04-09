import { NextRequest, NextResponse } from "next/server";

import { hasSessionOrApiSecret } from "@/lib/api-secret";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.job.findMany({
      orderBy: [{ status: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
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

    const job = await prisma.job.create({
      data: {
        name: body.name,
        notes: body.notes || null,
        status: body.status || "OPEN",
        slug: body.slug || null,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

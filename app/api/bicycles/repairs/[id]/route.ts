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
    const repair = await prisma.bicycleRepair.findUnique({
      where: { id },
      include: {
        partsUsed: {
          include: {
            part: true,
          },
        },
      },
    });

    if (!repair) {
      return NextResponse.json({ error: "Repair not found" }, { status: 404 });
    }

    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error fetching bicycle repair:", error);
    return NextResponse.json({ error: "Failed to fetch bicycle repair" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      problemTypes,
      description,
      ownerName,
      ownerIdCardNumber,
      ownerPhone,
      status,
      photoPath,
    } = body;

    const repair = await prisma.bicycleRepair.update({
      where: { id },
      data: {
        problemTypes: JSON.stringify(problemTypes),
        description: description || null,
        ownerName,
        ownerIdCardNumber,
        ownerPhone,
        status,
        photoPath,
      },
    });

    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error updating bicycle repair:", error);
    return NextResponse.json({ error: "Failed to update bicycle repair" }, { status: 500 });
  }
}

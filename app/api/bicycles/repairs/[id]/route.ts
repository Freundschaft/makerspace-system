import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { RepairStatus } from "@/generated/prisma";

const repairStatuses: RepairStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "WAITING_FOR_PARTS",
  "COMPLETED",
  "PICKED_UP",
  "CANCELLED",
];

function normalizeOptionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeSelectedPartIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
    )
  );
}

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
      repairDetails,
      receivedDate,
      ownerName,
      ownerIdCardNumber,
      ownerPhone,
      status,
      photoPath,
      selectedPartIds,
    } = body;
    const normalizedPartIds = normalizeSelectedPartIds(selectedPartIds);
    const hasSelectedPartIds = Array.isArray(selectedPartIds);
    const normalizedStatus =
      typeof status === "string" && repairStatuses.includes(status as RepairStatus)
        ? (status as RepairStatus)
        : undefined;

    const repair = await prisma.bicycleRepair.update({
      where: { id },
      data: {
        problemTypes: Array.isArray(problemTypes) ? JSON.stringify(problemTypes) : undefined,
        description: description !== undefined ? normalizeOptionalString(description) : undefined,
        repairDetails: repairDetails !== undefined ? normalizeOptionalString(repairDetails) : undefined,
        ownerName: typeof ownerName === "string" ? ownerName : undefined,
        ownerIdCardNumber: ownerIdCardNumber !== undefined ? normalizeOptionalString(ownerIdCardNumber) : undefined,
        ownerPhone: ownerPhone !== undefined ? normalizeOptionalString(ownerPhone) : undefined,
        receivedDate: receivedDate ? new Date(receivedDate) : undefined,
        status: normalizedStatus,
        repairedDate: normalizedStatus ? (normalizedStatus === "COMPLETED" ? new Date() : null) : undefined,
        pickupDate: normalizedStatus ? (normalizedStatus === "PICKED_UP" ? new Date() : null) : undefined,
        photoPath: photoPath !== undefined ? normalizeOptionalString(photoPath) : undefined,
        partsUsed: hasSelectedPartIds
          ? {
              deleteMany: {},
              create: normalizedPartIds.map((partId) => ({
                partId,
                quantity: 1,
              })),
            }
          : undefined,
      },
      include: {
        partsUsed: {
          include: {
            part: true,
          },
        },
      },
    });

    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error updating bicycle repair:", error);
    return NextResponse.json({ error: "Failed to update bicycle repair" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.$transaction(async (tx) => {
      await tx.repairPart.deleteMany({
        where: { repairId: id },
      });

      await tx.bicycleRepair.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bicycle repair:", error);
    return NextResponse.json({ error: "Failed to delete bicycle repair" }, { status: 500 });
  }
}

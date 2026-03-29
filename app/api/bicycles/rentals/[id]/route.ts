import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import type { RentalStatus } from "@/generated/prisma";

const rentalStatuses: RentalStatus[] = ["ACTIVE", "RETURNED", "OVERDUE", "CANCELLED"];

function normalizeRentalPayload(body: Record<string, unknown>) {
  const status = typeof body.status === "string" && rentalStatuses.includes(body.status as RentalStatus)
    ? (body.status as RentalStatus)
    : "ACTIVE";
  const actualReturnDate = body.actualReturnDate
    ? new Date(String(body.actualReturnDate))
    : null;

  return {
    renterName: String(body.renterName ?? ""),
    renterPhone: String(body.renterPhone ?? ""),
    renterEmail: body.renterEmail ? String(body.renterEmail) : null,
    bicycleId: String(body.bicycleId ?? ""),
    startDate: new Date(String(body.startDate ?? "")),
    endDate: new Date(String(body.endDate ?? "")),
    status,
    actualReturnDate:
      status === "RETURNED" || actualReturnDate
        ? actualReturnDate
        : null,
    notes: body.notes ? String(body.notes) : null,
    signature: body.signature ? String(body.signature) : null,
  };
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
    const rental = await prisma.bicycleRental.findUnique({
      where: { id },
    });

    if (!rental) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    return NextResponse.json(rental);
  } catch (error) {
    console.error("Error fetching rental:", error);
    return NextResponse.json({ error: "Failed to fetch rental" }, { status: 500 });
  }
}

export async function PUT(
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
    const payload = normalizeRentalPayload(body);

    if (
      !payload.renterName ||
      !payload.renterPhone ||
      !payload.bicycleId ||
      Number.isNaN(payload.startDate.getTime()) ||
      Number.isNaN(payload.endDate.getTime())
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rental = await prisma.bicycleRental.update({
      where: { id },
      data: payload,
    });

    return NextResponse.json(rental);
  } catch (error) {
    console.error("Error updating rental:", error);
    return NextResponse.json({ error: "Failed to update rental" }, { status: 500 });
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

    if (body.action === "return-bike") {
      const returnedAt = body.actualReturnDate
        ? new Date(String(body.actualReturnDate))
        : new Date();

      const rental = await prisma.bicycleRental.update({
        where: { id },
        data: {
          status: "RETURNED",
          actualReturnDate: returnedAt,
        },
      });

      return NextResponse.json(rental);
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating rental workflow:", error);
    return NextResponse.json({ error: "Failed to update rental workflow" }, { status: 500 });
  }
}

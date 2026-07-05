import { NextRequest, NextResponse } from "next/server";

import { hasSessionOrApiSecret } from "@/lib/api-secret";
import { prisma } from "@/lib/prisma";

function decimalOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const donation = await prisma.inKindDonation.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!donation) {
      return NextResponse.json({ error: "In-kind donation not found" }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Error fetching in-kind donation:", error);
    return NextResponse.json({ error: "Failed to fetch in-kind donation" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (!body.item || !body.date || !body.direction) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const donation = await prisma.inKindDonation.update({
      where: { id },
      data: {
        direction: body.direction,
        status: body.status || "PLANNED",
        date: new Date(body.date),
        item: body.item,
        quantity: decimalOrNull(body.quantity),
        unit: body.unit || null,
        contactName: body.contactName || null,
        location: body.location || null,
        estimatedValue: decimalOrNull(body.estimatedValue),
        notes: body.notes || null,
      },
      include: { createdBy: true },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Error updating in-kind donation:", error);
    return NextResponse.json({ error: "Failed to update in-kind donation" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.inKindDonation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting in-kind donation:", error);
    return NextResponse.json({ error: "Failed to delete in-kind donation" }, { status: 500 });
  }
}

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth-options";
import { hasSessionOrApiSecret } from "@/lib/api-secret";
import { prisma } from "@/lib/prisma";

function decimalOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

export async function GET(request: NextRequest) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const donations = await prisma.inKindDonation.findMany({
      include: { createdBy: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error fetching in-kind donations:", error);
    return NextResponse.json({ error: "Failed to fetch in-kind donations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await hasSessionOrApiSecret(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.item || !body.date || !body.direction) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const donation = await prisma.inKindDonation.create({
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
        createdById: session?.user?.id || null,
      },
      include: { createdBy: true },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error("Error creating in-kind donation:", error);
    return NextResponse.json({ error: "Failed to create in-kind donation" }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expenses = await prisma.expense.findMany({
      include: {
        budget: true,
        createdBy: true,
        carpentryProject: true,
        houseProject: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await requireAuth(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.date || !body.title || !body.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        date: new Date(body.date),
        title: body.title,
        vendor: body.vendor || null,
        amount: body.amount,
        budgetId: body.budgetId || null,
        notes: body.notes || null,
        receiptUrl: body.receiptUrl || null,
        createdById: typeof token.sub === "string" ? token.sub : null,
        carpentryProjectId: body.carpentryProjectId || null,
        houseProjectId: body.houseProjectId || null,
      },
      include: {
        budget: true,
        createdBy: true,
        carpentryProject: true,
        houseProject: true,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}

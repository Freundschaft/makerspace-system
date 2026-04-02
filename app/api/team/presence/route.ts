import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { endOfMonth, startOfMonth } from "date-fns";

function toDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const month = request.nextUrl.searchParams.get("month");
    const monthDate =
      month && /^\d{4}-\d{2}$/.test(month)
        ? new Date(`${month}-01T00:00:00Z`)
        : new Date();

    if (Number.isNaN(monthDate.getTime())) {
      return NextResponse.json({ error: "Invalid month" }, { status: 400 });
    }

    const entries = await prisma.teamMemberPresence.findMany({
      where: {
        date: {
          gte: startOfMonth(monthDate),
          lte: endOfMonth(monthDate),
        },
      },
      select: {
        id: true,
        teamMemberId: true,
        date: true,
      },
    });

    return NextResponse.json({
      entries: entries.map((entry) => ({
        ...entry,
        date: entry.date.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching team presence:", error);
    return NextResponse.json({ error: "Failed to fetch team presence" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      teamMemberId?: unknown;
      date?: unknown;
      dates?: unknown;
      present?: unknown;
    };

    if (typeof body.teamMemberId !== "string" || typeof body.present !== "boolean") {
      return NextResponse.json({ error: "Invalid presence payload" }, { status: 400 });
    }

    const dateStrings = Array.isArray(body.dates)
      ? body.dates
      : typeof body.date === "string"
        ? [body.date]
        : [];

    if (
      dateStrings.length === 0 ||
      !dateStrings.every((value) => typeof value === "string")
    ) {
      return NextResponse.json({ error: "Invalid date selection" }, { status: 400 });
    }

    const normalizedDates = dateStrings.map((dateString) =>
      toDay(new Date(`${dateString}T00:00:00Z`))
    );
    if (normalizedDates.some((date) => Number.isNaN(date.getTime()))) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (body.present) {
      await prisma.teamMemberPresence.createMany({
        data: normalizedDates.map((date) => ({
          teamMemberId: body.teamMemberId as string,
          date,
        })),
        skipDuplicates: true,
      });

      const presences = await prisma.teamMemberPresence.findMany({
        where: {
          teamMemberId: body.teamMemberId,
          date: {
            in: normalizedDates,
          },
        },
        select: {
          id: true,
          teamMemberId: true,
          date: true,
        },
      });

      return NextResponse.json({
        presences: presences.map((presence) => ({
          ...presence,
          date: presence.date.toISOString(),
        })),
      });
    }

    await prisma.teamMemberPresence.deleteMany({
      where: {
        teamMemberId: body.teamMemberId,
        date: {
          in: normalizedDates,
        },
      },
    });

    return NextResponse.json({ presences: [] });
  } catch (error) {
    console.error("Error updating team presence:", error);
    return NextResponse.json({ error: "Failed to update team presence" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

import { hasValidApiSecret } from "@/lib/api-secret";
import { getReportCountsByPeriod, parseReportPeriod } from "@/lib/reports";

function parseReportDate(date: string | null, fallback: Date) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return fallback;
  }

  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export async function GET(request: NextRequest) {
  try {
    if (!hasValidApiSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestedPeriod = request.nextUrl.searchParams.get("period");
    const requestedDate = request.nextUrl.searchParams.get("date");
    const period = parseReportPeriod(requestedPeriod);
    const generatedAt = new Date();
    const reportDate = parseReportDate(requestedDate, generatedAt);
    const countsByPeriod = await getReportCountsByPeriod(reportDate);

    if (!requestedPeriod) {
      return NextResponse.json({
        generatedAt: generatedAt.toISOString(),
        reportDate: reportDate.toISOString(),
        periods: countsByPeriod,
      });
    }

    return NextResponse.json({
      period,
      generatedAt: generatedAt.toISOString(),
      reportDate: reportDate.toISOString(),
      counts: countsByPeriod[period],
    });
  } catch (error) {
    console.error("Error fetching report counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch report counts" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

import { hasValidApiSecret } from "@/lib/api-secret";
import { getReportCountsByPeriod, parseReportPeriod } from "@/lib/reports";

export async function GET(request: NextRequest) {
  try {
    if (!hasValidApiSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const period = parseReportPeriod(request.nextUrl.searchParams.get("period"));
    const generatedAt = new Date();
    const periods = await getReportCountsByPeriod(generatedAt);

    return NextResponse.json({
      period,
      generatedAt: generatedAt.toISOString(),
      counts: periods[period],
      periods,
    });
  } catch (error) {
    console.error("Error fetching report counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch report counts" },
      { status: 500 }
    );
  }
}

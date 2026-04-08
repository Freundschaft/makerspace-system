import { NextRequest, NextResponse } from "next/server";

import { hasValidApiSecret } from "@/lib/api-secret";
import { getReportCountsByPeriod, parseReportPeriod } from "@/lib/reports";

export async function GET(request: NextRequest) {
  try {
    if (!hasValidApiSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestedPeriod = request.nextUrl.searchParams.get("period");
    const period = parseReportPeriod(requestedPeriod);
    const generatedAt = new Date();
    const countsByPeriod = await getReportCountsByPeriod(generatedAt);

    if (!requestedPeriod) {
      return NextResponse.json({
        generatedAt: generatedAt.toISOString(),
        periods: countsByPeriod,
      });
    }

    return NextResponse.json({
      period,
      generatedAt: generatedAt.toISOString(),
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

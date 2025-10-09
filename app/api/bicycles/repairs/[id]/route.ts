import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params;
    const repair = await prisma.bicycleRepair.findUnique({
      where: {
          id: id
      },
      include: {
        partsUsed: {
          include: {
            part: true
          }
        }
      }
    })

    if (!repair) {
      return NextResponse.json(
        { error: "Repair not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error fetching repair:", error)
    return NextResponse.json(
      { error: "Failed to fetch repair" },
      { status: 500 }
    )
  }
} 

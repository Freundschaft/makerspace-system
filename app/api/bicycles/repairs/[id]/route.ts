import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
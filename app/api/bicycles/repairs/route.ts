import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { problemType, description, ownerPhone, status, receivedDate } = body

    const repair = await prisma.bicycleRepair.create({
      data: {
        problemType,
        description,
        ownerPhone,
        status,
        receivedDate: new Date(receivedDate),
      },
    })

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error creating repair:", error)
    return NextResponse.json(
      { error: "Failed to create repair" },
      { status: 500 }
    )
  }
} 
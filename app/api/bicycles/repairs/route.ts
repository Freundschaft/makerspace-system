import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { problemTypes, description, ownerPhone, status, receivedDate, photoPath } = body

    const repair = await prisma.bicycleRepair.create({
      data: {
        problemTypes: JSON.stringify(problemTypes),
        description,
        ownerPhone,
        status,
        receivedDate: new Date(receivedDate),
        photoPath,
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
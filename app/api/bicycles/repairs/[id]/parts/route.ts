import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { partId, quantity } = await request.json()

    // Validate input
    if (!partId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    // Check if part exists and has enough quantity
    const part = await prisma.part.findUnique({
      where: { id: partId }
    })

    if (!part) {
      return NextResponse.json(
        { error: "Part not found" },
        { status: 404 }
      )
    }

    if (part.quantity < quantity) {
      return NextResponse.json(
        { error: "Not enough parts in stock" },
        { status: 400 }
      )
    }

    // Add part to repair
    const repairPart = await prisma.repairPart.create({
      data: {
        repairId: params.id,
        partId: partId,
        quantity: quantity
      }
    })

    // Update part quantity
    await prisma.part.update({
      where: { id: partId },
      data: {
        quantity: {
          decrement: quantity
        }
      }
    })

    return NextResponse.json(repairPart)
  } catch (error) {
    console.error("Error adding part to repair:", error)
    return NextResponse.json(
      { error: "Failed to add part to repair" },
      { status: 500 }
    )
  }
} 
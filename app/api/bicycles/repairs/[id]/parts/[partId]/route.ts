import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; partId: string } }
) {
  try {
    // Find the repair part
    const repairPart = await prisma.repairPart.findFirst({
      where: {
        repairId: params.id,
        partId: params.partId
      }
    })

    if (!repairPart) {
      return NextResponse.json(
        { error: "Part not found in repair" },
        { status: 404 }
      )
    }

    // Delete the repair part
    await prisma.repairPart.delete({
      where: {
        id: repairPart.id
      }
    })

    // Update part quantity (add back to inventory)
    await prisma.part.update({
      where: { id: params.partId },
      data: {
        quantity: {
          increment: repairPart.quantity
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing part from repair:", error)
    return NextResponse.json(
      { error: "Failed to remove part from repair" },
      { status: 500 }
    )
  }
} 
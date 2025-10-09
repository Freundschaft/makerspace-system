import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repair = await prisma.electronicsRepair.findUnique({
      where: {
        id: id
      },
      include: {
        repairer: true
      }
    })

    if (!repair) {
      return NextResponse.json(
        { error: "Electronics repair not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error fetching electronics repair:", error)
    return NextResponse.json(
      { error: "Failed to fetch electronics repair" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const {
      customerName,
      category,
      item,
      whatsapp,
      serialNumber,
      status,
      repairable,
      notes,
      photoPath,
      createdDate,
      repairerId
    } = body

    const repair = await prisma.electronicsRepair.update({
      where: { id },
      data: {
        customerName,
        category,
        item,
        whatsapp,
        serialNumber,
        status,
        repairable,
        notes,
        photoPath,
        createdDate: createdDate ? new Date(createdDate) : undefined,
        repairerId
      },
      include: {
        repairer: true
      }
    })

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error updating electronics repair:", error)
    return NextResponse.json(
      { error: "Failed to update electronics repair" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.electronicsRepair.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting electronics repair:", error)
    return NextResponse.json(
      { error: "Failed to delete electronics repair" },
      { status: 500 }
    )
  }
}

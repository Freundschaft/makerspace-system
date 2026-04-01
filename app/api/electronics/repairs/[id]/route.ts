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
    const body = await request.json()
    const {
      customerName,
      customerIdCardNumber,
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
        customerIdCardNumber,
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

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { RepairStatus } from "@/generated/prisma"

const repairStatuses: RepairStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "WAITING_FOR_PARTS",
  "COMPLETED",
  "PICKED_UP",
  "CANCELLED",
]

export async function POST(request: NextRequest) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      problemTypes,
      description,
      ownerName,
      ownerIdCardNumber,
      ownerPhone,
      status,
      receivedDate,
      photoPath,
    } = body

    const repair = await prisma.bicycleRepair.create({
      data: {
        problemTypes: JSON.stringify(problemTypes),
        description: description || null,
        ownerName,
        ownerIdCardNumber,
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

export async function PATCH(request: NextRequest) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((value: unknown): value is string => typeof value === "string" && value.length > 0)
      : []
    const status =
      typeof body.status === "string" && repairStatuses.includes(body.status as RepairStatus)
        ? (body.status as RepairStatus)
        : null

    if (!ids.length || !status) {
      return NextResponse.json(
        { error: "Invalid bulk repair update payload" },
        { status: 400 }
      )
    }

    const updatedRepairs = await prisma.$transaction(async (tx) => {
      await tx.bicycleRepair.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          status,
          repairedDate: status === "COMPLETED" ? new Date() : undefined,
          pickupDate: status === "PICKED_UP" ? new Date() : undefined,
        },
      })

      return tx.bicycleRepair.findMany({
        where: {
          id: { in: ids },
        },
      })
    })

    return NextResponse.json({ repairs: updatedRepairs })
  } catch (error) {
    console.error("Error updating bicycle repairs:", error)
    return NextResponse.json(
      { error: "Failed to update bicycle repairs" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((value: unknown): value is string => typeof value === "string" && value.length > 0)
      : []

    if (!ids.length) {
      return NextResponse.json(
        { error: "Invalid bulk repair delete payload" },
        { status: 400 }
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.repairPart.deleteMany({
        where: {
          repairId: { in: ids },
        },
      })

      await tx.bicycleRepair.deleteMany({
        where: {
          id: { in: ids },
        },
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting bicycle repairs:", error)
    return NextResponse.json(
      { error: "Failed to delete bicycle repairs" },
      { status: 500 }
    )
  }
}

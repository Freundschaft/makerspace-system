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

function normalizeOptionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function normalizeSelectedPartIds(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return Array.from(
    new Set(
      value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
    )
  )
}

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
      repairDetails,
      ownerName,
      ownerIdCardNumber,
      ownerPhone,
      status,
      receivedDate,
      photoPath,
      selectedPartIds,
    } = body

    const normalizedPartIds = normalizeSelectedPartIds(selectedPartIds)
    const normalizedStatus =
      typeof status === "string" && repairStatuses.includes(status as RepairStatus)
        ? (status as RepairStatus)
        : "PENDING"

    const repair = await prisma.bicycleRepair.create({
      data: {
        problemTypes: JSON.stringify(problemTypes),
        description: normalizeOptionalString(description),
        repairDetails: normalizeOptionalString(repairDetails),
        ownerName,
        ownerIdCardNumber: normalizeOptionalString(ownerIdCardNumber),
        ownerPhone: normalizeOptionalString(ownerPhone),
        status: normalizedStatus,
        receivedDate: new Date(receivedDate),
        repairedDate: normalizedStatus === "COMPLETED" ? new Date() : null,
        pickupDate: normalizedStatus === "PICKED_UP" ? new Date() : null,
        photoPath: normalizeOptionalString(photoPath),
        partsUsed: normalizedPartIds.length
          ? {
              create: normalizedPartIds.map((partId) => ({
                partId,
                quantity: 1,
              })),
            }
          : undefined,
      },
      include: {
        partsUsed: {
          include: {
            part: true,
          },
        },
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
      await Promise.all(
        ids.map((id: string) =>
          tx.bicycleRepair.update({
            where: { id },
            data: {
              status,
              repairedDate: status === "COMPLETED" ? new Date() : null,
              pickupDate: status === "PICKED_UP" ? new Date() : null,
            },
          })
        )
      )

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

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { ElectronicsRepairStatus } from "@/generated/prisma"

const repairStatuses: ElectronicsRepairStatus[] = [
  "UNCHECKED",
  "CHECKED",
  "IN_PROGRESS",
  "READY_FOR_PICKUP",
  "DONE",
  "PICKED_UP",
  "NO_WAY_TO_FIX",
]

export async function GET(request: NextRequest) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const repairs = await prisma.electronicsRepair.findMany({
      include: {
        repairer: true
      },
      orderBy: {
        createdDate: 'desc'
      }
    })

    return NextResponse.json(repairs)
  } catch (error) {
    console.error("Error fetching electronics repairs:", error)
    return NextResponse.json(
      { error: "Failed to fetch electronics repairs" },
      { status: 500 }
    )
  }
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

    const repair = await prisma.electronicsRepair.create({
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
        createdDate: createdDate ? new Date(createdDate) : new Date(),
        repairerId
      },
      include: {
        repairer: true
      }
    })

    return NextResponse.json(repair)
  } catch (error) {
    console.error("Error creating electronics repair:", error)
    return NextResponse.json(
      { error: "Failed to create electronics repair" },
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
      typeof body.status === "string" &&
      repairStatuses.includes(body.status as ElectronicsRepairStatus)
        ? (body.status as ElectronicsRepairStatus)
        : null

    if (!ids.length || !status) {
      return NextResponse.json(
        { error: "Invalid bulk electronics update payload" },
        { status: 400 }
      )
    }

    const updatedRepairs = await prisma.$transaction(async (tx) => {
      await tx.electronicsRepair.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          status,
        },
      })

      return tx.electronicsRepair.findMany({
        where: {
          id: { in: ids },
        },
        include: {
          repairer: true,
        },
      })
    })

    return NextResponse.json({ repairs: updatedRepairs })
  } catch (error) {
    console.error("Error updating electronics repairs:", error)
    return NextResponse.json(
      { error: "Failed to update electronics repairs" },
      { status: 500 }
    )
  }
}

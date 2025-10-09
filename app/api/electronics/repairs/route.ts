import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

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

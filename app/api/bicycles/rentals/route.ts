import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import type { BicycleRental, RentalStatus } from "@/generated/prisma"

const rentalStatuses: RentalStatus[] = ["ACTIVE", "RETURNED", "OVERDUE", "CANCELLED"]

function normalizeDepositAmount(value: unknown) {
  const amount = typeof value === "number" ? value : Number(value)
  return Number.isFinite(amount) && amount >= 0 ? Math.trunc(amount) : null
}

// GET /api/bicycles/rentals - Get all rentals
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const rentals = await prisma.$queryRaw`
      SELECT * FROM BicycleRental
      ORDER BY startDate DESC
    `

    return NextResponse.json(rentals)
  } catch (error) {
    console.error("Error fetching rentals:", error)
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    )
  }
}

// POST /api/bicycles/rentals - Create a new rental
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.renterName || !body.renterPhone || !body.bicycleId || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    const depositAmount = normalizeDepositAmount(body.depositAmount) ?? 150

    // Create the rental using raw SQL
    await prisma.$executeRaw`
      INSERT INTO BicycleRental (
        id, renterName, renterPhone, renterEmail, bicycleId, 
        depositAmount, startDate, endDate, notes, photoPath, signature, status, createdAt, updatedAt
      )
      VALUES (
        UUID(), ${body.renterName}, ${body.renterPhone}, ${body.renterEmail || null}, ${body.bicycleId},
        ${depositAmount}, ${new Date(body.startDate)}, ${new Date(body.endDate)}, ${body.notes || null}, ${body.photoPath || null}, ${body.signature || null}, 'ACTIVE',
        NOW(), NOW()
      )
    `

    // Get the newly created rental
    const newRental = await prisma.$queryRaw<BicycleRental[]>`
      SELECT * FROM BicycleRental
      WHERE renterName = ${body.renterName}
      AND bicycleId = ${body.bicycleId}
      AND startDate = ${new Date(body.startDate)}
      ORDER BY createdAt DESC
      LIMIT 1
    `

    return NextResponse.json(newRental[0], { status: 201 })
  } catch (error) {
    console.error("Error creating rental:", error)
    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
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
      typeof body.status === "string" && rentalStatuses.includes(body.status as RentalStatus)
        ? (body.status as RentalStatus)
        : null

    if (!ids.length || !status) {
      return NextResponse.json(
        { error: "Invalid bulk rental update payload" },
        { status: 400 }
      )
    }

    const updatedRentals = await prisma.$transaction(async (tx) => {
      await tx.bicycleRental.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          status,
          actualReturnDate: status === "RETURNED" ? new Date() : null,
        },
      })

      return tx.bicycleRental.findMany({
        where: {
          id: { in: ids },
        },
      })
    })

    return NextResponse.json({ rentals: updatedRentals })
  } catch (error) {
    console.error("Error updating rentals:", error)
    return NextResponse.json(
      { error: "Failed to update rentals" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
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
        { error: "Invalid bulk rental delete payload" },
        { status: 400 }
      )
    }

    await prisma.bicycleRental.deleteMany({
      where: {
        id: { in: ids },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting rentals:", error)
    return NextResponse.json(
      { error: "Failed to delete rentals" },
      { status: 500 }
    )
  }
}

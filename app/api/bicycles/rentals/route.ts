import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"

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

    // Create the rental using raw SQL
    const result = await prisma.$executeRaw`
      INSERT INTO BicycleRental (
        id, renterName, renterPhone, renterEmail, bicycleId, 
        startDate, endDate, notes, status, createdAt, updatedAt
      )
      VALUES (
        UUID(), ${body.renterName}, ${body.renterPhone}, ${body.renterEmail || null}, ${body.bicycleId},
        ${new Date(body.startDate)}, ${new Date(body.endDate)}, ${body.notes || null}, 'ACTIVE',
        NOW(), NOW()
      )
    `

    // Get the newly created rental
    const newRental = await prisma.$queryRaw`
      SELECT * FROM BicycleRental
      WHERE renterName = ${body.renterName}
      AND bicycleId = ${body.bicycleId}
      AND startDate = ${new Date(body.startDate)}
      ORDER BY createdAt DESC
      LIMIT 1
    ` as any[]

    return NextResponse.json(newRental[0], { status: 201 })
  } catch (error) {
    console.error("Error creating rental:", error)
    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 500 }
    )
  }
} 
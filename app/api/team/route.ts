import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"

// GET /api/team - Get all team members
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

    const teamMembers = await prisma.$queryRaw`
      SELECT * FROM TeamMember
      ORDER BY familyName, givenNames
    `

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    )
  }
}

// POST /api/team - Create a new team member
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
    if (!body.familyName || !body.givenNames || !body.nationality || !body.startDate || 
        !body.department || !body.email || !body.phone || !body.dateOfBirth || !body.legalStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create the team member using raw SQL
    const result = await prisma.$executeRaw`
      INSERT INTO TeamMember (
        id, familyName, givenNames, nationality, photoPath, 
        status, startDate, endDate, department, email, 
        phone, homeAddress, dateOfBirth, legalStatus, 
        createdAt, updatedAt
      )
      VALUES (
        UUID(), ${body.familyName}, ${body.givenNames}, ${body.nationality}, ${body.photoPath || null},
        ${body.status || 'ACTIVE'}, ${new Date(body.startDate)}, ${body.endDate ? new Date(body.endDate) : null},
        ${body.department}, ${body.email}, ${body.phone}, ${body.homeAddress || null},
        ${new Date(body.dateOfBirth)}, ${body.legalStatus}, NOW(), NOW()
      )
    `

    // Get the newly created team member
    const newTeamMember = await prisma.$queryRaw`
      SELECT * FROM TeamMember
      WHERE familyName = ${body.familyName}
      AND givenNames = ${body.givenNames}
      AND email = ${body.email}
      ORDER BY createdAt DESC
      LIMIT 1
    ` as any[]

    return NextResponse.json(newTeamMember[0], { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    )
  }
} 
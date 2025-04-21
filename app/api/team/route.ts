import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import { GoogleWorkspaceService } from "@/app/services/google-workspace"

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

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: [
        { familyName: 'asc' },
        { givenNames: 'asc' },
      ],
    })

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

    // Create the team member in our database
    const teamMember = await prisma.teamMember.create({
      data: {
        familyName: body.familyName,
        givenNames: body.givenNames,
        nationality: body.nationality,
        photoPath: body.photoPath,
        status: body.status,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        department: body.department,
        email: body.email,
        phone: body.phone,
        homeAddress: body.homeAddress,
        dateOfBirth: new Date(body.dateOfBirth),
        legalStatus: body.legalStatus,
      },
    })

    // Create the user in Google Workspace
    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance()
      await googleWorkspace.createUser(teamMember)
    } catch (googleError) {
      console.error("Error creating Google Workspace user:", googleError)
      // If Google Workspace creation fails, delete the team member from our database
      await prisma.teamMember.delete({
        where: { id: teamMember.id },
      })
      throw googleError
    }

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    )
  }
} 
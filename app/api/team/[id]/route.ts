import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import { GoogleWorkspaceService } from "@/app/services/google-workspace"

// PUT /api/team/[id] - Update a team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()

    // Update the team member in our database
    const teamMember = await prisma.teamMember.update({
      where: { id },
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

    // Update the user in Google Workspace
    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance()
      await googleWorkspace.updateUser(teamMember)
    } catch (googleError) {
      console.error("Error updating Google Workspace user:", googleError)
      // Continue even if Google Workspace update fails
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    )
  }
}

// DELETE /api/team/[id] - Delete a team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const token = await getToken({ req: request })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = params

    // Get the team member to get their email
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    })

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      )
    }

    // Delete the user from Google Workspace
    try {
      const googleWorkspace = await GoogleWorkspaceService.getInstance()
      await googleWorkspace.deleteUser(teamMember.email)
    } catch (googleError) {
      console.error("Error deleting Google Workspace user:", googleError)
      // Continue with database deletion even if Google Workspace deletion fails
    }

    // Delete the team member from our database
    await prisma.teamMember.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import { GoogleWorkspaceService } from "@/app/services/google-workspace"

// POST /api/team/sync - Sync team members with Google Workspace
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

    // Get all team members from our database
    const teamMembers = await prisma.teamMember.findMany()

    // Sync with Google Workspace
    const googleWorkspace = await GoogleWorkspaceService.getInstance()
    await googleWorkspace.syncAllUsers(teamMembers)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error syncing team members with Google Workspace:", error)
    return NextResponse.json(
      { error: "Failed to sync team members with Google Workspace" },
      { status: 500 }
    )
  }
} 
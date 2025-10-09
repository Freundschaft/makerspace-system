import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params;
    const project = await prisma.carpentryProject.findUnique({
      where: {
        id: id
      },
      include: {
        assignedTo: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: "Carpentry project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching carpentry project:", error)
    return NextResponse.json(
      { error: "Failed to fetch carpentry project" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params;
    const body = await request.json()
    const {
      date,
      acceptedBy,
      customerType,
      organizationName,
      customerName,
      phoneNumber,
      gender,
      orderType,
      timeNeeded,
      itemToRepair,
      problemDescription,
      projectDescription,
      materialCosts,
      paidByCustomer,
      photoPath,
      assignedToId
    } = body

    const project = await prisma.carpentryProject.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        acceptedBy,
        customerType,
        organizationName,
        customerName,
        phoneNumber,
        gender,
        orderType,
        timeNeeded: timeNeeded ? parseInt(timeNeeded) : null,
        itemToRepair,
        problemDescription,
        projectDescription,
        materialCosts,
        paidByCustomer,
        photoPath,
        assignedToId
      },
      include: {
        assignedTo: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating carpentry project:", error)
    return NextResponse.json(
      { error: "Failed to update carpentry project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await requireAuth(request)
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params;
    await prisma.carpentryProject.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting carpentry project:", error)
    return NextResponse.json(
      { error: "Failed to delete carpentry project" },
      { status: 500 }
    )
  }
}

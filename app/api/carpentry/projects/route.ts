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

    const projects = await prisma.carpentryProject.findMany({
      include: {
        assignedTo: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching carpentry projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch carpentry projects" },
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

    const project = await prisma.carpentryProject.create({
      data: {
        date: date ? new Date(date) : new Date(),
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
    console.error("Error creating carpentry project:", error)
    return NextResponse.json(
      { error: "Failed to create carpentry project" },
      { status: 500 }
    )
  }
}

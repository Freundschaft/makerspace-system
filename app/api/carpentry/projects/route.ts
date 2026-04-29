import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const trimmedValue = value.trim()
  return trimmedValue.length > 0 ? trimmedValue : null
}

function normalizeOptionalInteger(value: unknown): number | null {
  if (typeof value !== "string") {
    return typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : null
  }

  const trimmedValue = value.trim()
  if (trimmedValue.length === 0) {
    return null
  }

  const parsedValue = Number.parseInt(trimmedValue, 10)
  return Number.isNaN(parsedValue) ? null : parsedValue
}

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
        acceptedBy: normalizeOptionalString(acceptedBy),
        customerType: customerType || null,
        organizationName: normalizeOptionalString(organizationName),
        customerName: normalizeOptionalString(customerName),
        phoneNumber: normalizeOptionalString(phoneNumber),
        gender: gender || null,
        orderType: orderType || null,
        timeNeeded: normalizeOptionalInteger(timeNeeded),
        itemToRepair: normalizeOptionalString(itemToRepair),
        problemDescription: normalizeOptionalString(problemDescription),
        projectDescription: normalizeOptionalString(projectDescription),
        materialCosts: normalizeOptionalString(materialCosts),
        paidByCustomer: typeof paidByCustomer === "boolean" ? paidByCustomer : null,
        photoPath: normalizeOptionalString(photoPath),
        assignedToId: normalizeOptionalString(assignedToId)
      },
      include: {
        assignedTo: true
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating carpentry project:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create carpentry project"
      },
      { status: 500 }
    )
  }
}

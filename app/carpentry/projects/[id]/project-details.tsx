"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { CarpentryProject, User } from '@/generated/prisma'

type ProjectWithAssignedTo = CarpentryProject & {
  assignedTo: User | null
}

interface ProjectDetailsProps {
  project: ProjectWithAssignedTo
}

const customerTypeLabels: Record<string, string> = {
  PRIVATE_PERSON: "Private Person",
  ORGANIZATION: "Organization",
  BARBERSHOP: "Barbershop",
  HOUSE: "House",
}

const orderTypeLabels: Record<string, string> = {
  REPAIR_ORDER: "Repair Order",
  PROJECT: "Project",
}

const genderLabels: Record<string, string> = {
  FEMALE: "Female",
  MALE: "Male",
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Date:</div>
              <div>{formatDate(project.date)}</div>

              {project.customerType && (
                <>
                  <div className="font-medium">Type:</div>
                  <div>
                    <Badge variant="outline">
                      {customerTypeLabels[project.customerType] || project.customerType}
                    </Badge>
                  </div>
                </>
              )}

              {project.customerName && (
                <>
                  <div className="font-medium">Name:</div>
                  <div>{project.customerName}</div>
                </>
              )}

              {project.organizationName && (
                <>
                  <div className="font-medium">Organization:</div>
                  <div>{project.organizationName}</div>
                </>
              )}

              {project.phoneNumber && (
                <>
                  <div className="font-medium">Phone:</div>
                  <div>{project.phoneNumber}</div>
                </>
              )}

              {project.gender && (
                <>
                  <div className="font-medium">Gender:</div>
                  <div>{genderLabels[project.gender] || project.gender}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Work details and costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {project.orderType && (
                <>
                  <div className="font-medium">Order Type:</div>
                  <div>
                    <Badge variant={project.orderType === 'PROJECT' ? 'default' : 'secondary'}>
                      {orderTypeLabels[project.orderType] || project.orderType}
                    </Badge>
                  </div>
                </>
              )}

              {project.acceptedBy && (
                <>
                  <div className="font-medium">Accepted By:</div>
                  <div>{project.acceptedBy}</div>
                </>
              )}

              {project.timeNeeded !== null && (
                <>
                  <div className="font-medium">Time Needed:</div>
                  <div>{project.timeNeeded} hours</div>
                </>
              )}

              {project.materialCosts !== null && (
                <>
                  <div className="font-medium">Material Costs:</div>
                  <div>€{Number(project.materialCosts).toFixed(2)}</div>
                </>
              )}

              {project.paidByCustomer !== null && (
                <>
                  <div className="font-medium">Paid by Customer:</div>
                  <div>{project.paidByCustomer ? "Yes" : "No"}</div>
                </>
              )}

              {project.assignedTo && (
                <>
                  <div className="font-medium">Assigned To:</div>
                  <div>{project.assignedTo.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {project.itemToRepair && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Item to Repair</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.itemToRepair}</p>
            </CardContent>
          </Card>
        )}

        {project.problemDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.problemDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.projectDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.projectDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Project Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${project.photoPath}`}
                alt="Carpentry project"
                className="max-w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push(`/carpentry/projects/${project.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}

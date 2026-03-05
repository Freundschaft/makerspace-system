"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { CarpentryProject, User } from '@/generated/prisma'
import { useI18n } from "@/app/components/I18nProvider"

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
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("carpentry.details.customerInfo", "Customer Information")}</CardTitle>
            <CardDescription>{t("carpentry.details.customerInfoDesc", "Contact details")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{t("carpentry.new.fields.date", "Date")}:</div>
              <div>{formatDate(project.date)}</div>

              {project.customerType && (
                <>
                  <div className="font-medium">{t("carpentry.details.type", "Type")}:</div>
                  <div>
                    <Badge variant="outline">
                      {t(`carpentry.customerTypes.${project.customerType}`, customerTypeLabels[project.customerType] || project.customerType)}
                    </Badge>
                  </div>
                </>
              )}

              {project.customerName && (
                <>
                  <div className="font-medium">{t("carpentry.details.name", "Name")}:</div>
                  <div>{project.customerName}</div>
                </>
              )}

              {project.organizationName && (
                <>
                  <div className="font-medium">{t("carpentry.details.organization", "Organization")}:</div>
                  <div>{project.organizationName}</div>
                </>
              )}

              {project.phoneNumber && (
                <>
                  <div className="font-medium">{t("common.phone", "Phone")}:</div>
                  <div>{project.phoneNumber}</div>
                </>
              )}

              {project.gender && (
                <>
                  <div className="font-medium">{t("carpentry.new.fields.gender", "Gender")}:</div>
                  <div>{t(`carpentry.genders.${project.gender}`, genderLabels[project.gender] || project.gender)}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("carpentry.details.projectInfo", "Project Information")}</CardTitle>
            <CardDescription>{t("carpentry.details.projectInfoDesc", "Work details and costs")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {project.orderType && (
                <>
                  <div className="font-medium">{t("carpentry.new.fields.orderType", "Order Type")}:</div>
                  <div>
                    <Badge variant={project.orderType === 'PROJECT' ? 'default' : 'secondary'}>
                      {t(`carpentry.orderTypes.${project.orderType}`, orderTypeLabels[project.orderType] || project.orderType)}
                    </Badge>
                  </div>
                </>
              )}

              {project.acceptedBy && (
                <>
                  <div className="font-medium">{t("carpentry.new.fields.acceptedBy", "Accepted By")}:</div>
                  <div>{project.acceptedBy}</div>
                </>
              )}

              {project.timeNeeded !== null && (
                <>
                  <div className="font-medium">{t("carpentry.details.timeNeeded", "Time Needed")}:</div>
                  <div>{t("carpentry.details.hoursValue", "{value} hours", { value: project.timeNeeded })}</div>
                </>
              )}

              {project.materialCosts !== null && (
                <>
                  <div className="font-medium">{t("carpentry.new.fields.materialCosts", "Material Costs (€)")}:</div>
                  <div>€{Number(project.materialCosts).toFixed(2)}</div>
                </>
              )}

              {project.paidByCustomer !== null && (
                <>
                  <div className="font-medium">{t("carpentry.new.fields.paidByCustomer", "Paid by Customer")}:</div>
                  <div>{project.paidByCustomer ? t("common.yes", "Yes") : t("common.no", "No")}</div>
                </>
              )}

              {project.assignedTo && (
                <>
                  <div className="font-medium">{t("carpentry.details.assignedTo", "Assigned To")}:</div>
                  <div>{project.assignedTo.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {project.itemToRepair && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("carpentry.new.fields.itemToRepair", "Item to Repair")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.itemToRepair}</p>
            </CardContent>
          </Card>
        )}

        {project.problemDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("carpentry.new.fields.problemDescription", "Problem Description")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.problemDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.projectDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("carpentry.new.fields.projectDescription", "Project Description")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.projectDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("carpentry.new.fields.photo", "Project Photo")}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${project.photoPath}`}
                alt={t("carpentry.details.photoAlt", "Carpentry project")}
                className="max-w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push(`/carpentry/projects/${project.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t("common.edit", "Edit")}
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          {t("common.delete", "Delete")}
        </Button>
      </div>
    </div>
  )
}

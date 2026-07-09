import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Receipt, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { CarpentryProject, User } from '@/generated/prisma'
import Image from "next/image"
import Link from "next/link"
import { Locale, localizePathname } from "@/lib/i18n/config"
import { getWhatsAppHref } from "@/lib/whatsapp"

type ProjectWithAssignedTo = CarpentryProject & {
  assignedTo: User | null
}

interface ProjectDetailsProps {
  project: ProjectWithAssignedTo
  locale: Locale
  labels: {
    customerInfo: string
    customerInfoDesc: string
    date: string
    type: string
    name: string
    organization: string
    phone: string
    gender: string
    projectInfo: string
    projectInfoDesc: string
    orderType: string
    acceptedBy: string
    timeNeeded: string
    timeNeededValue: string
    materialCosts: string
    paidByCustomer: string
    yes: string
    no: string
    assignedTo: string
    itemToRepair: string
    problemDescription: string
    projectDescription: string
    photo: string
    photoAlt: string
    logExpense: string
    edit: string
    delete: string
    financeContextLabel: string
    financeTitle: string
    customerTypeLabels: Record<string, string>
    orderTypeLabels: Record<string, string>
    genderLabels: Record<string, string>
  }
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

export async function ProjectDetails({ project, locale, labels }: ProjectDetailsProps) {
  const editHref = localizePathname(`/carpentry/projects/${project.id}/edit`, locale)
  const phoneHref = getWhatsAppHref(project.phoneNumber)
  const financeHref = localizePathname(
    `/finance/new-expense?carpentryProjectId=${project.id}&contextLabel=${encodeURIComponent(labels.financeContextLabel)}&title=${encodeURIComponent(labels.financeTitle)}`,
    locale,
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{labels.customerInfo}</CardTitle>
            <CardDescription>{labels.customerInfoDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.date}:</div>
              <div>{formatDate(project.date)}</div>

              {project.customerType && (
                <>
                  <div className="font-medium">{labels.type}:</div>
                  <div>
                    <Badge variant="outline">
                      {labels.customerTypeLabels[project.customerType] ?? customerTypeLabels[project.customerType] ?? project.customerType}
                    </Badge>
                  </div>
                </>
              )}

              {project.customerName && (
                <>
                  <div className="font-medium">{labels.name}:</div>
                  <div>{project.customerName}</div>
                </>
              )}

              {project.organizationName && (
                <>
                  <div className="font-medium">{labels.organization}:</div>
                  <div>{project.organizationName}</div>
                </>
              )}

              {project.phoneNumber && (
                <>
                  <div className="font-medium">{labels.phone}:</div>
                  <div>
                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {project.phoneNumber}
                      </a>
                    ) : (
                      project.phoneNumber
                    )}
                  </div>
                </>
              )}

              {project.gender && (
                <>
                  <div className="font-medium">{labels.gender}:</div>
                  <div>{labels.genderLabels[project.gender] ?? genderLabels[project.gender] ?? project.gender}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.projectInfo}</CardTitle>
            <CardDescription>{labels.projectInfoDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {project.orderType && (
                <>
                  <div className="font-medium">{labels.orderType}:</div>
                  <div>
                    <Badge variant={project.orderType === 'PROJECT' ? 'default' : 'secondary'}>
                      {labels.orderTypeLabels[project.orderType] ?? orderTypeLabels[project.orderType] ?? project.orderType}
                    </Badge>
                  </div>
                </>
              )}

              {project.acceptedBy && (
                <>
                  <div className="font-medium">{labels.acceptedBy}:</div>
                  <div>{project.acceptedBy}</div>
                </>
              )}

              {project.timeNeeded !== null && (
                <>
                  <div className="font-medium">{labels.timeNeeded}:</div>
                  <div>{labels.timeNeededValue.replace("{value}", String(project.timeNeeded))}</div>
                </>
              )}

              {project.materialCosts !== null && (
                <>
                  <div className="font-medium">{labels.materialCosts}:</div>
                  <div>€{Number(project.materialCosts).toFixed(2)}</div>
                </>
              )}

              {project.paidByCustomer !== null && (
                <>
                  <div className="font-medium">{labels.paidByCustomer}:</div>
                  <div>{project.paidByCustomer ? labels.yes : labels.no}</div>
                </>
              )}

              {project.assignedTo && (
                <>
                  <div className="font-medium">{labels.assignedTo}:</div>
                  <div>{project.assignedTo.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {project.itemToRepair && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.itemToRepair}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.itemToRepair}</p>
            </CardContent>
          </Card>
        )}

        {project.problemDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.problemDescription}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.problemDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.projectDescription && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.projectDescription}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.projectDescription}</p>
            </CardContent>
          </Card>
        )}

        {project.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.photo}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${project.photoPath}`}
                alt={labels.photoAlt}
                width={1200}
                height={900}
                unoptimized
                className="h-auto max-w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href={financeHref}>
            <Receipt className="mr-2 h-4 w-4" />
            {labels.logExpense}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={editHref}>
            <Edit className="mr-2 h-4 w-4" />
            {labels.edit}
          </Link>
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          {labels.delete}
        </Button>
      </div>
    </div>
  )
}

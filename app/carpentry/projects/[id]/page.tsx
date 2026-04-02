import { prisma } from "@/lib/prisma"
import { getServerI18n } from "@/lib/i18n/server";
import { notFound } from "next/navigation"
import { ProjectDetails } from "./project-details"
import { BackButton } from "@/components/BackButton"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CarpentryProjectDetailsPage({ params }: PageProps) {
  const { locale, t } = await getServerI18n();
  const project = await prisma.carpentryProject.findUnique({
    where: {
      id: (await params).id
    },
    include: {
      assignedTo: true
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
         <BackButton />
         <h1 className="text-2xl font-bold">{t("carpentry.details.pageTitle", "Carpentry Project Details")}</h1>
      </div>

      <ProjectDetails
        project={project}
        locale={locale}
        labels={{
          customerInfo: t("carpentry.details.customerInfo", "Customer Information"),
          customerInfoDesc: t("carpentry.details.customerInfoDesc", "Contact details"),
          date: t("carpentry.new.fields.date", "Date"),
          type: t("carpentry.details.type", "Type"),
          name: t("carpentry.details.name", "Name"),
          organization: t("carpentry.details.organization", "Organization"),
          phone: t("common.phone", "Phone"),
          gender: t("carpentry.new.fields.gender", "Gender"),
          projectInfo: t("carpentry.details.projectInfo", "Project Information"),
          projectInfoDesc: t("carpentry.details.projectInfoDesc", "Work details and costs"),
          orderType: t("carpentry.new.fields.orderType", "Order Type"),
          acceptedBy: t("carpentry.new.fields.acceptedBy", "Accepted By"),
          timeNeeded: t("carpentry.details.timeNeeded", "Time Needed"),
          timeNeededValue: t("carpentry.details.hoursValue", "{value} hours", { value: project.timeNeeded ?? 0 }),
          materialCosts: t("carpentry.new.fields.materialCosts", "Material Costs (€)"),
          paidByCustomer: t("carpentry.new.fields.paidByCustomer", "Paid by Customer"),
          yes: t("common.yes", "Yes"),
          no: t("common.no", "No"),
          assignedTo: t("carpentry.details.assignedTo", "Assigned To"),
          itemToRepair: t("carpentry.new.fields.itemToRepair", "Item to Repair"),
          problemDescription: t("carpentry.new.fields.problemDescription", "Problem Description"),
          projectDescription: t("carpentry.new.fields.projectDescription", "Project Description"),
          photo: t("carpentry.new.fields.photo", "Project Photo"),
          photoAlt: t("carpentry.details.photoAlt", "Carpentry project"),
          logExpense: t("finance.expenses.actions.logExpense", "Log expense"),
          edit: t("common.edit", "Edit"),
          delete: t("common.delete", "Delete"),
          financeContextLabel: t(
            "finance.expenses.source.carpentryProjectLinked",
            `Linked to carpentry project: ${project.customerName || project.organizationName || project.id}`
          ),
          financeTitle: project.itemToRepair || project.projectDescription || "Carpentry expense",
          customerTypeLabels: project.customerType
            ? { [project.customerType]: t(`carpentry.customerTypes.${project.customerType}`, project.customerType) }
            : {},
          orderTypeLabels: project.orderType
            ? { [project.orderType]: t(`carpentry.orderTypes.${project.orderType}`, project.orderType) }
            : {},
          genderLabels: project.gender
            ? { [project.gender]: t(`carpentry.genders.${project.gender}`, project.gender) }
            : {},
        }}
      />
    </div>
  )
}

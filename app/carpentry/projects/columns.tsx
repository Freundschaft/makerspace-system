import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { getWhatsAppHref } from "@/lib/whatsapp"

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string

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

export type CarpentryProject = {
  id: string
  date: string
  acceptedBy: string | null
  customerType: string | null
  organizationName: string | null
  customerName: string | null
  phoneNumber: string | null
  gender: string | null
  orderType: string | null
  timeNeeded: number | null
  itemToRepair: string | null
  problemDescription: string | null
  projectDescription: string | null
  materialCosts: number | null
  paidByCustomer: boolean | null
  photoPath: string | null
  assignedTo: {
    email: string | null
  } | null
}

export function getColumns(t: Translator): ColumnDef<CarpentryProject>[] {
  return [
  {
    accessorKey: "date",
    header: t("carpentry.new.fields.date", "Date"),
    cell: ({ row }) => {
      const date = row.getValue("date") as string
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {format(new Date(date), "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "photoPath",
    header: t("common.photo", "Photo"),
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`}
                alt={t("carpentry.details.photoAlt", "Carpentry project")}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}
        </Link>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: t("electronics.details.customer", "Customer"),
    cell: ({ row }) => {
      const customerName = row.getValue("customerName") as string | null
      const organizationName = row.original.organizationName
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {customerName || organizationName || "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "customerType",
    header: t("carpentry.new.fields.customerType", "Customer Type"),
    cell: ({ row }) => {
      const customerType = row.getValue("customerType") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {customerType ? (
            <Badge variant="outline">
              {t(`carpentry.customerTypes.${customerType}`, customerTypeLabels[customerType] || customerType)}
            </Badge>
          ) : "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: t("common.phone", "Phone"),
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as string | null
      const whatsappHref = getWhatsAppHref(phoneNumber)
      const id = row.original.id

      if (phoneNumber && whatsappHref) {
        return (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="block text-primary underline-offset-4 hover:underline"
          >
            {phoneNumber}
          </a>
        )
      }

      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {phoneNumber || "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "orderType",
    header: t("carpentry.new.fields.orderType", "Order Type"),
    cell: ({ row }) => {
      const orderType = row.getValue("orderType") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {orderType ? (
            <Badge variant={orderType === 'PROJECT' ? 'default' : 'secondary'}>
              {t(`carpentry.orderTypes.${orderType}`, orderTypeLabels[orderType] || orderType)}
            </Badge>
          ) : "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "itemToRepair",
    header: t("carpentry.new.fields.itemToRepair", "Item to Repair"),
    cell: ({ row }) => {
      const item = row.getValue("itemToRepair") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {item || "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "acceptedBy",
    header: t("carpentry.new.fields.acceptedBy", "Accepted By"),
    cell: ({ row }) => {
      const acceptedBy = row.getValue("acceptedBy") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {acceptedBy || "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "timeNeeded",
    header: t("carpentry.new.fields.timeNeeded", "Time Needed (hours)"),
    cell: ({ row }) => {
      const time = row.getValue("timeNeeded") as number | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {time ? `${time}h` : "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "materialCosts",
    header: t("carpentry.new.fields.materialCosts", "Material Costs (€)"),
    cell: ({ row }) => {
      const costs = row.getValue("materialCosts") as number | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {costs ? `€${Number(costs).toFixed(2)}` : "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "paidByCustomer",
    header: t("carpentry.new.fields.paidByCustomer", "Paid by Customer"),
    cell: ({ row }) => {
      const paid = row.getValue("paidByCustomer") as boolean | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {paid === null ? "—" : paid ? t("common.yes", "Yes") : t("common.no", "No")}
        </Link>
      )
    },
  },
]
}

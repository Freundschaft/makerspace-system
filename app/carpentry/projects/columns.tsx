"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"

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
  date: Date
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
  materialCosts: any | null
  paidByCustomer: boolean | null
  photoPath: string | null
  assignedTo: {
    email: string | null
  } | null
}

export const columns: ColumnDef<CarpentryProject>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date
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
    header: "Photo",
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`}
                alt="Carpentry project"
                className="object-cover w-full h-full"
              />
            </div>
          ) : null}
        </Link>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const customerName = row.getValue("customerName") as string | null
      const organizationName = row.original.organizationName
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {customerName || organizationName || "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "customerType",
    header: "Customer Type",
    cell: ({ row }) => {
      const customerType = row.getValue("customerType") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {customerType ? (
            <Badge variant="outline">
              {customerTypeLabels[customerType] || customerType}
            </Badge>
          ) : "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "orderType",
    header: "Order Type",
    cell: ({ row }) => {
      const orderType = row.getValue("orderType") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {orderType ? (
            <Badge variant={orderType === 'PROJECT' ? 'default' : 'secondary'}>
              {orderTypeLabels[orderType] || orderType}
            </Badge>
          ) : "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "itemToRepair",
    header: "Item",
    cell: ({ row }) => {
      const item = row.getValue("itemToRepair") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {item || "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "acceptedBy",
    header: "Accepted By",
    cell: ({ row }) => {
      const acceptedBy = row.getValue("acceptedBy") as string | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {acceptedBy || "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "timeNeeded",
    header: "Time (hours)",
    cell: ({ row }) => {
      const time = row.getValue("timeNeeded") as number | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {time ? `${time}h` : "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "materialCosts",
    header: "Material Costs",
    cell: ({ row }) => {
      const costs = row.getValue("materialCosts") as number | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {costs ? `€${Number(costs).toFixed(2)}` : "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "paidByCustomer",
    header: "Paid",
    cell: ({ row }) => {
      const paid = row.getValue("paidByCustomer") as boolean | null
      const id = row.original.id
      return (
        <Link href={`/carpentry/projects/${id}`} className="block">
          {paid === null ? "-" : paid ? "Yes" : "No"}
        </Link>
      )
    },
  },
]

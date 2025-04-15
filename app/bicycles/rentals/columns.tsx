"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"

const rentalStatusLabels: Record<string, string> = {
  ACTIVE: "Active",
  RETURNED: "Returned",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
}

export type Rental = {
  id: string
  renterName: string
  renterPhone: string
  renterEmail: string | null
  bicycleId: string
  startDate: Date
  endDate: Date
  actualReturnDate: Date | null
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'CANCELLED'
  notes: string | null
}

export const columns: ColumnDef<Rental>[] = [
  {
    accessorKey: "renterName",
    header: "Renter Name",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          {row.getValue("renterName")}
        </Link>
      )
    },
  },
  {
    accessorKey: "renterPhone",
    header: "Phone",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          {row.getValue("renterPhone")}
        </Link>
      )
    },
  },
  {
    accessorKey: "bicycleId",
    header: "Bicycle ID",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          {row.getValue("bicycleId")}
        </Link>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date
      const id = row.original.id
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          {format(date, "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date
      const id = row.original.id
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          {format(date, "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const id = row.original.id
      
      let variant: "default" | "destructive" | "outline" | "secondary" = "outline"
      
      if (status === "ACTIVE") {
        variant = "default"
      } else if (status === "OVERDUE") {
        variant = "destructive"
      } else if (status === "RETURNED") {
        variant = "secondary"
      }
      
      return (
        <Link href={`/bicycles/rentals/${id}`} className="block">
          <Badge variant={variant}>
            {rentalStatusLabels[status] || status}
          </Badge>
        </Link>
      )
    },
  },
] 
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import { localizePathname, type Locale } from "@/lib/i18n/config"

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string

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

export function getColumns(t: Translator, locale: Locale): ColumnDef<Rental>[] {
  return [
  {
    accessorKey: "renterName",
    header: t("rentals.new.fields.renterName", "Renter Name"),
    cell: ({ row }) => {
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      return (
        <Link href={href} className="block">
          {row.getValue("renterName")}
        </Link>
      )
    },
  },
  {
    accessorKey: "renterPhone",
    header: t("common.phone", "Phone"),
    cell: ({ row }) => {
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      return (
        <Link href={href} className="block">
          {row.getValue("renterPhone")}
        </Link>
      )
    },
  },
  {
    accessorKey: "bicycleId",
    header: t("rentals.new.fields.bicycleId", "Bicycle ID"),
    cell: ({ row }) => {
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      return (
        <Link href={href} className="block">
          {row.getValue("bicycleId")}
        </Link>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: t("rentals.new.fields.startDate", "Start Date"),
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      return (
        <Link href={href} className="block">
          {format(date, "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "endDate",
    header: t("rentals.new.fields.endDate", "End Date"),
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      return (
        <Link href={href} className="block">
          {format(date, "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "status",
    header: t("common.status", "Status"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const id = row.original.id
      const href = localizePathname(`/bicycles/rentals/${id}`, locale)
      
      let variant: "default" | "destructive" | "outline" | "secondary" = "outline"
      
      if (status === "ACTIVE") {
        variant = "default"
      } else if (status === "OVERDUE") {
        variant = "destructive"
      } else if (status === "RETURNED") {
        variant = "secondary"
      }
      
      return (
        <Link href={href} className="block">
          <Badge variant={variant}>
            {t(`rentals.statuses.${status}`, status)}
          </Badge>
        </Link>
      )
    },
  },
]
}

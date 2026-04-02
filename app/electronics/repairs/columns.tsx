import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { localizePathname, type Locale } from "@/lib/i18n/config"
import {
  electronicsCategoryLabels,
  getElectronicsCategoryImage,
} from "@/lib/electronics-categories"

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string

const statusLabels: Record<string, string> = {
  UNCHECKED: "Unchecked",
  CHECKED: "Checked",
  IN_PROGRESS: "In Progress",
  READY_FOR_PICKUP: "Ready for Pickup",
  DONE: "Done",
  PICKED_UP: "Picked Up",
  NO_WAY_TO_FIX: "No Way to Fix",
}

export type ElectronicsRepair = {
  id: string
  repairId: number
  customerName: string
  customerIdCardNumber: string
  category: string
  item: string | null
  whatsapp: string | null
  serialNumber: string | null
  status: string
  repairable: boolean | null
  notes: string | null
  photoPath: string | null
  createdDate: Date
  repairer: {
    email: string | null
  } | null
}

export function getColumns(t: Translator, locale: Locale): ColumnDef<ElectronicsRepair>[] {
  return [
  {
    accessorKey: "repairId",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block font-mono">
          #{row.getValue("repairId")}
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
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`}
                alt={t("modules.electronics.title", "Electronics Repairs")}
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
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {row.getValue("customerName")}
        </Link>
      )
    },
  },
  {
    accessorKey: "customerIdCardNumber",
    header: t("electronics.new.fields.customerIdCardNumber", "ID Card Number"),
    cell: ({ row }) => {
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block font-mono">
          {row.getValue("customerIdCardNumber")}
        </Link>
      )
    },
  },
  {
    accessorKey: "category",
    header: t("electronics.new.fields.category", "Category"),
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 shrink-0 rounded-md border bg-background/80 p-1">
              <Image
                src={getElectronicsCategoryImage(category)}
                alt={t(
                  `electronics.categories.${category}`,
                  electronicsCategoryLabels[category as keyof typeof electronicsCategoryLabels] ?? category
                )}
                fill
                className="object-contain p-1"
              />
            </div>
            <Badge variant="outline">
              {t(
                `electronics.categories.${category}`,
                electronicsCategoryLabels[category as keyof typeof electronicsCategoryLabels] ?? category
              )}
            </Badge>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "item",
    header: t("electronics.details.item", "Item"),
    cell: ({ row }) => {
      const item = row.getValue("item") as string | null
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {item || "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "whatsapp",
    header: t("electronics.new.fields.whatsapp", "WhatsApp"),
    cell: ({ row }) => {
      const whatsapp = row.getValue("whatsapp") as string | null
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {whatsapp || "—"}
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
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          <Badge variant={
            status === 'DONE' || status === 'PICKED_UP' ? 'default' :
            status === 'READY_FOR_PICKUP' ? 'default' :
            status === 'IN_PROGRESS' ? 'secondary' :
            status === 'CHECKED' ? 'secondary' :
            status === 'NO_WAY_TO_FIX' ? 'destructive' :
            'outline'
          }>
            {t(`common.statuses.${status}`, statusLabels[status] || status)}
          </Badge>
        </Link>
      )
    },
  },
  {
    accessorKey: "repairable",
    header: t("electronics.new.fields.repairable", "Repairable"),
    cell: ({ row }) => {
      const repairable = row.getValue("repairable") as boolean | null
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {repairable === null ? "—" : repairable ? t("common.yes", "Yes") : t("common.no", "No")}
        </Link>
      )
    },
  },
  {
    accessorKey: "createdDate",
    header: t("common.created", "Created"),
    cell: ({ row }) => {
      const date = row.getValue("createdDate") as Date
      const id = row.original.id
      const href = localizePathname(`/electronics/repairs/${id}`, locale)
      return (
        <Link href={href} className="block">
          {format(new Date(date), "PPP")}
        </Link>
      )
    },
  },
]
}

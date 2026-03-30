import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"

type Translator = (key: string, fallback: string, params?: Record<string, string | number>) => string

export type Repair = {
  id: string
  problemTypes: string
  description: string
  receivedDate: Date
  repairedDate: Date | null
  pickupDate: Date | null
  ownerPhone: string
  status: 'PENDING' | 'IN_PROGRESS' | 'WAITING_FOR_PARTS' | 'COMPLETED' | 'PICKED_UP' | 'CANCELLED'
  photoPath: string | null
  partsUsed: {
    part: {
      name: string
    }
    quantity: number
  }[]
}

export function getColumns(t: Translator): ColumnDef<Repair>[] {
  return [
  {
    accessorKey: "photoPath",
    header: t("common.photo", "Photo"),
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <img 
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`} 
                alt={t("modules.repairs.title", "Bicycle Repairs")} 
                className="object-cover w-full h-full"
              />
            </div>
          ) : null}
        </Link>
      )
    },
  },
  {
    accessorKey: "problemTypes",
    header: t("repairs.details.problemTypes", "Problem Types"),
    cell: ({ row }) => {
      const types = JSON.parse(row.getValue("problemTypes") as string) as string[]
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          <div className="flex flex-wrap gap-1">
            {types.map((type) => (
              <Badge key={type} variant="outline">
                {t(`bicycles.problemTypes.${type}`, type)}
              </Badge>
            ))}
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "ownerPhone",
    header: t("repairs.form.ownerPhone", "Owner Phone"),
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {row.getValue("ownerPhone")}
        </Link>
      )
    },
  },
  {
    accessorKey: "receivedDate",
    header: t("repairs.details.receivedDate", "Received Date"),
    cell: ({ row }) => {
      const date = row.getValue("receivedDate") as Date
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {format(date, "PPP")}
        </Link>
      )
    },
  },
  {
    accessorKey: "repairedDate",
    header: t("repairs.details.repairedDate", "Repaired Date"),
    cell: ({ row }) => {
      const date = row.getValue("repairedDate") as Date | null
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {date ? format(date, "PPP") : "—"}
        </Link>
      )
    },
  },
  {
    accessorKey: "pickupDate",
    header: t("repairs.details.pickupDate", "Pickup Date"),
    cell: ({ row }) => {
      const date = row.getValue("pickupDate") as Date | null
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {date ? format(date, "PPP") : "—"}
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
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          <Badge variant={
            status === 'COMPLETED' ? 'default' :
            status === 'IN_PROGRESS' ? 'default' :
            status === 'WAITING_FOR_PARTS' ? 'secondary' :
            status === 'PICKED_UP' ? 'secondary' :
            status === 'CANCELLED' ? 'destructive' :
            'outline'
          }>
            {t(`common.statuses.${status}`, status.replace('_', ' '))}
          </Badge>
        </Link>
      )
    },
  },
  {
    accessorKey: "partsUsed",
    header: t("repairs.details.partsUsed", "Parts Used"),
    cell: ({ row }) => {
      const parts = row.getValue("partsUsed") as Repair['partsUsed']
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {parts.map(p => `${p.part.name} (${p.quantity})`).join(", ") || "—"}
        </Link>
      )
    },
  },
]
}

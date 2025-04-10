"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const problemTypeLabels: Record<string, string> = {
  FLAT_TIRE: "Flat Tire",
  BRAKE_ISSUES: "Brake Issues",
  CHAIN_ISSUES: "Chain Issues",
  GEAR_ISSUES: "Gear Issues",
  WHEEL_ALIGNMENT: "Wheel Alignment",
  FRAME_DAMAGE: "Frame Damage",
  SADDLE_ISSUES: "Saddle Issues",
  HANDLEBAR_ISSUES: "Handlebar Issues",
  PEDAL_ISSUES: "Pedal Issues",
  OTHER: "Other",
}

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

export const columns: ColumnDef<Repair>[] = [
  {
    accessorKey: "photoPath",
    header: "Photo",
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      return photoPath ? (
        <div className="w-10 h-10 relative rounded-md overflow-hidden">
          <img 
            src={`/api/files/${photoPath}`} 
            alt="Bicycle repair" 
            className="object-cover w-full h-full"
          />
        </div>
      ) : null
    },
  },
  {
    accessorKey: "problemTypes",
    header: "Problem Types",
    cell: ({ row }) => {
      const types = JSON.parse(row.getValue("problemTypes") as string) as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {types.map((type) => (
            <Badge key={type} variant="outline">
              {problemTypeLabels[type] || type}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "ownerPhone",
    header: "Owner Phone",
  },
  {
    accessorKey: "receivedDate",
    header: "Received",
    cell: ({ row }) => {
      const date = row.getValue("receivedDate") as Date
      return format(date, "PPP")
    },
  },
  {
    accessorKey: "repairedDate",
    header: "Repaired",
    cell: ({ row }) => {
      const date = row.getValue("repairedDate") as Date | null
      return date ? format(date, "PPP") : "-"
    },
  },
  {
    accessorKey: "pickupDate",
    header: "Picked Up",
    cell: ({ row }) => {
      const date = row.getValue("pickupDate") as Date | null
      return date ? format(date, "PPP") : "-"
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={
          status === 'COMPLETED' ? 'default' :
          status === 'IN_PROGRESS' ? 'default' :
          status === 'WAITING_FOR_PARTS' ? 'secondary' :
          status === 'PICKED_UP' ? 'secondary' :
          status === 'CANCELLED' ? 'destructive' :
          'outline'
        }>
          {status.replace('_', ' ')}
        </Badge>
      )
    },
  },
  {
    accessorKey: "partsUsed",
    header: "Parts Used",
    cell: ({ row }) => {
      const parts = row.getValue("partsUsed") as Repair['partsUsed']
      return parts.map(p => `${p.part.name} (${p.quantity})`).join(", ") || "-"
    },
  },
] 
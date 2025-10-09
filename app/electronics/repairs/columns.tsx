"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"

const categoryLabels: Record<string, string> = {
  PHONE: "Phone",
  TABLET: "Tablet",
  HEADPHONES: "Headphones",
  HEATER: "Heater",
  SPEAKER: "Speaker",
  HAIR_CLIPPER: "Hair Clipper",
  COOLER: "Cooler",
  POWER_BANK: "Power Bank",
  KETTLE: "Kettle",
  LAPTOP: "Laptop",
  MULTI_SOCKET: "Multi Socket",
  PIZZA_PAN_CABLE: "Pizza Pan Cable",
  PAN: "Pan",
  GLASSES: "Glasses",
  AUX: "Aux",
  WATCH: "Watch",
  ADAPTOR: "Adaptor",
  HANDSFREE: "Handsfree",
  CABLE: "Cable",
  HAIR_CUTTER: "Hair Cutter",
  HAIR_DRYER: "Hair Dryer",
  FAN: "Fan",
  PRINTER: "Printer",
  ELECTRONIC_CIGARETTE: "Electronic Cigarette",
  STOVE: "Stove",
  PIZZA_PAN: "Pizza Pan",
  WIRELESS: "Wireless",
  EAR_PAD: "Ear Pad",
  SMART_WATCH: "Smart Watch",
  XBOX360: "Xbox 360",
  TOASTER: "Toaster",
  TAILOR_MACHINE: "Tailor Machine",
  BATTERY: "Battery",
  PHONE_CASE: "Phone Case",
  BRACELET: "Bracelet",
  TESBIH: "Tesbih",
  HAND_MIXER: "Hand Mixer",
  COMPUTER: "Computer",
  SEWING_MACHINE: "Sewing Machine",
  WATER_HEATER: "Water Heater",
  PUMP: "Pump",
  KEYBOARD: "Keyboard",
  PLUG: "Plug",
  WATER_BOILER: "Water Boiler",
  THERAPY: "Therapy",
  COFFEE_MAKER: "Coffee Maker",
  KITCHEN: "Kitchen",
  BOARD: "Board",
  MAT: "Mat",
  RADIO: "Radio",
  VACUUM_CLEANER: "Vacuum Cleaner",
  OTHER: "Other",
}

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

export const columns: ColumnDef<ElectronicsRepair>[] = [
  {
    accessorKey: "repairId",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block font-mono">
          #{row.getValue("repairId")}
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
        <Link href={`/electronics/repairs/${id}`} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`}
                alt="Electronics repair"
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
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          {row.getValue("customerName")}
        </Link>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          <Badge variant="outline">
            {categoryLabels[category] || category}
          </Badge>
        </Link>
      )
    },
  },
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => {
      const item = row.getValue("item") as string | null
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          {item || "-"}
        </Link>
      )
    },
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
    cell: ({ row }) => {
      const whatsapp = row.getValue("whatsapp") as string | null
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          {whatsapp || "-"}
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
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          <Badge variant={
            status === 'DONE' || status === 'PICKED_UP' ? 'default' :
            status === 'READY_FOR_PICKUP' ? 'default' :
            status === 'IN_PROGRESS' ? 'secondary' :
            status === 'CHECKED' ? 'secondary' :
            status === 'NO_WAY_TO_FIX' ? 'destructive' :
            'outline'
          }>
            {statusLabels[status] || status}
          </Badge>
        </Link>
      )
    },
  },
  {
    accessorKey: "repairable",
    header: "Repairable",
    cell: ({ row }) => {
      const repairable = row.getValue("repairable") as boolean | null
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          {repairable === null ? "-" : repairable ? "Yes" : "No"}
        </Link>
      )
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdDate") as Date
      const id = row.original.id
      return (
        <Link href={`/electronics/repairs/${id}`} className="block">
          {format(new Date(date), "PPP")}
        </Link>
      )
    },
  },
]

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { ElectronicsRepair, User } from '@/generated/prisma'

type RepairWithRepairer = ElectronicsRepair & {
  repairer: User | null
}

interface RepairDetailsProps {
  repair: RepairWithRepairer
}

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

export function RepairDetails({ repair }: RepairDetailsProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Contact details and device info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Repair ID:</div>
              <div className="font-mono">#{repair.repairId}</div>

              <div className="font-medium">Customer:</div>
              <div>{repair.customerName}</div>

              {repair.whatsapp && (
                <>
                  <div className="font-medium">WhatsApp:</div>
                  <div>{repair.whatsapp}</div>
                </>
              )}

              {repair.serialNumber && (
                <>
                  <div className="font-medium">Serial Number:</div>
                  <div className="font-mono text-sm">{repair.serialNumber}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repair Information</CardTitle>
            <CardDescription>Device and repair status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Category:</div>
              <div>
                <Badge variant="outline">
                  {categoryLabels[repair.category] || repair.category}
                </Badge>
              </div>

              {repair.item && (
                <>
                  <div className="font-medium">Item:</div>
                  <div>{repair.item}</div>
                </>
              )}

              <div className="font-medium">Status:</div>
              <div>
                <Badge variant={
                  repair.status === "DONE" || repair.status === "PICKED_UP"
                    ? "default"
                    : repair.status === "IN_PROGRESS" || repair.status === "READY_FOR_PICKUP"
                    ? "secondary"
                    : repair.status === "NO_WAY_TO_FIX"
                    ? "destructive"
                    : "outline"
                }>
                  {statusLabels[repair.status] || repair.status}
                </Badge>
              </div>

              <div className="font-medium">Repairable:</div>
              <div>
                {repair.repairable === null ? "Not assessed" : repair.repairable ? "Yes" : "No"}
              </div>

              <div className="font-medium">Created:</div>
              <div>{formatDate(repair.createdDate)}</div>

              {repair.repairer && (
                <>
                  <div className="font-medium">Repairer:</div>
                  <div>{repair.repairer.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {repair.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{repair.notes}</p>
            </CardContent>
          </Card>
        )}

        {repair.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Device Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${repair.photoPath}`}
                alt="Electronic device"
                className="max-w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push(`/electronics/repairs/${repair.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}

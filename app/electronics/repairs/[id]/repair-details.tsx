import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { ElectronicsRepairStatus, ElectronicsCategory, User } from '@/generated/prisma'
import Image from "next/image"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { localizePathname } from "@/lib/i18n/config"

type RepairWithRepairer = {
  id: string
  repairId: number
  customerName: string
  customerIdCardNumber: string
  category: ElectronicsCategory
  item: string | null
  whatsapp: string | null
  serialNumber: string | null
  status: ElectronicsRepairStatus
  repairable: boolean | null
  notes: string | null
  photoPath: string | null
  createdDate: Date
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

export async function RepairDetails({ repair }: RepairDetailsProps) {
  const { locale, t } = await getServerI18n()
  const editHref = localizePathname(`/electronics/repairs/${repair.id}/edit`, locale)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("electronics.details.customerInfo", "Customer Information")}</CardTitle>
            <CardDescription>{t("electronics.details.customerInfoDesc", "Contact details and device info")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{t("electronics.details.repairId", "Repair ID")}:</div>
              <div className="font-mono">#{repair.repairId}</div>

              <div className="font-medium">{t("electronics.details.customer", "Customer")}:</div>
              <div>{repair.customerName}</div>

              <div className="font-medium">{t("electronics.new.fields.customerIdCardNumber", "ID Card Number")}:</div>
              <div className="font-mono text-sm">{repair.customerIdCardNumber}</div>

              {repair.whatsapp && (
                <>
                  <div className="font-medium">{t("electronics.new.fields.whatsapp", "WhatsApp")}:</div>
                  <div>{repair.whatsapp}</div>
                </>
              )}

              {repair.serialNumber && (
                <>
                  <div className="font-medium">{t("electronics.new.fields.serialNumber", "Serial Number")}:</div>
                  <div className="font-mono text-sm">{repair.serialNumber}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("electronics.details.repairInfo", "Repair Information")}</CardTitle>
            <CardDescription>{t("electronics.details.repairInfoDesc", "Device and repair status")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{t("electronics.new.fields.category", "Category")}:</div>
              <div>
                <Badge variant="outline">
                  {t(`electronics.categories.${repair.category}`, categoryLabels[repair.category] || repair.category)}
                </Badge>
              </div>

              {repair.item && (
                <>
                  <div className="font-medium">{t("electronics.details.item", "Item")}:</div>
                  <div>{repair.item}</div>
                </>
              )}

              <div className="font-medium">{t("common.status", "Status")}:</div>
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
                  {t(`common.statuses.${repair.status}`, statusLabels[repair.status] || repair.status)}
                </Badge>
              </div>

              <div className="font-medium">{t("electronics.new.fields.repairable", "Repairable")}:</div>
              <div>
                {repair.repairable === null
                  ? t("electronics.details.notAssessed", "Not assessed")
                  : repair.repairable
                  ? t("common.yes", "Yes")
                  : t("common.no", "No")}
              </div>

              <div className="font-medium">{t("common.created", "Created")}:</div>
              <div>{formatDate(repair.createdDate)}</div>

              {repair.repairer && (
                <>
                  <div className="font-medium">{t("electronics.details.repairer", "Repairer")}:</div>
                  <div>{repair.repairer.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {repair.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("common.notes", "Notes")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{repair.notes}</p>
            </CardContent>
          </Card>
        )}

        {repair.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("electronics.new.fields.photo", "Device Photo")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${repair.photoPath}`}
                alt={t("electronics.details.devicePhotoAlt", "Electronic device")}
                width={1200}
                height={900}
                unoptimized
                className="h-auto max-w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href={editHref}>
            <Edit className="mr-2 h-4 w-4" />
            {t("common.edit", "Edit")}
          </Link>
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          {t("common.delete", "Delete")}
        </Button>
      </div>
    </div>
  )
}

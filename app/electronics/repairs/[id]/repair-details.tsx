import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { ElectronicsRepairStatus, ElectronicsCategory, User } from '@/generated/prisma'
import Image from "next/image"
import Link from "next/link"
import { Locale, localizePathname } from "@/lib/i18n/config"
import {
  electronicsCategoryLabels,
  getElectronicsCategoryImage,
} from "@/lib/electronics-categories"
import { ElectronicsRepairDeleteButton } from "./electronics-repair-delete-button"

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
  locale: Locale
  labels: {
    customerInfo: string
    customerInfoDesc: string
    repairId: string
    customer: string
    customerIdCardNumber: string
    whatsapp: string
    serialNumber: string
    repairInfo: string
    repairInfoDesc: string
    category: string
    item: string
    status: string
    repairable: string
    notAssessed: string
    yes: string
    no: string
    created: string
    repairer: string
    notes: string
    photo: string
    devicePhotoAlt: string
    edit: string
    delete: string
    categoryLabels: Record<string, string>
    statusLabels: Record<string, string>
  }
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

export async function RepairDetails({ repair, locale, labels }: RepairDetailsProps) {
  const editHref = localizePathname(`/electronics/repairs/${repair.id}/edit`, locale)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{labels.customerInfo}</CardTitle>
            <CardDescription>{labels.customerInfoDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.repairId}:</div>
              <div className="font-mono">#{repair.repairId}</div>

              <div className="font-medium">{labels.customer}:</div>
              <div>{repair.customerName}</div>

              <div className="font-medium">{labels.customerIdCardNumber}:</div>
              <div className="font-mono text-sm">{repair.customerIdCardNumber}</div>

              {repair.whatsapp && (
                <>
                  <div className="font-medium">{labels.whatsapp}:</div>
                  <div>{repair.whatsapp}</div>
                </>
              )}

              {repair.serialNumber && (
                <>
                  <div className="font-medium">{labels.serialNumber}:</div>
                  <div className="font-mono text-sm">{repair.serialNumber}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{labels.repairInfo}</CardTitle>
            <CardDescription>{labels.repairInfoDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.category}:</div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="relative h-9 w-9 shrink-0 rounded-md border bg-background/80 p-1">
                    <Image
                      src={getElectronicsCategoryImage(repair.category)}
                      alt={
                        labels.categoryLabels[repair.category] ??
                        electronicsCategoryLabels[repair.category] ??
                        repair.category
                      }
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <Badge variant="outline">
                    {labels.categoryLabels[repair.category] ?? electronicsCategoryLabels[repair.category] ?? repair.category}
                  </Badge>
                </div>
              </div>

              {repair.item && (
                <>
                  <div className="font-medium">{labels.item}:</div>
                  <div>{repair.item}</div>
                </>
              )}

              <div className="font-medium">{labels.status}:</div>
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
                  {labels.statusLabels[repair.status] ?? statusLabels[repair.status] ?? repair.status}
                </Badge>
              </div>

              <div className="font-medium">{labels.repairable}:</div>
              <div>
                {repair.repairable === null
                  ? labels.notAssessed
                  : repair.repairable
                  ? labels.yes
                  : labels.no}
              </div>

              <div className="font-medium">{labels.created}:</div>
              <div>{formatDate(repair.createdDate)}</div>

              {repair.repairer && (
                <>
                  <div className="font-medium">{labels.repairer}:</div>
                  <div>{repair.repairer.email}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {repair.notes && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.notes}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{repair.notes}</p>
            </CardContent>
          </Card>
        )}

        {repair.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.photo}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${repair.photoPath}`}
                alt={labels.devicePhotoAlt}
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
            {labels.edit}
          </Link>
        </Button>
        <ElectronicsRepairDeleteButton
          repairId={repair.id}
          locale={locale}
          label={labels.delete}
          deletingLabel="Deleting..."
          confirmMessage="Are you sure you want to delete this repair?"
          errorMessage="Failed to delete electronics repair"
        />
      </div>
    </div>
  )
}

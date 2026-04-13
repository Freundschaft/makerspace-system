import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { RepairStatus, Part, RepairPart } from '@/generated/prisma'
import Image from "next/image"
import Link from "next/link"
import { Locale, localizePathname } from "@/lib/i18n/config"
import { BicycleRepairDeleteButton } from "./bicycle-repair-delete-button"

type RepairWithParts = {
  id: string
  problemTypes: string
  description: string | null
  repairDetails: string | null
  receivedDate: Date
  repairedDate: Date | null
  pickupDate: Date | null
  ownerName: string
  ownerIdCardNumber: string | null
  ownerPhone: string | null
  status: RepairStatus
  photoPath: string | null
  partsUsed: (RepairPart & {
    part: Part
  })[]
}

interface RepairDetailsProps {
  repair: RepairWithParts
  locale: Locale
  labels: {
    contactInfo: string
    contactInfoDesc: string
    ownerName: string
    ownerIdCardNumber: string
    phone: string
    repairInfo: string
    repairInfoDesc: string
    status: string
    problemTypes: string
    receivedDate: string
    repairedDate: string
    pickupDate: string
    description: string
    repairDetails: string
    bicyclePhoto: string
    photoAlt: string
    partsUsed: string
    part: string
    quantity: string
    edit: string
    delete: string
    deleting: string
    deleteConfirm: string
    deleteError: string
    statusLabels: Record<string, string>
    problemTypeLabels: Record<string, string>
  }
}

export async function RepairDetails({ repair, locale, labels }: RepairDetailsProps) {
  const problemTypes = JSON.parse(repair.problemTypes)
  const editHref = localizePathname(`/bicycles/repairs/${repair.id}/edit`, locale)

  return (
    <div className="space-y-6">      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{labels.contactInfo}</CardTitle>
            <CardDescription>{labels.contactInfoDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">{labels.ownerName}:</div>
              <div>{repair.ownerName}</div>

              <div className="font-medium">{labels.ownerIdCardNumber}:</div>
              <div>{repair.ownerIdCardNumber || "—"}</div>

              <div className="font-medium">{labels.phone}:</div>
              <div>{repair.ownerPhone || "—"}</div>
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
              <div className="font-medium">{labels.status}:</div>
              <div>
                <Badge variant={
                  repair.status === "COMPLETED"
                    ? "default"
                    : repair.status === "IN_PROGRESS"
                    ? "secondary"
                    : "outline"
                }>
                  {labels.statusLabels[repair.status] ?? repair.status}
                </Badge>
              </div>
              
              <div className="font-medium">{labels.problemTypes}:</div>
              <div className="flex flex-wrap gap-1">
                {problemTypes.map((type: string) => (
                  <Badge key={type} variant="outline">{labels.problemTypeLabels[type] ?? type}</Badge>
                ))}
              </div>
              
              <div className="font-medium">{labels.receivedDate}:</div>
              <div>{formatDate(repair.receivedDate)}</div>
              
              {repair.repairedDate && (
                <>
                  <div className="font-medium">{labels.repairedDate}:</div>
                  <div>{formatDate(repair.repairedDate)}</div>
                </>
              )}
              
              {repair.pickupDate && (
                <>
                  <div className="font-medium">{labels.pickupDate}:</div>
                  <div>{formatDate(repair.pickupDate)}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{labels.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{repair.description || "—"}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{labels.repairDetails}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{repair.repairDetails || "—"}</p>
          </CardContent>
        </Card>

        {repair.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.bicyclePhoto}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${repair.photoPath}`} 
                alt={labels.photoAlt}
                width={1200}
                height={900}
                unoptimized
                className="h-auto max-w-full rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {repair.partsUsed.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{labels.partsUsed}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">{labels.part}</th>
                      <th className="text-right py-2 px-4">{labels.quantity}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repair.partsUsed.map((repairPart) => (
                      <tr key={repairPart.id} className="border-b">
                        <td className="py-2 px-4">{repairPart.part.name}</td>
                        <td className="text-right py-2 px-4">{repairPart.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        <BicycleRepairDeleteButton
          repairId={repair.id}
          locale={locale}
          label={labels.delete}
          deletingLabel={labels.deleting}
          confirmMessage={labels.deleteConfirm}
          errorMessage={labels.deleteError}
        />
      </div>
    </div>
  )
} 

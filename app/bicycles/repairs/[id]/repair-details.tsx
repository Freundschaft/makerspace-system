"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { BicycleRepair, Part, RepairPart } from '@/generated/prisma'

type RepairWithParts = BicycleRepair & {
  partsUsed: (RepairPart & {
    part: Part
  })[]
}

interface RepairDetailsProps {
  repair: RepairWithParts
}

export function RepairDetails({ repair }: RepairDetailsProps) {
  const router = useRouter()
  const problemTypes = JSON.parse(repair.problemTypes)

  return (
    <div className="space-y-6">      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Details about the bicycle owner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Phone:</div>
              <div>{repair.ownerPhone}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repair Information</CardTitle>
            <CardDescription>Details about the repair</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Status:</div>
              <div>
                <Badge variant={
                  repair.status === "COMPLETED"
                    ? "default"
                    : repair.status === "IN_PROGRESS"
                    ? "secondary"
                    : "outline"
                }>
                  {repair.status}
                </Badge>
              </div>
              
              <div className="font-medium">Problem Types:</div>
              <div className="flex flex-wrap gap-1">
                {problemTypes.map((type: string) => (
                  <Badge key={type} variant="outline">{type}</Badge>
                ))}
              </div>
              
              <div className="font-medium">Received Date:</div>
              <div>{formatDate(repair.receivedDate)}</div>
              
              {repair.repairedDate && (
                <>
                  <div className="font-medium">Repaired Date:</div>
                  <div>{formatDate(repair.repairedDate)}</div>
                </>
              )}
              
              {repair.pickupDate && (
                <>
                  <div className="font-medium">Pickup Date:</div>
                  <div>{formatDate(repair.pickupDate)}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{repair.description}</p>
          </CardContent>
        </Card>

        {repair.photoPath && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Bicycle Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${repair.photoPath}`} 
                alt="Bicycle" 
                className="max-w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {repair.partsUsed.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Parts Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Part</th>
                      <th className="text-right py-2 px-4">Quantity</th>
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
        <Button variant="outline" onClick={() => router.push(`/bicycles/repairs/${repair.id}/edit`)}>
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
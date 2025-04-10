import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BicycleRepairsPage() {
  const repairs = await prisma.bicycleRepair.findMany({
    include: {
      partsUsed: {
        include: {
          part: true
        }
      }
    },
    orderBy: {
      receivedDate: 'desc'
    }
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bicycle Repairs</h1>
        <Button asChild>
          <Link href="/bicycles/repairs/new">New Repair</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={repairs} />
    </div>
  )
} 
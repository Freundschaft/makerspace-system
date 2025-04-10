import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { RepairDetails } from "./repair-details"
import { BackButton } from "@/components/BackButton"

interface PageProps {
  params: {
    id: string
  }
}

export default async function RepairDetailsPage({ params }: PageProps) {
  const repair = await prisma.bicycleRepair.findUnique({
    where: {
      id: params.id
    },
    include: {
      partsUsed: {
        include: {
          part: true
        }
      }
    }
  })

  if (!repair) {
    notFound()
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-6">
         <BackButton />
         <h1 className="text-2xl font-bold">Repair Details</h1>
      </div>
      
      <RepairDetails repair={repair} />
    </div>
  )
} 
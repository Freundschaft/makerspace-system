import { RepairForm } from "./repair-form"
import { prisma } from "@/lib/prisma"

export default async function NewRepairPage() {
  // Fetch problem types from the database
  const problemTypes = await prisma.problemType.findMany({
    orderBy: {
      label: 'asc'
    }
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">New Bicycle Repair</h1>
      <RepairForm problemTypes={problemTypes} />
    </div>
  )
} 
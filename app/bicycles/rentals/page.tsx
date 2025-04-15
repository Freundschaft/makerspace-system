import { RentalsDataTable } from "@/components/ui/rentals-data-table"
import { columns, Rental } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BicycleRentalsPage() {
  const rentals = await prisma.$queryRaw`
    SELECT * FROM BicycleRental
    ORDER BY startDate DESC
  ` as Rental[]

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">Bicycle Rentals</h1>
        <Button asChild>
          <Link href="/bicycles/rentals/new">New Rental</Link>
        </Button>
      </div>
      <RentalsDataTable columns={columns} data={rentals} />
    </div>
  )
} 
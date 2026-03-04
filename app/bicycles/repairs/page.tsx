import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

const PAGE_SIZE = 20

export default async function BicycleRepairsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const requestedPage = Number(params.page ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  const totalRepairs = await prisma.bicycleRepair.count()
  const totalPages = Math.max(1, Math.ceil(totalRepairs / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const repairs = await prisma.bicycleRepair.findMany({
    include: {
      partsUsed: {
        include: {
          part: true,
        },
      },
    },
    orderBy: {
      receivedDate: "desc",
    },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages
  const previousPageHref = `/bicycles/repairs?page=${currentPage - 1}`
  const nextPageHref = `/bicycles/repairs?page=${currentPage + 1}`

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">Bicycle Repairs</h1>
        <Button asChild>
          <Link href="/bicycles/repairs/new">New Repair</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={repairs} showPagination={false} />
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({totalRepairs} total repairs)
        </p>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" disabled={!hasPreviousPage}>
            <Link
              href={hasPreviousPage ? previousPageHref : "#"}
              aria-disabled={!hasPreviousPage}
              tabIndex={hasPreviousPage ? 0 : -1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" disabled={!hasNextPage}>
            <Link
              href={hasNextPage ? nextPageHref : "#"}
              aria-disabled={!hasNextPage}
              tabIndex={hasNextPage ? 0 : -1}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

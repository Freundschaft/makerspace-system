import { Rental } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { RentalsTable } from "./rentals-table"
import { localizePathname } from "@/lib/i18n/config"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

const PAGE_SIZE = 20

export default async function BicycleRentalsPage({ searchParams }: PageProps) {
  const { locale, t } = await getServerI18n()
  const params = await searchParams
  const requestedPage = Number(params.page ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  const [totalRentals, rentals] = await Promise.all([
    prisma.bicycleRental.count(),
    prisma.bicycleRental.findMany({
      orderBy: {
        startDate: "desc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalRentals / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.rentals.title", "Bicycle Rentals")}</h1>
        <Button asChild>
          <Link href={localizePathname("/bicycles/rentals/new", locale)}>{t("modules.rentals.new", "New Rental")}</Link>
        </Button>
      </div>
      <RentalsTable data={rentals} />
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {t("tables.pagination.page", "Page")} {currentPage} {t("tables.pagination.of", "of")} {totalPages} ({totalRentals} {t("modules.rentals.title", "Bicycle Rentals")})
        </p>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" disabled={currentPage <= 1}>
            <Link
              href={currentPage > 1 ? `${localizePathname("/bicycles/rentals", locale)}?page=${currentPage - 1}` : "#"}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage > 1 ? 0 : -1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("tables.previous", "Previous")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" disabled={currentPage >= totalPages}>
            <Link
              href={currentPage < totalPages ? `${localizePathname("/bicycles/rentals", locale)}?page=${currentPage + 1}` : "#"}
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage < totalPages ? 0 : -1}
            >
              {t("tables.next", "Next")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 

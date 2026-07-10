import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { RentalsTable } from "./rentals-table"
import { localizePathname } from "@/lib/i18n/config"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RentalsPageFilters } from "./rentals-page-filters"
import { Prisma } from "@/generated/prisma"
import { PageJump } from "@/components/ui/page-jump"

interface PageProps {
  searchParams: Promise<{
    page?: string
    q?: string
    status?: string
  }>
}

const PAGE_SIZE = 20

export default async function BicycleRentalsPage({ searchParams }: PageProps) {
  const { locale, t } = await getServerI18n()
  const params = await searchParams
  const requestedPage = Number(params.page ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const searchQuery = params.q?.trim() ?? ""
  const statusFilter =
    params.status === "ACTIVE" ||
    params.status === "RETURNED" ||
    params.status === "OVERDUE" ||
    params.status === "CANCELLED"
      ? params.status
      : "ALL"

  const where: Prisma.BicycleRentalWhereInput = {
    ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
    ...(searchQuery
      ? {
          OR: [
            { renterName: { contains: searchQuery } },
            { renterPhone: { contains: searchQuery } },
            { bicycleId: { contains: searchQuery } },
          ],
        }
      : {}),
  }

  const totalRentals = await prisma.bicycleRental.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalRentals / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const rentals = await prisma.bicycleRental.findMany({
      where,
      select: {
        id: true,
        renterName: true,
        renterPhone: true,
        renterEmail: true,
        bicycleId: true,
        depositAmount: true,
        startDate: true,
        endDate: true,
        actualReturnDate: true,
        status: true,
        notes: true,
      },
      orderBy: {
        startDate: "desc",
      },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    })
  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams()

    if (statusFilter !== "ALL") {
      params.set("status", statusFilter)
    }
    if (searchQuery) {
      params.set("q", searchQuery)
    }
    if (nextPage > 1) {
      params.set("page", String(nextPage))
    }

    const query = params.toString()
    const basePath = localizePathname("/bicycles/rentals", locale)
    return query ? `${basePath}?${query}` : basePath
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.rentals.title", "Bicycle Rentals")}</h1>
        <Button asChild>
          <Link href={localizePathname("/bicycles/rentals/new", locale)}>{t("modules.rentals.new", "New Rental")}</Link>
        </Button>
      </div>
      <RentalsPageFilters
        locale={locale}
        statusFilter={statusFilter}
        searchQuery={searchQuery}
      />
      <RentalsTable data={rentals} locale={locale} />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {totalRentals} {t("modules.rentals.title", "Bicycle Rentals")}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button asChild variant="outline" size="sm" disabled={currentPage <= 1}>
            <Link
              href={currentPage > 1 ? buildPageHref(currentPage - 1) : "#"}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage > 1 ? 0 : -1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("tables.previous", "Previous")}
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{t("tables.pagination.page", "Page")}</span>
            <PageJump
              basePath={localizePathname("/bicycles/rentals", locale)}
              currentPage={currentPage}
              totalPages={totalPages}
              preservedParams={{
                status: statusFilter !== "ALL" ? statusFilter : undefined,
                q: searchQuery || undefined,
              }}
              inputLabel={t("tables.pagination.page", "Page")}
            />
            <span>
              {t("tables.pagination.of", "of")} {totalPages}
            </span>
          </div>
          <Button asChild variant="outline" size="sm" disabled={currentPage >= totalPages}>
            <Link
              href={currentPage < totalPages ? buildPageHref(currentPage + 1) : "#"}
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

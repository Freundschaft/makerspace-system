import { RepairsTable } from "./repairs-table"
import type { Repair } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getServerI18n } from "@/lib/i18n/server"
import { localizePathname } from "@/lib/i18n/config"
import { PageJump } from "@/components/ui/page-jump"

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

const PAGE_SIZE = 20

export default async function BicycleRepairsPage({ searchParams }: PageProps) {
  const { locale, t } = await getServerI18n()
  const params = await searchParams
  const requestedPage = Number(params.page ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  const [totalRepairs, repairsResult] = await Promise.all([
    prisma.bicycleRepair.count(),
    prisma.bicycleRepair.findMany({
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
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])
  const totalPages = Math.max(1, Math.ceil(totalRepairs / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const repairs: Repair[] = repairsResult.map((repair) => ({
    id: repair.id,
    problemTypes: repair.problemTypes,
    description: repair.description,
    receivedDate: repair.receivedDate,
    repairedDate: repair.repairedDate,
    pickupDate: repair.pickupDate,
    ownerName: repair.ownerName ?? "",
    ownerIdCardNumber: repair.ownerIdCardNumber ?? "",
    ownerPhone: repair.ownerPhone,
    status: repair.status,
    photoPath: repair.photoPath,
    partsUsed: repair.partsUsed,
  }))

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages
  const previousPageHref = `${localizePathname("/bicycles/repairs", locale)}?page=${currentPage - 1}`
  const nextPageHref = `${localizePathname("/bicycles/repairs", locale)}?page=${currentPage + 1}`

  return (
    <div className="container mx-auto px-4 py-2 sm:px-6 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.repairs.title", "Bicycle Repairs")}</h1>
        <Button asChild>
          <Link href={localizePathname("/bicycles/repairs/new", locale)}>{t("modules.repairs.new", "New Repair")}</Link>
        </Button>
      </div>
      <RepairsTable data={repairs} />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {totalRepairs} {t("modules.repairs.total", "total repairs")}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button asChild variant="outline" size="sm" disabled={!hasPreviousPage}>
            <Link
              href={hasPreviousPage ? previousPageHref : "#"}
              aria-disabled={!hasPreviousPage}
              tabIndex={hasPreviousPage ? 0 : -1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("tables.previous", "Previous")}
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{t("tables.pagination.page", "Page")}</span>
            <PageJump
              basePath={localizePathname("/bicycles/repairs", locale)}
              currentPage={currentPage}
              totalPages={totalPages}
              inputLabel={t("tables.pagination.page", "Page")}
            />
            <span>
              {t("tables.pagination.of", "of")} {totalPages}
            </span>
          </div>
          <Button asChild variant="outline" size="sm" disabled={!hasNextPage}>
            <Link
              href={hasNextPage ? nextPageHref : "#"}
              aria-disabled={!hasNextPage}
              tabIndex={hasNextPage ? 0 : -1}
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

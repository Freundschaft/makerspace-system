import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getServerI18n } from "@/lib/i18n/server"
import { RepairsTable } from "./repairs-table"
import type { ElectronicsRepair } from "./columns"
import { localizePathname } from "@/lib/i18n/config"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RepairsPageFilters } from "./repairs-page-filters"
import { ElectronicsRepairStatus, Prisma } from "@/generated/prisma"
import { PageJump } from "@/components/ui/page-jump"

interface PageProps {
  searchParams: Promise<{
    page?: string
    q?: string
    status?: string
  }>
}

const PAGE_SIZE = 20

export default async function ElectronicsRepairsPage({ searchParams }: PageProps) {
  const { locale, t } = await getServerI18n()
  const params = await searchParams
  const requestedPage = Number(params.page ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const searchQuery = params.q?.trim() ?? ""
  const statusFilter =
    params.status === ElectronicsRepairStatus.UNCHECKED ||
    params.status === ElectronicsRepairStatus.CHECKED ||
    params.status === ElectronicsRepairStatus.IN_PROGRESS ||
    params.status === ElectronicsRepairStatus.READY_FOR_PICKUP ||
    params.status === ElectronicsRepairStatus.DONE ||
    params.status === ElectronicsRepairStatus.PICKED_UP ||
    params.status === ElectronicsRepairStatus.NO_WAY_TO_FIX
      ? params.status
      : "ALL"

  const where: Prisma.ElectronicsRepairWhereInput = {
    ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
    ...(searchQuery
      ? {
          OR: [
            { customerName: { contains: searchQuery } },
            { customerIdCardNumber: { contains: searchQuery } },
            { item: { contains: searchQuery } },
            { whatsapp: { contains: searchQuery } },
          ],
        }
      : {}),
  }

  const totalRepairs = await prisma.electronicsRepair.count({ where })
  const totalPages = Math.max(1, Math.ceil(totalRepairs / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const repairsResult = await prisma.electronicsRepair.findMany({
      where,
      select: {
        id: true,
        repairId: true,
        customerName: true,
        customerIdCardNumber: true,
        category: true,
        item: true,
        whatsapp: true,
        serialNumber: true,
        status: true,
        repairable: true,
        notes: true,
        photoPath: true,
        createdDate: true,
        repairer: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdDate: 'desc'
      },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    })

  const repairs: ElectronicsRepair[] = repairsResult.map((repair) => ({
    id: repair.id,
    repairId: repair.repairId,
    customerName: repair.customerName,
    customerIdCardNumber: repair.customerIdCardNumber ?? "",
    category: repair.category,
    item: repair.item,
    whatsapp: repair.whatsapp,
    serialNumber: repair.serialNumber,
    status: repair.status,
    repairable: repair.repairable,
    notes: repair.notes,
    photoPath: repair.photoPath,
    createdDate: repair.createdDate,
    repairer: repair.repairer,
  }))
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
    const basePath = localizePathname("/electronics/repairs", locale)
    return query ? `${basePath}?${query}` : basePath
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">{t("modules.electronics.title", "Electronics Repairs")}</h1>
        <Button asChild>
          <Link href={localizePathname("/electronics/repairs/new", locale)}>{t("modules.electronics.new", "New Repair")}</Link>
        </Button>
      </div>
      <RepairsPageFilters
        locale={locale}
        statusFilter={statusFilter}
        searchQuery={searchQuery}
      />
      <RepairsTable data={repairs} locale={locale} />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {totalRepairs} {t("modules.electronics.title", "Electronics Repairs")}
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
              basePath={localizePathname("/electronics/repairs", locale)}
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

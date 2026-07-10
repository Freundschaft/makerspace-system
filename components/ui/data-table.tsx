"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Cell,
  Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Image from "next/image"
import { useI18n } from "@/app/components/I18nProvider"
import { LayoutGrid, Search, Table2, X } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showPagination?: boolean
  searchPlaceholder?: string
  enableSearch?: boolean
  enableViewToggle?: boolean
}

function formatDisplayText(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination = true,
  searchPlaceholder,
  enableSearch = true,
  enableViewToggle = true,
}: DataTableProps<TData, TValue>) {
  const { t } = useI18n()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const filteredData = useMemo(() => {
    const query = enableSearch ? searchQuery.trim().toLowerCase() : ""
    if (!query) {
      return data
    }

    const collectText = (value: unknown): string => {
      if (value === null || value === undefined) {
        return ""
      }
      if (value instanceof Date) {
        return value.toISOString()
      }
      if (typeof value === "object") {
        return Object.values(value as Record<string, unknown>).map(collectText).join(" ")
      }
      return String(value)
    }

    return data.filter((row) => collectText(row).toLowerCase().includes(query))
  }, [data, enableSearch, searchQuery])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    const handleChange = () => {
      setIsDesktop(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: showPagination ? 10 : Math.max(filteredData.length, 1),
      },
    },
  })

  useEffect(() => {
    table.setPageIndex(0)
  }, [searchQuery, table])

  // Check if problemTypes column exists
  const hasProblemTypesColumn = columns.some(
    (col) => "accessorKey" in col && col.accessorKey === "problemTypes"
  )

  // Function to render a card for mobile view
  const renderMobileCard = (row: Row<TData>) => {
    const cells = row.getVisibleCells()
    
    // Find the status cell to get the status value
    const statusCell = cells.find((cell) => cell.column.id === "status")
    const status = statusCell ? statusCell.getValue() : null
    
    // Find the photoPath cell
    const photoPathCell = cells.find((cell) => cell.column.id === "photoPath")
    const photoPathValue = photoPathCell ? photoPathCell.getValue() : null
    const photoPath = typeof photoPathValue === "string" ? photoPathValue : null
    const receivedDate = cells.find((cell) => cell.column.id === "receivedDate")?.getValue()
    
    return (
      <Card key={row.id} className="mb-4 overflow-hidden rounded-[1.75rem] border-border/80 bg-card/90 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">
              {status ? (
                <Badge variant={
                  status === 'COMPLETED' ? 'default' :
                  status === 'IN_PROGRESS' ? 'default' :
                  status === 'WAITING_FOR_PARTS' ? 'secondary' :
                  status === 'PICKED_UP' ? 'secondary' :
                  status === 'CANCELLED' ? 'destructive' :
                  'outline'
                } className="rounded-full px-3 py-1 text-[11px] tracking-[0.12em]">
                  {formatDisplayText(String(status))}
                </Badge>
              ) : null}
            </CardTitle>
            <div className="text-sm font-medium text-muted-foreground">
              {receivedDate ?
                format(new Date(receivedDate as string | number | Date), "MMM d, yyyy") :
                null}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {photoPath && (
            <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted/40">
              <Image 
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`} 
                alt={t("common.photo", "Photo")}
                fill 
                unoptimized 
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-3">
            {cells.map((cell: Cell<TData, unknown>) => {
              // Skip status, receivedDate, and photoPath as they're already handled
              if (cell.column.id === "status" || cell.column.id === "receivedDate" || cell.column.id === "photoPath") {
                return null
              }

              // Special handling for problem types
              if (cell.column.id === "problemTypes") {
                const problemTypes = JSON.parse(cell.getValue() as string)
                return (
                  <div key={cell.id} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {t("modules.repairs.problemTypes", "Problem Types")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                    {problemTypes.map((type: string) => (
                      <Badge key={type} variant="outline" className="rounded-full border-border/70 bg-background px-3 py-1 text-[11px]">
                        {formatDisplayText(type)}
                      </Badge>
                    ))}
                    </div>
                  </div>
                )
              }

              // Skip empty values
              if (!cell.getValue()) {
                return null
              }

              // Special handling for date columns (createdDate, repairedDate, pickupDate, etc.)
              const value = cell.getValue()
              let displayValue: string

              if (value instanceof Date || cell.column.id.toLowerCase().includes('date')) {
                try {
                  displayValue = format(new Date(value as string | number | Date), "MMM d, yyyy")
                } catch {
                  displayValue = String(value)
                }
              } else {
                displayValue =
                  typeof value === "string" && /^[A-Z0-9_]+$/.test(value)
                    ? formatDisplayText(value)
                    : String(value)
              }

              return (
                <div key={cell.id} className="grid gap-1 rounded-2xl border border-border/60 bg-background/70 px-3 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {String(cell.column.columnDef.header)}
                  </span>
                  <span className="text-sm font-medium text-foreground">{displayValue}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {enableSearch || enableViewToggle ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {enableSearch ? (
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder ?? t("tables.search", "Search...")}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-9 pl-9 pr-9"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label={t("common.clear", "Clear")}
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          ) : null}
          {enableViewToggle ? (
            <div className="inline-flex w-fit rounded-lg border bg-muted/30 p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <Table2 className="mr-2 h-4 w-4" />
                {t("team.view.table", "Table")}
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                {t("team.view.cards", "Cards")}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      {hasProblemTypesColumn && (
        <div className="flex items-center py-4">
          <Input
            placeholder={t("tables.filters.problemType", "Filter by problem type...")}
            value={(table.getColumn("problemTypes")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("problemTypes")?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-md"
          />
        </div>
      )}
      
      {isDesktop === null ? null : isDesktop && viewMode === "table" ? (
        <div className="rounded-2xl border bg-card/70 shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t("tables.noResults", "No results.")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => renderMobileCard(row))
          ) : (
            <div className="py-8 text-center">{t("tables.noResults", "No results.")}</div>
          )}
        </div>
      )}
      
      {showPagination && (
        <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-end sm:space-x-2 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("tables.previous", "Previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("tables.next", "Next")}
          </Button>
        </div>
      )}
    </div>
  )
}

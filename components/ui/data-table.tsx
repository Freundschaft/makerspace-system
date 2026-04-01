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
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Image from "next/image"
import { useI18n } from "@/app/components/I18nProvider"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  showPagination?: boolean
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
}: DataTableProps<TData, TValue>) {
  const { t } = useI18n()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
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
        pageSize: showPagination ? 10 : Math.max(data.length, 1),
      },
    },
  })

  // Check if problemTypes column exists
  const hasProblemTypesColumn = columns.some(
    (col: any) => col.accessorKey === "problemTypes"
  )

  // Function to render a card for mobile view
  const renderMobileCard = (row: any) => {
    const cells = row.getVisibleCells()
    
    // Find the status cell to get the status value
    const statusCell = cells.find((cell: any) => cell.column.id === "status")
    const status = statusCell ? statusCell.getValue() : null
    
    // Find the photoPath cell
    const photoPathCell = cells.find((cell: any) => cell.column.id === "photoPath")
    const photoPath = photoPathCell ? photoPathCell.getValue() : null
    
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
              {cells.find((cell: any) => cell.column.id === "receivedDate")?.getValue() ? 
                format(new Date(cells.find((cell: any) => cell.column.id === "receivedDate")?.getValue()), "MMM d, yyyy") : 
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
            {cells.map((cell: any) => {
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
                  displayValue = format(new Date(value), "MMM d, yyyy")
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
    <div>
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
      
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => renderMobileCard(row))
        ) : (
          <div className="text-center py-8">{t("tables.noResults", "No results.")}</div>
        )}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-2xl border bg-card/70 shadow-sm">
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

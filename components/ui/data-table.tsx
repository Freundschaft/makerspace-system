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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
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
  })

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
      <Card key={row.id} className="mb-4">
        <CardHeader className="pb-2">
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
                }>
                  {status.replace('_', ' ')}
                </Badge>
              ) : null}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {cells.find((cell: any) => cell.column.id === "receivedDate")?.getValue() ? 
                format(new Date(cells.find((cell: any) => cell.column.id === "receivedDate")?.getValue()), "MMM d, yyyy") : 
                null}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {photoPath && (
            <div className="mb-4 relative w-full h-48 rounded-md overflow-hidden">
              <Image 
                src={`/api/files/${photoPath}`} 
                alt="Bicycle repair" 
                fill 
                unoptimized 
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            {cells.map((cell: any) => {
              // Skip status, receivedDate, and photoPath as they're already handled
              if (cell.column.id === "status" || cell.column.id === "receivedDate" || cell.column.id === "photoPath") {
                return null
              }
              
              // Special handling for problem types
              if (cell.column.id === "problemTypes") {
                return (
                  <div key={cell.id} className="flex flex-wrap gap-1">
                    {JSON.parse(cell.getValue() as string).map((type: string) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                )
              }
              
              // Skip empty values
              if (!cell.getValue()) {
                return null
              }
              
              return (
                <div key={cell.id} className="flex justify-between">
                  <span className="font-medium">{cell.column.columnDef.header as string}:</span>
                  <span>{cell.getValue() as string}</span>
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by problem type..."
          value={(table.getColumn("problemTypes")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("problemTypes")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
      </div>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => renderMobileCard(row))
        ) : (
          <div className="text-center py-8">No results.</div>
        )}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden sm:block rounded-md border overflow-x-auto">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 
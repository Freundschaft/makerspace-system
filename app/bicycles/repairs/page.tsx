"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Repair } from "./columns"

export default function BicycleRepairsPage() {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await fetch('/api/bicycles/repairs')
        if (!response.ok) {
          throw new Error('Failed to fetch repairs')
        }
        const data = await response.json()
        setRepairs(data)
      } catch (error) {
        console.error('Error fetching repairs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepairs()
  }, [])

  const handleDataChange = (newData: Repair[]) => {
    setRepairs(newData)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading repairs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">Bicycle Repairs</h1>
        <Button asChild>
          <Link href="/bicycles/repairs/new">New Repair</Link>
        </Button>
      </div>
      <DataTable 
        columns={columns} 
        data={repairs} 
        onDataChange={handleDataChange}
      />
    </div>
  )
} 
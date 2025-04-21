"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const problemTypeLabels: Record<string, string> = {
  FLAT_TIRE: "Flat Tire",
  BRAKE_ISSUES: "Brake Issues",
  CHAIN_ISSUES: "Chain Issues",
  GEAR_ISSUES: "Gear Issues",
  WHEEL_ALIGNMENT: "Wheel Alignment",
  FRAME_DAMAGE: "Frame Damage",
  SADDLE_ISSUES: "Saddle Issues",
  HANDLEBAR_ISSUES: "Handlebar Issues",
  PEDAL_ISSUES: "Pedal Issues",
  OTHER: "Other",
}

export type Repair = {
  id: string
  problemTypes: string
  description: string
  receivedDate: Date
  repairedDate: Date | null
  pickupDate: Date | null
  ownerPhone: string
  status: 'PENDING' | 'IN_PROGRESS' | 'WAITING_FOR_PARTS' | 'COMPLETED' | 'PICKED_UP' | 'CANCELLED'
  photoPath: string | null
  partsUsed: {
    part: {
      name: string
    }
    quantity: number
  }[]
}

// Editable cell component
const EditableCell = ({ 
  value, 
  onSave, 
  type = "text",
  options = []
}: { 
  value: any, 
  onSave: (value: any) => void,
  type?: "text" | "select" | "date",
  options?: { label: string, value: string }[]
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  // Format the display value based on type
  const getDisplayValue = () => {
    if (type === "date") {
      if (!value) return "-"
      try {
        return format(new Date(value), "PPP")
      } catch (error) {
        console.error("Error formatting date:", error)
        return "-"
      }
    }
    
    if (type === "select") {
      const option = options.find(opt => opt.value === value)
      return option ? option.label : value
    }
    
    return value
  }

  if (!isEditing) {
    return (
      <div 
        className="cursor-pointer hover:bg-muted/50 p-1 rounded"
        onClick={() => setIsEditing(true)}
      >
        {getDisplayValue()}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {type === "text" && (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-8"
          autoFocus
        />
      )}
      {type === "select" && (
        <Select
          value={editValue}
          onValueChange={setEditValue}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {type === "date" && (
        <Input
          type="date"
          value={editValue ? format(new Date(editValue), "yyyy-MM-dd") : ""}
          onChange={(e) => {
            const dateValue = e.target.value;
            if (dateValue) {
              // Create a new date object from the input value
              const newDate = new Date(dateValue);
              setEditValue(newDate);
            } else {
              setEditValue(null);
            }
          }}
          className="h-8"
          autoFocus
        />
      )}
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSave}>
        <Check className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const columns: ColumnDef<Repair>[] = [
  {
    accessorKey: "photoPath",
    header: "Photo",
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {photoPath ? (
            <div className="w-10 h-10 relative rounded-md overflow-hidden">
              <img 
                src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL || 'https://files.system.makerspace-lesvos.org'}${photoPath}`} 
                alt="Bicycle repair" 
                className="object-cover w-full h-full"
              />
            </div>
          ) : null}
        </Link>
      )
    },
  },
  {
    accessorKey: "problemTypes",
    header: "Problem Types",
    cell: ({ row }) => {
      const types = JSON.parse(row.getValue("problemTypes") as string) as string[]
      const id = row.original.id
      return (
        <div className="flex flex-wrap gap-1">
          {types.map((type) => (
            <Badge key={type} variant="outline">
              {problemTypeLabels[type] || type}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "ownerPhone",
    header: "Owner Phone",
    cell: ({ row }) => {
      const value = row.getValue("ownerPhone") as string
      const id = row.original.id
      
      const handleSave = async (newValue: string) => {
        try {
          const response = await fetch(`/api/bicycles/repairs/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ownerPhone: newValue }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update')
          }
          
          // Update the row data
          row.original.ownerPhone = newValue
        } catch (error) {
          console.error('Error updating owner phone:', error)
        }
      }
      
      return (
        <EditableCell 
          value={value} 
          onSave={handleSave} 
        />
      )
    },
  },
  {
    accessorKey: "receivedDate",
    header: "Received",
    cell: ({ row }) => {
      const date = row.getValue("receivedDate") as Date
      const id = row.original.id
      
      const handleSave = async (newValue: Date) => {
        try {
          const response = await fetch(`/api/bicycles/repairs/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receivedDate: newValue }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update')
          }
          
          // Update the row data
          row.original.receivedDate = newValue
        } catch (error) {
          console.error('Error updating received date:', error)
        }
      }
      
      return (
        <EditableCell 
          value={date} 
          onSave={handleSave}
          type="date"
        />
      )
    },
  },
  {
    accessorKey: "repairedDate",
    header: "Repaired",
    cell: ({ row }) => {
      const date = row.getValue("repairedDate") as Date | null
      const id = row.original.id
      
      const handleSave = async (newValue: Date | null) => {
        try {
          const response = await fetch(`/api/bicycles/repairs/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repairedDate: newValue }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update')
          }
          
          // Update the row data
          row.original.repairedDate = newValue
        } catch (error) {
          console.error('Error updating repaired date:', error)
        }
      }
      
      return (
        <EditableCell 
          value={date} 
          onSave={handleSave}
          type="date"
        />
      )
    },
  },
  {
    accessorKey: "pickupDate",
    header: "Picked Up",
    cell: ({ row }) => {
      const date = row.getValue("pickupDate") as Date | null
      const id = row.original.id
      
      const handleSave = async (newValue: Date | null) => {
        try {
          const response = await fetch(`/api/bicycles/repairs/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pickupDate: newValue }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update')
          }
          
          // Update the row data
          row.original.pickupDate = newValue
        } catch (error) {
          console.error('Error updating pickup date:', error)
        }
      }
      
      return (
        <EditableCell 
          value={date} 
          onSave={handleSave}
          type="date"
        />
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const id = row.original.id
      
      const statusOptions = [
        { label: 'Pending', value: 'PENDING' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Waiting For Parts', value: 'WAITING_FOR_PARTS' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Picked Up', value: 'PICKED_UP' },
        { label: 'Cancelled', value: 'CANCELLED' },
      ]
      
      const handleSave = async (newValue: string) => {
        try {
          const response = await fetch(`/api/bicycles/repairs/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newValue }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to update')
          }
          
          // Update the row data
          row.original.status = newValue as any
        } catch (error) {
          console.error('Error updating status:', error)
        }
      }
      
      return (
        <EditableCell 
          value={status} 
          onSave={handleSave}
          type="select"
          options={statusOptions}
        />
      )
    },
  },
  {
    accessorKey: "partsUsed",
    header: "Parts Used",
    cell: ({ row }) => {
      const parts = row.getValue("partsUsed") as Repair['partsUsed']
      const id = row.original.id
      return (
        <Link href={`/bicycles/repairs/${id}`} className="block">
          {parts.map(p => `${p.part.name} (${p.quantity})`).join(", ") || "-"}
        </Link>
      )
    },
  },
] 
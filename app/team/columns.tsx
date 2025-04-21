"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

export type TeamMember = {
  id: string
  familyName: string
  givenNames: string
  nationality: string
  photoPath: string | null
  status: "ACTIVE" | "INACTIVE"
  startDate: Date
  endDate: Date | null
  department: string
  email: string
  phone: string
  homeAddress: string
  dateOfBirth: Date
  legalStatus: string
}

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "photoPath",
    header: "Photo",
    cell: ({ row }) => {
      const photoPath = row.getValue("photoPath") as string | null
      const name = `${row.original.givenNames} ${row.original.familyName}`
      return (
        <Avatar>
          <AvatarImage 
            src={photoPath ? `data:image/jpeg;base64,${photoPath}` : undefined} 
            alt={name} 
          />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "familyName",
    header: "Family Name",
  },
  {
    accessorKey: "givenNames",
    header: "Given Names",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date
      return format(new Date(date), "PPP")
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date | null
      return date ? format(new Date(date), "PPP") : "-"
    },
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "homeAddress",
    header: "Home Address",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const date = row.getValue("dateOfBirth") as Date
      return format(new Date(date), "PPP")
    },
  },
  {
    accessorKey: "legalStatus",
    header: "Legal Status",
  },
] 
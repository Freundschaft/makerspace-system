import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TeamMember } from "@/generated/prisma"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TeamMemberDataTableProps {
  data: TeamMember[]
  onEdit: (member: TeamMember) => void
  onDelete: (member: TeamMember) => void
}

export function TeamMemberDataTable({
  data,
  onEdit,
  onDelete,
}: TeamMemberDataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={member.photoPath || undefined} />
                  <AvatarFallback>
                    {member.givenNames[0]}
                    {member.familyName[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                {member.givenNames} {member.familyName}
              </TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(member.startDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(member)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(member)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 
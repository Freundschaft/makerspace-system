import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CarpentryProjectsPage() {
  const projects = await prisma.carpentryProject.findMany({
    include: {
      assignedTo: true
    },
    orderBy: {
      date: 'desc'
    }
  })

  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold">Carpentry Projects</h1>
        <Button asChild>
          <Link href="/carpentry/projects/new">New Project</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  )
}

import { ProjectsTable } from "./projects-table";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerI18n } from "@/lib/i18n/server";

export default async function HouseProjectsPage() {
  const { t } = await getServerI18n();
  const projects = await prisma.houseProject.findMany({
    include: {
      assignedTo: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-2xl font-bold">
          {t("modules.houseProjects.title", "House Projects")}
        </h1>
        <Button asChild>
          <Link href="/house-projects/new">
            {t("modules.houseProjects.new", "New House Project")}
          </Link>
        </Button>
      </div>
      <ProjectsTable data={projects} />
    </div>
  );
}

import { startOfMonth, startOfWeek, startOfYear } from "date-fns";

import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export type ReportPeriod = "weekly" | "monthly" | "yearly" | "all-time";

export type ReportCounts = {
  teamMembersCount: number;
  bicycleRepairsCount: number;
  bicycleRentalsCount: number;
  electronicsRepairsCount: number;
  carpentryProjectsCount: number;
  houseProjectsCount: number;
  projectsCount: number;
  jobsCount: number;
};

export function parseReportPeriod(period: string | null | undefined): ReportPeriod {
  switch (period) {
    case "weekly":
    case "monthly":
    case "yearly":
    case "all-time":
      return period;
    default:
      return "monthly";
  }
}

export async function getReportCountsByPeriod(
  now: Date = new Date()
): Promise<Record<ReportPeriod, ReportCounts>> {
  const monthStart = startOfMonth(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const yearStart = startOfYear(now);

  const monthTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: monthStart } };
  const weekTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: weekStart } };
  const yearTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: yearStart } };
  const monthBikeRepairWhere: Prisma.BicycleRepairWhereInput = {
    receivedDate: { gte: monthStart },
  };
  const weekBikeRepairWhere: Prisma.BicycleRepairWhereInput = { receivedDate: { gte: weekStart } };
  const yearBikeRepairWhere: Prisma.BicycleRepairWhereInput = { receivedDate: { gte: yearStart } };
  const monthRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: monthStart } };
  const weekRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: weekStart } };
  const yearRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: yearStart } };
  const monthElectronicsWhere: Prisma.ElectronicsRepairWhereInput = {
    createdDate: { gte: monthStart },
  };
  const weekElectronicsWhere: Prisma.ElectronicsRepairWhereInput = {
    createdDate: { gte: weekStart },
  };
  const yearElectronicsWhere: Prisma.ElectronicsRepairWhereInput = {
    createdDate: { gte: yearStart },
  };
  const monthCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: monthStart } };
  const weekCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: weekStart } };
  const yearCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: yearStart } };
  const monthHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: monthStart } };
  const weekHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: weekStart } };
  const yearHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: yearStart } };
  const monthProjectWhere: Prisma.ProjectWhereInput = { createdAt: { gte: monthStart } };
  const weekProjectWhere: Prisma.ProjectWhereInput = { createdAt: { gte: weekStart } };
  const yearProjectWhere: Prisma.ProjectWhereInput = { createdAt: { gte: yearStart } };
  const monthJobWhere: Prisma.JobWhereInput = { createdAt: { gte: monthStart } };
  const weekJobWhere: Prisma.JobWhereInput = { createdAt: { gte: weekStart } };
  const yearJobWhere: Prisma.JobWhereInput = { createdAt: { gte: yearStart } };

  const [
    allTeamMembersCount,
    allBicycleRepairsCount,
    allBicycleRentalsCount,
    allElectronicsRepairsCount,
    allCarpentryProjectsCount,
    allHouseProjectsCount,
    allProjectsCount,
    allJobsCount,
    monthTeamMembersCount,
    monthBicycleRepairsCount,
    monthBicycleRentalsCount,
    monthElectronicsRepairsCount,
    monthCarpentryProjectsCount,
    monthHouseProjectsCount,
    monthProjectsCount,
    monthJobsCount,
    weekTeamMembersCount,
    weekBicycleRepairsCount,
    weekBicycleRentalsCount,
    weekElectronicsRepairsCount,
    weekCarpentryProjectsCount,
    weekHouseProjectsCount,
    weekProjectsCount,
    weekJobsCount,
    yearTeamMembersCount,
    yearBicycleRepairsCount,
    yearBicycleRentalsCount,
    yearElectronicsRepairsCount,
    yearCarpentryProjectsCount,
    yearHouseProjectsCount,
    yearProjectsCount,
    yearJobsCount,
  ] = await Promise.all([
    prisma.teamMember.count(),
    prisma.bicycleRepair.count(),
    prisma.bicycleRental.count(),
    prisma.electronicsRepair.count(),
    prisma.carpentryProject.count(),
    prisma.houseProject.count(),
    prisma.project.count(),
    prisma.job.count(),
    prisma.teamMember.count({ where: monthTeamWhere }),
    prisma.bicycleRepair.count({ where: monthBikeRepairWhere }),
    prisma.bicycleRental.count({ where: monthRentalWhere }),
    prisma.electronicsRepair.count({ where: monthElectronicsWhere }),
    prisma.carpentryProject.count({ where: monthCarpentryWhere }),
    prisma.houseProject.count({ where: monthHouseWhere }),
    prisma.project.count({ where: monthProjectWhere }),
    prisma.job.count({ where: monthJobWhere }),
    prisma.teamMember.count({ where: weekTeamWhere }),
    prisma.bicycleRepair.count({ where: weekBikeRepairWhere }),
    prisma.bicycleRental.count({ where: weekRentalWhere }),
    prisma.electronicsRepair.count({ where: weekElectronicsWhere }),
    prisma.carpentryProject.count({ where: weekCarpentryWhere }),
    prisma.houseProject.count({ where: weekHouseWhere }),
    prisma.project.count({ where: weekProjectWhere }),
    prisma.job.count({ where: weekJobWhere }),
    prisma.teamMember.count({ where: yearTeamWhere }),
    prisma.bicycleRepair.count({ where: yearBikeRepairWhere }),
    prisma.bicycleRental.count({ where: yearRentalWhere }),
    prisma.electronicsRepair.count({ where: yearElectronicsWhere }),
    prisma.carpentryProject.count({ where: yearCarpentryWhere }),
    prisma.houseProject.count({ where: yearHouseWhere }),
    prisma.project.count({ where: yearProjectWhere }),
    prisma.job.count({ where: yearJobWhere }),
  ]);

  return {
    "all-time": {
      teamMembersCount: allTeamMembersCount,
      bicycleRepairsCount: allBicycleRepairsCount,
      bicycleRentalsCount: allBicycleRentalsCount,
      electronicsRepairsCount: allElectronicsRepairsCount,
      carpentryProjectsCount: allCarpentryProjectsCount,
      houseProjectsCount: allHouseProjectsCount,
      projectsCount: allProjectsCount,
      jobsCount: allJobsCount,
    },
    monthly: {
      teamMembersCount: monthTeamMembersCount,
      bicycleRepairsCount: monthBicycleRepairsCount,
      bicycleRentalsCount: monthBicycleRentalsCount,
      electronicsRepairsCount: monthElectronicsRepairsCount,
      carpentryProjectsCount: monthCarpentryProjectsCount,
      houseProjectsCount: monthHouseProjectsCount,
      projectsCount: monthProjectsCount,
      jobsCount: monthJobsCount,
    },
    weekly: {
      teamMembersCount: weekTeamMembersCount,
      bicycleRepairsCount: weekBicycleRepairsCount,
      bicycleRentalsCount: weekBicycleRentalsCount,
      electronicsRepairsCount: weekElectronicsRepairsCount,
      carpentryProjectsCount: weekCarpentryProjectsCount,
      houseProjectsCount: weekHouseProjectsCount,
      projectsCount: weekProjectsCount,
      jobsCount: weekJobsCount,
    },
    yearly: {
      teamMembersCount: yearTeamMembersCount,
      bicycleRepairsCount: yearBicycleRepairsCount,
      bicycleRentalsCount: yearBicycleRentalsCount,
      electronicsRepairsCount: yearElectronicsRepairsCount,
      carpentryProjectsCount: yearCarpentryProjectsCount,
      houseProjectsCount: yearHouseProjectsCount,
      projectsCount: yearProjectsCount,
      jobsCount: yearJobsCount,
    },
  };
}

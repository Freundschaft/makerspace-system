import { getServerSession } from "next-auth";
import {
  Activity,
  Bike,
  CalendarClock,
  ClipboardList,
  Hammer,
  House,
  Settings,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { startOfMonth, startOfWeek, startOfYear } from "date-fns";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth-options";
import { localizePathname } from "@/lib/i18n/config";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { UserRole, type Prisma } from "@/generated/prisma";

type MetricStat = {
  label: string;
  value: number;
  href: string;
  icon: LucideIcon;
};

type ReportPeriod = "weekly" | "monthly" | "yearly" | "all-time";

function buildStats(
  t: (key: string, fallback: string) => string,
  isAdmin: boolean,
  counts: {
    teamMembersCount?: number;
    bicycleRepairsCount: number;
    bicycleRentalsCount: number;
    electronicsRepairsCount: number;
    carpentryProjectsCount: number;
    houseProjectsCount: number;
  }
): MetricStat[] {
  return [
    ...(isAdmin && counts.teamMembersCount !== undefined
      ? [
          {
            label: t("dashboard.stats.teamMembers", "Team Members"),
            value: counts.teamMembersCount,
            href: "/team",
            icon: Users,
          },
        ]
      : []),
    {
      label: t("dashboard.stats.bicycles", "Bicycles"),
      value: counts.bicycleRepairsCount,
      href: "/bicycles/repairs",
      icon: Bike,
    },
    {
      label: t("dashboard.stats.rentals", "Rentals"),
      value: counts.bicycleRentalsCount,
      href: "/bicycles/rentals",
      icon: ClipboardList,
    },
    {
      label: t("dashboard.stats.electronics", "Electronics"),
      value: counts.electronicsRepairsCount,
      href: "/electronics/repairs",
      icon: Smartphone,
    },
    {
      label: t("dashboard.stats.carpentry", "Carpentry"),
      value: counts.carpentryProjectsCount,
      href: "/carpentry/projects",
      icon: Hammer,
    },
    {
      label: t("dashboard.stats.houseProjects", "House Projects"),
      value: counts.houseProjectsCount,
      href: "/house-projects",
      icon: House,
    },
  ];
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: Promise<{ period?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { t, locale } = await getServerI18n();
  const resolvedSearchParams = (await searchParams) ?? {};
  const now = new Date();
  const today = now.toLocaleDateString();
  const isAdmin = session?.user?.role === UserRole.ADMIN;
  const periodOptions: Array<{
    value: ReportPeriod;
    label: string;
    title: string;
    description: string;
  }> = [
    {
      value: "weekly",
      label: t("reports.periods.weekly", "Weekly"),
      title: t("reports.periods.thisWeek", "This Week"),
      description: t(
        "reports.periods.thisWeekDescription",
        "Records created or received since the start of the current week."
      ),
    },
    {
      value: "monthly",
      label: t("reports.periods.monthly", "Monthly"),
      title: t("reports.periods.thisMonth", "This Month"),
      description: t(
        "reports.periods.thisMonthDescription",
        "Records created or received since the start of the current month."
      ),
    },
    {
      value: "yearly",
      label: t("reports.periods.yearly", "Yearly"),
      title: t("reports.periods.thisYear", "This Year"),
      description: t(
        "reports.periods.thisYearDescription",
        "Records created or received since the start of the current year."
      ),
    },
    {
      value: "all-time",
      label: t("reports.periods.allTimeShort", "All Time"),
      title: t("reports.periods.allTime", "All-Time"),
      description: t(
        "reports.periods.allTimeDescription",
        "Cumulative totals across the full system history."
      ),
    },
  ];
  const selectedPeriod = periodOptions.some(
    (option) => option.value === resolvedSearchParams.period
  )
    ? (resolvedSearchParams.period as ReportPeriod)
    : "monthly";
  const selectedPeriodOption =
    periodOptions.find((option) => option.value === selectedPeriod) ?? periodOptions[1];
  const reportsBasePath = localizePathname("/reports", locale);

  const monthStart = startOfMonth(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const yearStart = startOfYear(now);

  const monthTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: monthStart } };
  const weekTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: weekStart } };
  const yearTeamWhere: Prisma.TeamMemberWhereInput = { startDate: { gte: yearStart } };
  const monthBikeRepairWhere: Prisma.BicycleRepairWhereInput = { receivedDate: { gte: monthStart } };
  const weekBikeRepairWhere: Prisma.BicycleRepairWhereInput = { receivedDate: { gte: weekStart } };
  const yearBikeRepairWhere: Prisma.BicycleRepairWhereInput = { receivedDate: { gte: yearStart } };
  const monthRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: monthStart } };
  const weekRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: weekStart } };
  const yearRentalWhere: Prisma.BicycleRentalWhereInput = { startDate: { gte: yearStart } };
  const monthElectronicsWhere: Prisma.ElectronicsRepairWhereInput = { createdDate: { gte: monthStart } };
  const weekElectronicsWhere: Prisma.ElectronicsRepairWhereInput = { createdDate: { gte: weekStart } };
  const yearElectronicsWhere: Prisma.ElectronicsRepairWhereInput = { createdDate: { gte: yearStart } };
  const monthCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: monthStart } };
  const weekCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: weekStart } };
  const yearCarpentryWhere: Prisma.CarpentryProjectWhereInput = { date: { gte: yearStart } };
  const monthHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: monthStart } };
  const weekHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: weekStart } };
  const yearHouseWhere: Prisma.HouseProjectWhereInput = { date: { gte: yearStart } };

  const [
    allTeamMembersCount,
    allBicycleRepairsCount,
    allBicycleRentalsCount,
    allElectronicsRepairsCount,
    allCarpentryProjectsCount,
    allHouseProjectsCount,
    monthTeamMembersCount,
    monthBicycleRepairsCount,
    monthBicycleRentalsCount,
    monthElectronicsRepairsCount,
    monthCarpentryProjectsCount,
    monthHouseProjectsCount,
    weekTeamMembersCount,
    weekBicycleRepairsCount,
    weekBicycleRentalsCount,
    weekElectronicsRepairsCount,
    weekCarpentryProjectsCount,
    weekHouseProjectsCount,
    yearTeamMembersCount,
    yearBicycleRepairsCount,
    yearBicycleRentalsCount,
    yearElectronicsRepairsCount,
    yearCarpentryProjectsCount,
    yearHouseProjectsCount,
  ] = await Promise.all([
    prisma.teamMember.count(),
    prisma.bicycleRepair.count(),
    prisma.bicycleRental.count(),
    prisma.electronicsRepair.count(),
    prisma.carpentryProject.count(),
    prisma.houseProject.count(),
    prisma.teamMember.count({ where: monthTeamWhere }),
    prisma.bicycleRepair.count({ where: monthBikeRepairWhere }),
    prisma.bicycleRental.count({ where: monthRentalWhere }),
    prisma.electronicsRepair.count({ where: monthElectronicsWhere }),
    prisma.carpentryProject.count({ where: monthCarpentryWhere }),
    prisma.houseProject.count({ where: monthHouseWhere }),
    prisma.teamMember.count({ where: weekTeamWhere }),
    prisma.bicycleRepair.count({ where: weekBikeRepairWhere }),
    prisma.bicycleRental.count({ where: weekRentalWhere }),
    prisma.electronicsRepair.count({ where: weekElectronicsWhere }),
    prisma.carpentryProject.count({ where: weekCarpentryWhere }),
    prisma.houseProject.count({ where: weekHouseWhere }),
    prisma.teamMember.count({ where: yearTeamWhere }),
    prisma.bicycleRepair.count({ where: yearBikeRepairWhere }),
    prisma.bicycleRental.count({ where: yearRentalWhere }),
    prisma.electronicsRepair.count({ where: yearElectronicsWhere }),
    prisma.carpentryProject.count({ where: yearCarpentryWhere }),
    prisma.houseProject.count({ where: yearHouseWhere }),
  ]);

  const statsByPeriod: Record<ReportPeriod, MetricStat[]> = {
    "all-time": buildStats(t, isAdmin, {
      teamMembersCount: allTeamMembersCount,
      bicycleRepairsCount: allBicycleRepairsCount,
      bicycleRentalsCount: allBicycleRentalsCount,
      electronicsRepairsCount: allElectronicsRepairsCount,
      carpentryProjectsCount: allCarpentryProjectsCount,
      houseProjectsCount: allHouseProjectsCount,
    }),
    monthly: buildStats(t, isAdmin, {
      teamMembersCount: monthTeamMembersCount,
      bicycleRepairsCount: monthBicycleRepairsCount,
      bicycleRentalsCount: monthBicycleRentalsCount,
      electronicsRepairsCount: monthElectronicsRepairsCount,
      carpentryProjectsCount: monthCarpentryProjectsCount,
      houseProjectsCount: monthHouseProjectsCount,
    }),
    weekly: buildStats(t, isAdmin, {
      teamMembersCount: weekTeamMembersCount,
      bicycleRepairsCount: weekBicycleRepairsCount,
      bicycleRentalsCount: weekBicycleRentalsCount,
      electronicsRepairsCount: weekElectronicsRepairsCount,
      carpentryProjectsCount: weekCarpentryProjectsCount,
      houseProjectsCount: weekHouseProjectsCount,
    }),
    yearly: buildStats(t, isAdmin, {
      teamMembersCount: yearTeamMembersCount,
      bicycleRepairsCount: yearBicycleRepairsCount,
      bicycleRentalsCount: yearBicycleRentalsCount,
      electronicsRepairsCount: yearElectronicsRepairsCount,
      carpentryProjectsCount: yearCarpentryProjectsCount,
      houseProjectsCount: yearHouseProjectsCount,
    }),
  };
  const selectedStats = statsByPeriod[selectedPeriod];

  return (
    <div className="pb-6">
      <section className="rounded-[2rem] border border-border/70 bg-card px-6 py-7 shadow-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("reports.badge", "Reports")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {t("reports.title", "Operations Overview")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          {t(
            "reports.description",
            "Operational totals and high-level workshop activity in one place."
          )}
        </p>
      </section>

      <section className="mt-5 rounded-[1.75rem] border border-border/70 bg-card px-5 py-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("reports.periods.badge", "Reporting Period")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {selectedPeriodOption.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedPeriodOption.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {periodOptions.map((option) => {
                const href =
                  option.value === "monthly"
                    ? reportsBasePath
                    : `${reportsBasePath}?period=${option.value}`;

                return (
                  <Button
                    key={option.value}
                    asChild
                    variant={selectedPeriod === option.value ? "default" : "outline"}
                    size="sm"
                  >
                    <Link href={href}>{option.label}</Link>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {selectedStats.map((stat) => (
              <article
                key={`${selectedPeriod}-${stat.label}`}
                className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <stat.icon className="h-4 w-4 text-accent" />
                </div>
                <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                <Button asChild variant="ghost" className="mt-2 h-auto p-0 text-sm text-primary">
                  <Link href={stat.href}>{t("dashboard.stats.viewDetails", "View details")}</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t("dashboard.cards.activity", "Activity")}</p>
            <Activity className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 text-2xl font-bold">{t("dashboard.cards.activityValue", "Live")}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("dashboard.cards.activityHint", "System is available and running.")}</p>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t("dashboard.cards.lastLogin", "Last Login")}</p>
            <CalendarClock className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 text-2xl font-bold">{today}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("dashboard.cards.lastLoginHint", "Recent session date.")}</p>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{t("dashboard.cards.quickAccess", "Quick Access")}</p>
            <Settings className="h-4 w-4 text-accent" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">{t("dashboard.cards.quickAccessTitle", "Navigate to active work queues")}</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{t("dashboard.cards.quickAccessHint", "Use the sidebar to jump to each module.")}</p>
        </article>
      </section>
    </div>
  );
}

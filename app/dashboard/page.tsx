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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/i18n/server";
import { UserRole } from "@/generated/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const { t } = await getServerI18n();
  const today = new Date().toLocaleDateString();
  const isAdmin = session?.user?.role === UserRole.ADMIN;
  const [
    teamMembersCount,
    bicycleRepairsCount,
    bicycleRentalsCount,
    electronicsRepairsCount,
    carpentryProjectsCount,
    houseProjectsCount,
  ] = await Promise.all([
    prisma.teamMember.count(),
    prisma.bicycleRepair.count(),
    prisma.bicycleRental.count(),
    prisma.electronicsRepair.count(),
    prisma.carpentryProject.count(),
    prisma.houseProject.count(),
  ]);

  const stats = [
    ...(isAdmin
      ? [{
          label: t("dashboard.stats.teamMembers", "Team Members"),
          value: teamMembersCount,
          href: "/team",
          icon: Users,
        }]
      : []),
    {
      label: t("dashboard.stats.bicycles", "Bicycles"),
      value: bicycleRepairsCount,
      href: "/bicycles/repairs",
      icon: Bike,
    },
    {
      label: t("dashboard.stats.rentals", "Rentals"),
      value: bicycleRentalsCount,
      href: "/bicycles/rentals",
      icon: ClipboardList,
    },
    {
      label: t("dashboard.stats.electronics", "Electronics"),
      value: electronicsRepairsCount,
      href: "/electronics/repairs",
      icon: Smartphone,
    },
    {
      label: t("dashboard.stats.carpentry", "Carpentry"),
      value: carpentryProjectsCount,
      href: "/carpentry/projects",
      icon: Hammer,
    },
    {
      label: t("dashboard.stats.houseProjects", "House Projects"),
      value: houseProjectsCount,
      href: "/house-projects",
      icon: House,
    },
  ];

  return (
    <div className="pb-6">
      <div className="grid grid-cols-1 gap-5">
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm lg:col-span-2">
          <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("dashboard.badge", "Dashboard")}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {t("dashboard.welcome", "Welcome back, {name}", {
                name: session?.user?.name ?? t("dashboard.fallbackName", "Maker"),
              })}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              {t("dashboard.description", "Everything in one place: team operations, repair queues, and rental activity.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link href="/bicycles/repairs/new">{t("dashboard.createRepair", "Create Repair")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/bicycles/rentals/new">{t("dashboard.createRental", "Create Rental")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
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

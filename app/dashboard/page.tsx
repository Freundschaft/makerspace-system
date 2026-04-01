import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth-options";
import { getServerI18n } from "@/lib/i18n/server";
import { getNavigationForRole } from "@/lib/navigation";
import { localizePathname } from "@/lib/i18n/config";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const { locale, t } = await getServerI18n();
  const navigationItems = getNavigationForRole(session?.user?.role ?? null).filter(
    (item) => item.key !== "dashboard"
  );

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card px-6 py-6 shadow-sm sm:px-8 sm:py-7">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(132,178,121,0.26),transparent_55%)]" />
        <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative">
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("dashboard.welcome", "Welcome back, {name}", {
              name: session?.user?.name ?? t("dashboard.fallbackName", "Maker"),
            })}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl px-5 text-base">
              <Link href={localizePathname("/bicycles/repairs/new", locale)}>
                {t("dashboard.createRepair", "Create Repair")}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl px-5 text-base"
            >
              <Link href={localizePathname("/bicycles/rentals/new", locale)}>
                {t("dashboard.createRental", "Create Rental")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(0,1fr))] xl:grid-cols-4 xl:grid-rows-[repeat(2,minmax(0,1fr))]">
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={localizePathname(item.href, locale)}
              className="group relative flex h-full min-h-[10.5rem] touch-manipulation [webkit-tap-highlight-color:rgba(15,23,42,0.12)] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-border/70 bg-card px-3 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/10 hover:shadow-md active:scale-[0.985] active:border-primary/35 active:bg-accent/20 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[11.5rem] md:min-h-full"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/8 blur-2xl transition-transform duration-300 group-hover:scale-110" />
              <div className="relative flex flex-col items-center gap-3">
                <div className="flex items-center justify-center text-primary">
                  <item.icon className="h-[clamp(3.75rem,9vw,7rem)] w-[clamp(3.75rem,9vw,7rem)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
                    {t(`shell.nav.${item.key}`, item.fallback)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

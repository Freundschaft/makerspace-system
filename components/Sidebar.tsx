"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  LayoutDashboard,
  Bike,
  Settings,
  ClipboardList,
  Users,
  Smartphone,
  Hammer,
  House,
  Wallet,
} from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { useI18n } from "@/app/components/I18nProvider"

const navigation = [
  {
    key: "dashboard",
    fallback: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "team",
    fallback: "Team",
    href: "/team",
    icon: Users,
  },
  {
    key: "bicycles",
    fallback: "Bicycles",
    href: "/bicycles/repairs",
    icon: Bike,
  },
  {
    key: "rentals",
    fallback: "Rentals",
    href: "/bicycles/rentals",
    icon: ClipboardList,
  },
  {
    key: "electronics",
    fallback: "Electronics",
    href: "/electronics/repairs",
    icon: Smartphone,
  },
  {
    key: "carpentry",
    fallback: "Carpentry",
    href: "/carpentry/projects",
    icon: Hammer,
  },
  {
    key: "houseProjects",
    fallback: "House Project",
    href: "/house-projects",
    icon: House,
  },
  {
    key: "finance",
    fallback: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    key: "settings",
    fallback: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/20 px-3 py-3">
        <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/70">{t("shell.workspace", "Workspace")}</p>
        <p className="mt-1 text-sm font-semibold text-sidebar-foreground">{t("shell.operations", "Operations")}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.key}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start rounded-xl border border-transparent px-3 py-5 text-sidebar-foreground/90 transition-all duration-200 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
                  isActive && "border-sidebar-primary/40 bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {t(`shell.nav.${item.key}`, item.fallback)}
                </Link>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { ScrollArea } from "./ui/scroll-area"
import { useI18n } from "@/app/components/I18nProvider"
import { getNavigationForRole } from "@/lib/navigation"

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useI18n()
  const { data: session } = useSession()
  const navigationItems = getNavigationForRole(session?.user?.role ?? null)

  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
      <div className="rounded-2xl border border-sidebar-border/70 bg-sidebar-accent/20 px-3 py-3">
        <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/70">{t("shell.workspace", "Workspace")}</p>
        <p className="mt-1 text-sm font-semibold text-sidebar-foreground">{t("shell.operations", "Operations")}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.key}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "h-auto w-full justify-start rounded-xl border border-transparent px-3 py-4 text-left text-base text-sidebar-foreground/90 transition-all duration-200 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground",
                  isActive && "border-sidebar-primary/40 bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                )}
                asChild
              >
                <Link href={item.href} onClick={onNavigate}>
                  <item.icon className="mr-3 h-4 w-4 shrink-0" />
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

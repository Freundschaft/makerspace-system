"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { Menu, Sparkles } from "lucide-react"
import { LocaleSwitcher } from "./LocaleSwitcher"
import { useI18n } from "@/app/components/I18nProvider"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession()
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-16 items-center w-full gap-2 px-3 sm:px-4 md:px-5 lg:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="shrink-0 text-foreground/90 hover:bg-accent/20 xl:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1 xl:max-w-[18.5rem]">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-1.5 shadow-sm transition-colors hover:bg-muted">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="hidden text-sm font-semibold tracking-wide sm:inline">{t("shell.brand", "Makerspace System")}</span>
            <span className="text-xs font-semibold tracking-wide sm:hidden">MS</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <LocaleSwitcher />
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || t("common.user", "User")}
              width={34}
              height={34}
              className="rounded-full ring-2 ring-accent/35"
            />
          )}
          <div className="hidden max-w-[15rem] flex-col items-end lg:flex xl:max-w-none">
            <span className="text-sm font-semibold leading-none">{session?.user?.name}</span>
            <span className="mt-1 truncate text-xs text-muted-foreground">{session?.user?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-border/80 bg-card px-3 hover:bg-accent/20"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <span className="hidden md:inline">{t("shell.signOut", "Sign Out")}</span>
            <span className="md:hidden">{t("shell.exit", "Exit")}</span>
          </Button>
        </div>
      </div>
    </header>
  )
} 

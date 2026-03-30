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
      <div className="flex h-16 items-center w-full px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden text-foreground/90 hover:bg-accent/20"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="w-16 md:w-72">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-1.5 shadow-sm transition-colors hover:bg-muted">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="hidden text-sm font-semibold tracking-wide md:inline">{t("shell.brand", "Makerspace System")}</span>
            <span className="text-xs font-semibold tracking-wide md:hidden">MS</span>
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3 md:gap-4">
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
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-semibold leading-none">{session?.user?.name}</span>
            <span className="mt-1 text-xs text-muted-foreground">{session?.user?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border/80 bg-card hover:bg-accent/20"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <span className="hidden sm:inline">{t("shell.signOut", "Sign Out")}</span>
            <span className="sm:hidden">{t("shell.exit", "Exit")}</span>
          </Button>
        </div>
      </div>
    </header>
  )
} 

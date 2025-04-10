"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="w-16 md:w-64">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg hidden md:inline">Makerspace System</span>
            <span className="font-bold text-lg md:hidden">MS</span>
          </Link>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 md:gap-6">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Exit</span>
          </Button>
        </div>
      </div>
    </header>
  )
} 
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
} from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Bicycles",
    href: "/bicycles/repairs",
    icon: Bike,
  },
  {
    name: "Rentals",
    href: "/bicycles/rentals",
    icon: ClipboardList,
  },
  {
    name: "Electronics",
    href: "/electronics/repairs",
    icon: Smartphone,
  },
  {
    name: "Carpentry",
    href: "/carpentry/projects",
    icon: Hammer,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-2">
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
} 
"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(132,178,121,0.18),transparent_38%),radial-gradient(circle_at_90%_90%,rgba(240,136,9,0.12),transparent_42%)]" />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <aside className={`
          fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-[18.5rem] border-r border-sidebar-border/50 bg-sidebar text-sidebar-foreground shadow-xl
          transition-transform duration-300 ease-in-out
          xl:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/45 xl:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 xl:pl-[18.5rem]">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 

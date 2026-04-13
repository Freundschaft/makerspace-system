"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BackButtonProps {
  href?: string
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter()

  if (href) {
    return (
      <Button variant="outline" size="icon" asChild>
        <Link href={href}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )
} 

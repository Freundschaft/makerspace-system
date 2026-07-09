import Link from "next/link"
import type { MouseEventHandler, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { getWhatsAppHref } from "@/lib/whatsapp"

interface WhatsAppLinkProps {
  value: string | null | undefined
  fallback?: ReactNode
  fallbackHref?: string
  className?: string
  fallbackClassName?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function WhatsAppLink({
  value,
  fallback = "—",
  fallbackHref,
  className,
  fallbackClassName,
  onClick,
}: WhatsAppLinkProps) {
  const whatsappHref = getWhatsAppHref(value)
  const label = value || fallback

  if (value && whatsappHref) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={cn("text-primary underline-offset-4 hover:underline", className)}
      >
        {value}
      </a>
    )
  }

  if (fallbackHref) {
    return (
      <Link href={fallbackHref} className={fallbackClassName}>
        {label}
      </Link>
    )
  }

  return <span className={fallbackClassName}>{label}</span>
}

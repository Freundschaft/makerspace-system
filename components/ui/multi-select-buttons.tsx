"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface Option {
  value: string
  label: string
  image?: string
}

interface MultiSelectButtonsProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  className?: string
}

export function MultiSelectButtons({
  options,
  selectedValues,
  onChange,
  className,
}: MultiSelectButtonsProps) {
  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggleOption(option.value)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 sm:gap-2 rounded-lg p-2 sm:p-3 transition-colors",
            selectedValues.includes(option.value)
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {option.image && (
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
              <Image
                src={option.image}
                alt={option.label}
                fill
                className={cn(
                  "object-contain",
                  selectedValues.includes(option.value) 
                    ? "brightness-0 invert"
                    : "brightness-0"
                )}
              />
            </div>
          )}
          <span className="text-xs sm:text-sm font-medium text-center">{option.label}</span>
        </button>
      ))}
    </div>
  )
} 
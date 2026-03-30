"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Check, ChevronDown, Languages } from "lucide-react";
import {
  defaultLocale,
  getLocaleFromPathname,
  Locale,
  locales,
  localizePathname,
} from "@/lib/i18n/config";

const localeMeta: Record<
  Locale,
  { code: string; label: string; nativeLabel: string }
> = {
  en: { code: "EN", label: "English", nativeLabel: "English" },
  el: { code: "EL", label: "Greek", nativeLabel: "Eλληνικά" },
  fr: { code: "FR", label: "French", nativeLabel: "Français" },
  ar: { code: "AR", label: "Arabic", nativeLabel: "العربية" },
  fa: { code: "FA", label: "Farsi", nativeLabel: "فارسی" },
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const search = searchParams.toString();
  const current = localeMeta[currentLocale];

  const switchLocale = (locale: Locale) => {
    const targetPath = localizePathname(pathname, locale);
    const target = search ? `${targetPath}?${search}` : targetPath;
    document.cookie = `NEXT_LOCALE=${locale}; path=/; samesite=lax`;
    router.push(target);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full border-border/70 bg-card px-2.5 shadow-sm hover:bg-accent/20"
        >
          <span className="text-xs font-semibold text-foreground/85 sm:text-sm">
            {current.nativeLabel}
          </span>
          <Languages className="h-3.5 w-3.5 text-foreground/60" />
          <ChevronDown className="h-3.5 w-3.5 text-foreground/50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/70 p-2 shadow-xl">
        {locales.map((locale) => {
          const meta = localeMeta[locale];
          const selected = currentLocale === locale;

          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => switchLocale(locale)}
              className="rounded-xl px-3 py-2.5"
            >
              <div className="flex w-full items-center gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-none">{meta.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{meta.nativeLabel}</div>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
                  {meta.code}
                </span>
                {selected && <Check className="h-4 w-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

type PageJumpProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  preservedParams?: Record<string, string | undefined>;
  inputLabel?: string;
};

export function PageJump({
  basePath,
  currentPage,
  totalPages,
  preservedParams = {},
  inputLabel = "Page number",
}: PageJumpProps) {
  const router = useRouter();
  const [value, setValue] = useState(String(currentPage));

  useEffect(() => {
    setValue(String(currentPage));
  }, [currentPage]);

  const navigateToPage = () => {
    const parsedPage = Number(value);
    if (!Number.isFinite(parsedPage)) {
      setValue(String(currentPage));
      return false;
    }

    const nextPage = Math.min(totalPages, Math.max(1, Math.trunc(parsedPage)));
    setValue(String(nextPage));

    if (nextPage === currentPage) {
      return true;
    }

    const params = new URLSearchParams();

    for (const [key, paramValue] of Object.entries(preservedParams)) {
      if (paramValue) {
        params.set(key, paramValue);
      }
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
    return true;
  };

  return (
    <Input
      type="number"
      inputMode="numeric"
      min={1}
      max={totalPages}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => {
        void navigateToPage();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          void navigateToPage();
        }
      }}
      aria-label={inputLabel}
      className="h-8 w-16 text-center"
    />
  );
}

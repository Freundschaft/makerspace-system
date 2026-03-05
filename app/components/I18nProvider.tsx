"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/config";

type Messages = Record<string, unknown>;

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

function getNestedValue(messages: Messages, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[part];
  }, messages);

  return typeof value === "string" ? value : undefined;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  const t = (key: string, fallback: string, params?: Record<string, string | number>) => {
    let template = getNestedValue(context.messages, key) ?? fallback;
    if (!params) return template;

    Object.entries(params).forEach(([name, value]) => {
      template = template.replaceAll(`{${name}}`, String(value));
    });
    return template;
  };

  return {
    locale: context.locale,
    t,
  };
}

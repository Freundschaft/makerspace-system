import { Locale } from "@/lib/i18n/config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  el: () => import("@/messages/el.json").then((module) => module.default),
  fr: () => import("@/messages/fr.json").then((module) => module.default),
  ar: () => import("@/messages/ar.json").then((module) => module.default),
  fa: () => import("@/messages/fa.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

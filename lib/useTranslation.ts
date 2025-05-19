"use client";

import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

const translations: Record<string, Record<string, string>> = {
  en,
  ar,
};

export function useTranslation(lang: "en" | "ar" = "en") {
  const t = (key: string): string => {
    return translations[lang]?.[key] ?? key;
  };

  return { t };
}

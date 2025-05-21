"use client";

import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/lib/TranslationProvider";

const backgroundOptions = [
  { label: "Default", value: "bg-background" },
  { label: "Ocean Blue", value: "bg-blue-900" },
  { label: "Sky Blue", value: "bg-sky-500" },
  { label: "Forest Green", value: "bg-green-900" },
  { label: "Mint Green", value: "bg-emerald-400" },
  { label: "Crimson Red", value: "bg-red-900" },
  { label: "Rose Pink", value: "bg-rose-400" },
  { label: "Midnight Purple", value: "bg-purple-900" },
  { label: "Soft Violet", value: "bg-violet-400" },
  { label: "Steel Gray", value: "bg-gray-800" },
  { label: "Slate Gray", value: "bg-slate-600" },
  { label: "Sunset Orange", value: "bg-orange-700" },
  { label: "Peach", value: "bg-orange-300" },
  { label: "Royal Indigo", value: "bg-indigo-800" },
  { label: "Light Indigo", value: "bg-indigo-300" },
  { label: "Lemon Yellow", value: "bg-yellow-300" },
  { label: "Amber", value: "bg-amber-500" },
  { label: "Cyan", value: "bg-cyan-400" },
  { label: "Teal", value: "bg-teal-500" },
  { label: "Lime Green", value: "bg-lime-400" },
  { label: "Pink", value: "bg-pink-400" },
  { label: "Fuchsia", value: "bg-fuchsia-500" },
  { label: "Black", value: "bg-black" },
  { label: "White", value: "bg-white" },
  { label: "Gray", value: "bg-gray" },
  { label: "Red", value: "bg-red" },
  { label: "Blue", value: "bg-blue" },
  { label: "Green", value: "bg-green" },
  { label: "Purple", value: "bg-purple" },
  { label: "Orange", value: "bg-orange" },
];

export default function SettingsPage() {
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const [bgColor, setBgColor] = useState("bg-background");

  // تحميل الإعدادات من localStorage عند أول تحميل
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedBgColor = localStorage.getItem("bgColor");

    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    if (savedBgColor) {
      setBgColor(savedBgColor);
      document.body.classList.add(savedBgColor);
    }

    // إعداد الاتجاه واللغة في HTML
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("bgColor", bgColor);
    document.body.classList.remove(...backgroundOptions.map((o) => o.value));
    document.body.classList.add(bgColor);
  }, [bgColor]);

  useEffect(() => {
    // تحديث اللغة والاتجاه في DOM عندما تتغير من السياق
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="mt-5 h-screen max-w-3xl mx-auto p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {t("Settings")}
      </h1>

      {/* Toggle Dark Mode */}
      <section className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {t("Dark Mode")}
        </span>
        <Switch
          checked={isDarkMode}
          onChange={(e, checked) => setIsDarkMode(checked)}
        />
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Background Color Dropdown */}
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" w-full justify-between">
              {t("Choose Background Color")}
              <span
                className="ml-2 h-4 w-4 rounded border border-yellow-400 dark:border-gray-600"
                style={{
                  backgroundColor: getComputedStyle(document.body)
                    .backgroundColor,
                }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={8} className="overflow-scroll text-white h-40 w-48">
            <DropdownMenuLabel className="text-green-500 border border-green-500">{t("Background Colors")}</DropdownMenuLabel>
            {backgroundOptions.map((bg) => (
              <DropdownMenuItem
                key={bg.value}
                onSelect={() => setBgColor(bg.value)}
                className={`cursor-pointer ${
                  bgColor === bg.value ? "bg-primary text-white" : ""
                }`}
              >
                {t(bg.label)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Language Switcher */}
      <section className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {t("Language")}
        </span>
        <Button
          variant="outline"
          onClick={() => {
            const newLang = lang === "en" ? "ar" : "en";
            setLang(newLang); // هذا من useTranslation
          }}
        >
          {lang === "en" ? "العربية" : "English"}
        </Button>
      </section>
    </div>
  );
}

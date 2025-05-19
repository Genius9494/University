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
import { useTranslation } from "next-i18next";

const backgroundOptions = [
  { label: "Default", value: "bg-background" },
  { label: "Ocean Blue", value: "bg-blue-900" },
  { label: "Forest Green", value: "bg-green-900" },
  { label: "Crimson Red", value: "bg-red-900" },
  { label: "Midnight Purple", value: "bg-purple-900" },
  { label: "Steel Gray", value: "bg-gray-800" },
  { label: "Sunset Orange", value: "bg-orange-700" },
  { label: "Royal Indigo", value: "bg-indigo-800" },
  { label: "Lavender Lavender", value: "bg-lavender" },
  { label: "Coral Coral", value: "bg-coral" },
  { label: "Teal Teal", value: "bg-teal" },
  { label: "Slate Slate", value: "bg-slate" },
  { label: "Cyan Cyan", value: "bg-cyan" },
  { label: "Lime Lime", value: "bg-lime" },
  { label: "Blue Blue", value: "bg-blue" },
  { label: "Red Red", value: "bg-red" },
  { label: "Yellow Yellow", value: "bg-yellow" },
  { label: "Green Green", value: "bg-green" },
  { label: "Orange Orange", value: "bg-orange" },
  { label: "Purple Purple", value: "bg-purple" },
  { label: "Pink Pink", value: "bg-pink" },
  { label: "Black Black", value: "bg-black" },
  { label: "White White", value: "bg-white" },
  { label: "Gray Gray", value: "bg-gray" },
  { label: "Brown Brown", value: "bg-brown" },
  { label: "Teal Teal", value: "bg-teal" },
  { label: "Blue Blue", value: "bg-blue" },
  { label: "Red Red", value: "bg-red" },
  { label: "Yellow Yellow", value: "bg-yellow" },
  { label: "Green Green", value: "bg-green" },
  { label: "Orange Orange", value: "bg-orange" },
  { label: "Purple Purple", value: "bg-purple" },
  { label: "Pink Pink", value: "bg-pink" },
  { label: "Black Black", value: "bg-black" },
  { label: "White White", value: "bg-white" },
  { label: "Gray Gray", value: "bg-gray" },
  { label: "Brown Brown", value: "bg-brown" },
  { label: "Lavender Lavender", value: "bg-lavender" },
  { label: "Coral Coral", value: "bg-coral" },
  { label: "Teal Teal", value: "bg-teal" },
  { label: "Slate Slate", value: "bg-slate" },
  { label: "Cyan Cyan", value: "bg-cyan" },
  { label: "Lime Lime", value: "bg-lime" },
  { label: "Blue Blue", value: "bg-blue" },
  { label: "Red Red", value: "bg-red" },
  { label: "Yellow Yellow", value: "bg-yellow" },
  { label: "Green Green", value: "bg-green" },
  { label: "Orange Orange", value: "bg-orange" },
  { label: "Purple Purple", value: "bg-purple" },
  { label: "Pink Pink", value: "bg-pink" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
//   language
  const { t } = useTranslation(language);
// language

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const [bgColor, setBgColor] = useState("bg-background");
  const [language, setLanguage] = useState<"en" | "ar">("en");

  // ❗ تحديث السمة من localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedBgColor = localStorage.getItem("bgColor");
    const savedLang = localStorage.getItem("lang");

    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    if (savedBgColor) {
      setBgColor(savedBgColor);
      document.body.classList.add(savedBgColor);
    }

    if (savedLang === "ar") {
      setLanguage("ar");
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    } else {
      setLanguage("en");
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, []);

  // تحديث الثيم واللغة في DOM
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
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Settings
      </h1>

      {/* Toggle Dark Mode */}
      <section className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Dark Mode
        </span>
        <Switch checked={isDarkMode} onChange={(e, checked) => setIsDarkMode(checked)} />
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Background Color Dropdown */}
      <section>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Choose Background Color
              <span
                className="ml-2 h-4 w-4 rounded border border-gray-400 dark:border-gray-600"
                style={{
                  backgroundColor: getComputedStyle(document.body).backgroundColor,
                }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={8} className="w-48">
            <DropdownMenuLabel>Background Colors</DropdownMenuLabel>
            {backgroundOptions.map((bg) => (
              <DropdownMenuItem
                key={bg.value}
                onSelect={() => setBgColor(bg.value)}
                className={`cursor-pointer ${
                  bgColor === bg.value ? "bg-primary text-white" : ""
                }`}
              >
                {bg.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Language Switcher */}
      <section className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Language
        </span>
        <Button
          variant="outline"
          onClick={() => setLanguage((prev) => (prev === "en" ? "ar" : "en"))}
        >
          {language === "en" ? "العربية" : "English"}
        </Button>
      </section>
    </div>
  );
}

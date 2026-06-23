"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/20" />
        <div className="absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-900/20" />
      </div>

      <button
        onClick={toggleTheme}
        className="absolute right-4 top-4 rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-white/70 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </button>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <Link href="/login" className="inline-flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Sri Siri Publishers"
              width={220}
              height={55}
              className="object-contain dark:brightness-110"
              priority
            />
          </Link>
          <p className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400">
            Star Q Analytics
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white/90 p-8 shadow-modal backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {footer}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          Sri Siri Publishers, Machilipatnam
        </p>
      </div>
    </div>
  );
}

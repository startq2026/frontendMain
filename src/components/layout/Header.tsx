"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  Moon,
  Sun,
  Menu,
  Home,
  ChevronRight,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useSidebar } from "@/components/layout/Sidebar";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Data",
  "/analytics": "Analytics",
  "/data": "Data Browser",
  "/settings": "Settings",
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { setIsOpen } = useSidebar();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get breadcrumb segments
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 transition-colors duration-200 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Breadcrumb - Desktop */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          {segments.length > 0 ? (
            segments.map((segment, i) => (
              <Fragment key={segment}>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                <span
                  className={
                    i === segments.length - 1
                      ? "text-gray-900 dark:text-white font-medium capitalize"
                      : "text-gray-500 dark:text-gray-400 capitalize"
                  }
                >
                  {pageNames[`/${segment}`] || segment}
                </span>
              </Fragment>
            ))
          ) : (
            <>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              <span className="text-gray-900 dark:text-white font-medium">
                Dashboard
              </span>
            </>
          )}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md ml-auto md:ml-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                searchFocused
                  ? "text-primary-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
            <input
              type="text"
              id="global-search"
              placeholder="Search... (⌘K)"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-700
                       placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 ml-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Toggle theme"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 pl-3 sm:pl-4 ml-2 sm:ml-3 border-l border-gray-200 dark:border-gray-700 
                       hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sri Siri Publishers
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-dropdown border border-gray-200 dark:border-gray-700 py-2 animate-fade-in-down z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@srisiri.com
                </p>
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

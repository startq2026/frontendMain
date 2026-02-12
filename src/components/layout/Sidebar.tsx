"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Upload Data", href: "/upload", icon: Upload },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Data Browser", href: "/data", icon: FileSpreadsheet },
  { name: "Settings", href: "/settings", icon: Settings },
];

// Context for mobile sidebar state
const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function MobileMenuButton() {
  const { setIsOpen } = useSidebar();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center" onClick={closeSidebar}>
            <Image
              src="/images/logo.png"
              alt="Sri Siri Publishers"
              width={180}
              height={45}
              className="object-contain dark:brightness-110"
              priority
            />
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group animate-fade-in-up
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-50/50 dark:from-primary-900/40 dark:to-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />
                )}

                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                </div>

                <span className="flex-1">{item.name}</span>

                {/* Hover arrow indicator */}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-200 ${
                    isActive
                      ? "opacity-100 text-primary-500"
                      : "opacity-0 group-hover:opacity-100 text-gray-400 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SQ</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Star Q Analytics
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  v1.0.0
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
              Sri Siri Publishers, Machilipatnam
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

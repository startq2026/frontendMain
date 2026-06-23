"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar, { SidebarProvider } from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthProvider";
import { AUTH_ROUTES } from "@/lib/auth-config";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthRoute && user) {
      router.replace("/");
      return;
    }

    if (!isAuthRoute && !user) {
      router.replace("/login");
    }
  }, [isLoading, isAuthRoute, user, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
      </div>
    );
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 sm:p-6 transition-colors duration-200">
            <div className="animate-fade-in-up">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

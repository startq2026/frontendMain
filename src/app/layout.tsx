import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar, { SidebarProvider } from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Q Analytics | Sri Siri Publishers",
  description: "Sales and Revenue Analytics Dashboard for Star Q Book Series",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ToastProvider>
            <SidebarProvider>
              <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                  {/* Header */}
                  <Header />

                  {/* Page Content */}
                  <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <div className="animate-fade-in-up">{children}</div>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

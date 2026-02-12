"use client";

import Link from "next/link";
import { Upload, BarChart3, FileSpreadsheet, ArrowRight } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Upload Excel",
      description: "Import new sales data",
      href: "/upload",
      icon: Upload,
      color: "bg-gradient-to-br from-primary-500 to-primary-600",
      shadowColor: "shadow-primary-500/30",
      hoverGlow: "group-hover:shadow-primary-500/40",
    },
    {
      title: "View Analytics",
      description: "Detailed reports",
      href: "/analytics",
      icon: BarChart3,
      color: "bg-gradient-to-br from-accent-500 to-accent-600",
      shadowColor: "shadow-accent-500/30",
      hoverGlow: "group-hover:shadow-accent-500/40",
    },
    {
      title: "Browse Data",
      description: "View all records",
      href: "/data",
      icon: FileSpreadsheet,
      color: "bg-gradient-to-br from-info-500 to-info-600",
      shadowColor: "shadow-info-500/30",
      hoverGlow: "group-hover:shadow-info-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Link
          key={action.title}
          href={action.href}
          className={`
            group relative overflow-hidden flex items-center gap-4 p-5 
            bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700
            hover:border-gray-300 dark:hover:border-gray-600 
            hover:shadow-xl hover:-translate-y-1 
            transition-all duration-300 animate-fade-in-up
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background gradient on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent 
                       dark:via-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Icon container */}
          <div
            className={`
              relative w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center
              shadow-lg ${action.shadowColor} ${action.hoverGlow}
              group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
            `}
          >
            <action.icon className="w-7 h-7 text-white" />
          </div>

          {/* Content */}
          <div className="relative flex-1 min-w-0">
            <h3
              className="font-semibold text-gray-900 dark:text-white 
                         group-hover:text-primary-600 dark:group-hover:text-primary-400 
                         transition-colors duration-200"
            >
              {action.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {action.description}
            </p>
          </div>

          {/* Arrow indicator */}
          <ArrowRight
            className="relative w-5 h-5 text-gray-300 dark:text-gray-600 
                       group-hover:text-primary-500 dark:group-hover:text-primary-400
                       group-hover:translate-x-1 transition-all duration-300"
          />
        </Link>
      ))}
    </div>
  );
}

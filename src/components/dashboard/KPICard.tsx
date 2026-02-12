"use client";

import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description: string;
}

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
}: KPICardProps) {
  const changeStyles = {
    positive: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      icon: TrendingUp,
    },
    negative: {
      bg: "bg-red-50 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      icon: TrendingDown,
    },
    neutral: {
      bg: "bg-gray-100 dark:bg-gray-700",
      text: "text-gray-600 dark:text-gray-400",
      icon: Minus,
    },
  };

  const TrendIcon = changeStyles[changeType].icon;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 
                 p-5 sm:p-6 transition-all duration-300 hover:shadow-card-hover hover:border-gray-300 
                 dark:hover:border-gray-600 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative flex items-start justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 
                          dark:from-primary-900/40 dark:to-primary-800/30 
                          rounded-xl flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-300 shadow-sm"
            >
              <Icon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </p>
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            {value}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${changeStyles[changeType].bg} ${changeStyles[changeType].text}`}
            >
              <TrendIcon className="w-3 h-3" />
              {change}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
              {description}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 
                      rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}

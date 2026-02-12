"use client";

import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  const ActionButton = () => (
    <button
      onClick={action?.onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl 
                 font-medium hover:bg-primary-600 transition-all duration-200 
                 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
                 active:scale-[0.98]"
    >
      {action?.label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      {/* Decorative background */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-2xl scale-150" />
        <div
          className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 
                        dark:from-gray-700 dark:to-gray-800 rounded-2xl 
                        flex items-center justify-center shadow-inner"
        >
          <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>

      {action &&
        (action.href ? (
          <Link href={action.href}>
            <ActionButton />
          </Link>
        ) : (
          <ActionButton />
        ))}
    </div>
  );
}

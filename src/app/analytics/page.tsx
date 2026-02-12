"use client";

import { Filter, BarChart3, TrendingUp, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Analytics"
          description="Detailed revenue and performance analysis"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
            <option>All Distributors</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          />
          <span className="text-gray-400 dark:text-gray-500">to</span>
          <input
            type="date"
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-sm font-medium hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all">
            <Filter className="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Revenue
            </h3>
          </div>
          <EmptyState
            icon={BarChart3}
            title="No data available"
            description="Upload data to view monthly revenue analysis"
            action={{ label: "Upload Data", href: "/upload" }}
          />
        </div>

        {/* Quarterly Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/40 dark:to-accent-800/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quarterly Revenue
            </h3>
          </div>
          <EmptyState
            icon={TrendingUp}
            title="No data available"
            description="Upload data to view quarterly revenue analysis"
            action={{ label: "Upload Data", href: "/upload" }}
          />
        </div>

        {/* Distributor Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-info-50 to-info-100 dark:from-info-900/40 dark:to-info-800/30 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-info-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Distributor Performance
            </h3>
          </div>
          <EmptyState
            icon={Users}
            title="No data available"
            description="Upload data to view distributor performance"
            action={{ label: "Upload Data", href: "/upload" }}
          />
        </div>
      </div>
    </div>
  );
}

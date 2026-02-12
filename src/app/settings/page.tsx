"use client";

import { Database, Table, Trash2, Download, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Configure application settings"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Connection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Database Connection
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                MongoDB URI
              </label>
              <input
                type="text"
                disabled
                value="mongodb://localhost:27017/starq"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 transition-colors"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Configured via environment variable
              </p>
            </div>
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">Not connected</span>
            </div>
          </div>
        </div>

        {/* Column Mappings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/40 dark:to-accent-800/30 rounded-xl flex items-center justify-center">
              <Table className="w-5 h-5 text-accent-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Column Mappings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Excel column to field mapping
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date columns</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                date, Date, DATE, तारीख
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount columns</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                amount, Amount, Total, Revenue
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Distributor columns</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                distributor, Dealer, Name
              </span>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-info-50 to-info-100 dark:from-info-900/40 dark:to-info-800/30 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-info-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Download className="w-4 h-4" />
              Export All Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </button>
          </div>
          <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Clearing data is irreversible. Make sure to export a backup first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Database, ExternalLink, Table } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Configure application settings"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backend Integration */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Backend Integration
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Active data workflow
              </label>
              <input
                type="text"
                disabled
                value="/backend-data/UploadDataBrowser.html"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 transition-colors"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Uploads and backend actions are handled inside the Data Browser page.
              </p>
            </div>
            <Link
              href="/data"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              Open Data Browser
              <ExternalLink className="w-4 h-4" />
            </Link>
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
      </div>
    </div>
  );
}

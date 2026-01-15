'use client'

import { BarChart3 } from 'lucide-react'

export default function RevenueChart() {
  // Placeholder for when we have actual data
  const hasData = false

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue over time</p>
        </div>
        <select className="text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
          <option>All time</option>
        </select>
      </div>

      {hasData ? (
        // Chart will go here when we integrate Recharts
        <div className="h-64">
          {/* Recharts component */}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No revenue data yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Upload Excel files to see revenue trends
          </p>
        </div>
      )}
    </div>
  )
}

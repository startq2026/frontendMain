"use client";

import { Users } from "lucide-react";

export default function DistributorTable() {
  // Placeholder for when we have actual data
  const distributors: any[] = [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Distributors
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">By revenue</p>
        </div>
      </div>

      {distributors.length > 0 ? (
        <div className="space-y-3">
          {distributors.map((dist, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-xs font-medium text-primary-500">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {dist.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {dist.revenue}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            No distributors yet
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Upload data to see distributor rankings
          </p>
        </div>
      )}
    </div>
  );
}

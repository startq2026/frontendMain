"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  Clock,
  History,
  CheckCircle,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { ListSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { formatDistanceToNow } from "date-fns";

// Demo data for visualization
const demoUploads = [
  {
    id: "1",
    filename: "January_2024_Sales.xlsx",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 30),
    rowsProcessed: 1456,
    status: "success",
  },
  {
    id: "2",
    filename: "December_2023_Report.xlsx",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    rowsProcessed: 2341,
    status: "success",
  },
  {
    id: "3",
    filename: "Q4_Distributor_Data.xlsx",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    rowsProcessed: 876,
    status: "success",
  },
  {
    id: "4",
    filename: "November_Sales.xlsx",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    rowsProcessed: 1234,
    status: "success",
  },
];

interface Upload {
  id: string;
  filename: string;
  uploadedAt: Date;
  rowsProcessed: number;
  status: string;
}

interface UploadHistoryProps {
  uploads?: Upload[];
  isLoading?: boolean;
}

export default function UploadHistory({
  uploads,
  isLoading = false,
}: UploadHistoryProps) {
  const [showDemo, setShowDemo] = useState(false);

  const data = uploads || (showDemo ? demoUploads : []);
  const hasData = data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-info-50 to-info-100 dark:from-info-900/40 dark:to-info-800/30 rounded-xl flex items-center justify-center">
            <History className="w-5 h-5 text-info-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Uploads
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your upload history
            </p>
          </div>
        </div>

        {!uploads && (
          <button
            onClick={() => setShowDemo(!showDemo)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              showDemo
                ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {showDemo ? "Demo On" : "Show Demo"}
          </button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <ListSkeleton rows={4} />
      ) : hasData ? (
        <div className="space-y-3">
          {data.map((upload, index) => (
            <div
              key={upload.id}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 
                         transition-all duration-200 cursor-pointer border border-transparent
                         hover:border-gray-200 dark:hover:border-gray-600"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {upload.filename}
                  </p>
                  {upload.status === "success" && (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(upload.uploadedAt, { addSuffix: true })}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {upload.rowsProcessed.toLocaleString()} rows
                  </span>
                </div>
              </div>

              {/* Actions on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1.5 text-gray-400 hover:text-info-500 hover:bg-info-50 dark:hover:bg-info-900/30 rounded-lg transition-colors"
                  title="Re-process"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Clock}
          title="No uploads yet"
          description="Your upload history will appear here"
        />
      )}
    </div>
  );
}

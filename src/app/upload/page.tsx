"use client";

import ExcelUploader from "@/components/upload/ExcelUploader";
import UploadHistory from "@/components/upload/UploadHistory";
import PageHeader from "@/components/ui/PageHeader";
import { FileSpreadsheet, FileText, Calendar, Layers } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Upload Data"
        description="Import Excel files containing sales and revenue data"
      />

      {/* Upload Instructions */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5 transition-colors">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          File Requirements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/40 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800/30 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-600 dark:text-amber-400">Formats</p>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">.xls, .xlsx</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/40 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800/30 rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-600 dark:text-amber-400">Max Size</p>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">10 MB</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/40 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-600 dark:text-amber-400">Required</p>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Date, Amount</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/40 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800/30 rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-600 dark:text-amber-400">Sheets</p>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Multiple OK</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <ExcelUploader />
        </div>

        {/* Upload History */}
        <div>
          <UploadHistory />
        </div>
      </div>
    </div>
  );
}

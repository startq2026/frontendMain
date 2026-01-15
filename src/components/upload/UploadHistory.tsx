'use client'

import { FileSpreadsheet, Clock } from 'lucide-react'

export default function UploadHistory() {
  // Placeholder - will be populated from API later
  const uploads: any[] = []

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h2>

      {uploads.length > 0 ? (
        <div className="space-y-3">
          {uploads.map((upload, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <FileSpreadsheet className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {upload.filename}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{upload.uploadedAt}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {upload.rowsProcessed} rows processed
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No uploads yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Your upload history will appear here
          </p>
        </div>
      )}
    </div>
  )
}

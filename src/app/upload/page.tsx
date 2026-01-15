import ExcelUploader from '@/components/upload/ExcelUploader'
import UploadHistory from '@/components/upload/UploadHistory'

export default function UploadPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Data</h1>
        <p className="text-gray-500 mt-1">
          Import Excel files containing sales and revenue data
        </p>
      </div>

      {/* Upload Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 mb-2">📋 File Requirements</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Supported formats: <strong>.xls</strong> and <strong>.xlsx</strong></li>
          <li>• Maximum file size: <strong>10 MB</strong></li>
          <li>• Required columns: Date, Amount, Distributor name</li>
          <li>• Multiple sheets per file are supported</li>
        </ul>
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
  )
}

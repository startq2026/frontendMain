import { Filter } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">
            Detailed revenue and performance analysis
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>All Distributors</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600">
            <Filter className="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>

      {/* Analytics Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Revenue
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Upload data to view monthly revenue analysis
          </div>
        </div>

        {/* Quarterly Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quarterly Revenue
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Upload data to view quarterly revenue analysis
          </div>
        </div>

        {/* Distributor Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distributor Performance
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Upload data to view distributor performance
          </div>
        </div>
      </div>
    </div>
  );
}

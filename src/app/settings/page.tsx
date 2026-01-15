export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure application settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Connection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Database Connection</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MongoDB URI
              </label>
              <input
                type="text"
                disabled
                value="mongodb://localhost:27017/starq"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Configured via environment variable
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="text-sm text-gray-600">Not connected</span>
            </div>
          </div>
        </div>

        {/* Column Mappings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Column Mappings</h2>
          <p className="text-sm text-gray-500 mb-4">
            Configure how Excel columns are mapped to data fields
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Date columns</span>
              <span className="text-sm text-gray-400">date, Date, DATE, तारीख</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Amount columns</span>
              <span className="text-sm text-gray-400">amount, Amount, Total, Revenue</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Distributor columns</span>
              <span className="text-sm text-gray-400">distributor, Dealer, Name</span>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              Export All Data
            </button>
            <button className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
              Clear All Data
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            ⚠️ Clearing data is irreversible. Make sure to export a backup first.
          </p>
        </div>
      </div>
    </div>
  )
}

import { IndianRupee, TrendingUp, Users, FileSpreadsheet } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import DistributorTable from "@/components/dashboard/DistributorTable";
import QuickActions from "@/components/dashboard/QuickActions";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome to Star Q Analytics - Sri Siri Publishers
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="₹0"
          change="+0%"
          changeType="neutral"
          icon={IndianRupee}
          description="All time revenue"
        />
        <KPICard
          title="This Month"
          value="₹0"
          change="+0%"
          changeType="neutral"
          icon={TrendingUp}
          description="Current month revenue"
        />
        <KPICard
          title="Distributors"
          value="0"
          change="+0"
          changeType="neutral"
          icon={Users}
          description="Active distributors"
        />
        <KPICard
          title="Files Processed"
          value="0"
          change="+0"
          changeType="neutral"
          icon={FileSpreadsheet}
          description="Excel files uploaded"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <DistributorTable />
        </div>
      </div>

      {/* Getting Started Message */}
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
          🚀 Getting Started
        </h3>
        <p className="text-primary-700 dark:text-primary-300 mb-4">
          Welcome to Star Q Analytics! To see your data on this dashboard:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-primary-700 dark:text-primary-300">
          <li>
            Navigate to the <strong>Upload</strong> page from the sidebar
          </li>
          <li>Upload your Excel files containing sales data</li>
          <li>The system will automatically process and normalize the data</li>
          <li>Return here to view your analytics and insights</li>
        </ol>
      </div>
    </div>
  );
}

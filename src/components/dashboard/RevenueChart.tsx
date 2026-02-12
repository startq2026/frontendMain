"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

// Demo data for visualization
const demoData = [
  { month: "Jul", revenue: 125000 },
  { month: "Aug", revenue: 189000 },
  { month: "Sep", revenue: 156000 },
  { month: "Oct", revenue: 245000 },
  { month: "Nov", revenue: 198000 },
  { month: "Dec", revenue: 312000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

interface RevenueChartProps {
  data?: Array<{ month: string; revenue: number }>;
  isLoading?: boolean;
}

export default function RevenueChart({
  data,
  isLoading = false,
}: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState("6months");
  const [showDemo, setShowDemo] = useState(false);

  const chartData = data || (showDemo ? demoData : null);
  const hasData = chartData && chartData.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly revenue over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!data && (
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
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 
                       rounded-xl px-3 py-2 text-gray-600 dark:text-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                       cursor-pointer transition-all"
          >
            <option value="6months">Last 6 months</option>
            <option value="12months">Last 12 months</option>
            <option value="year">This year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Chart Area */}
      {isLoading ? (
        <ChartSkeleton />
      ) : hasData ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#de1f1f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#de1f1f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
                className="dark:opacity-20"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(value) =>
                  `₹${value >= 100000 ? `${(value / 100000).toFixed(1)}L` : `${(value / 1000).toFixed(0)}K`}`
                }
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#de1f1f"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#de1f1f",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No revenue data yet"
          description="Upload Excel files to see your revenue trends visualized here"
          action={{ label: "Upload Data", href: "/upload" }}
        />
      )}
    </div>
  );
}

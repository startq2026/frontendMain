"use client";

import { useState } from "react";
import { Users, Trophy, TrendingUp, ExternalLink } from "lucide-react";
import { ListSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";

// Demo data for visualization
const demoDistributors = [
  { name: "Krishna Books", revenue: 456000, growth: 12.5 },
  { name: "Vijayawada Traders", revenue: 389000, growth: 8.2 },
  { name: "Guntur Agencies", revenue: 312000, growth: -2.1 },
  { name: "Nellore Distributors", revenue: 278000, growth: 15.8 },
  { name: "Rajahmundry Books", revenue: 234000, growth: 5.4 },
];

interface Distributor {
  name: string;
  revenue: number;
  growth?: number;
}

interface DistributorTableProps {
  distributors?: Distributor[];
  isLoading?: boolean;
}

export default function DistributorTable({
  distributors,
  isLoading = false,
}: DistributorTableProps) {
  const [showDemo, setShowDemo] = useState(false);

  const data = distributors || (showDemo ? demoDistributors : []);
  const hasData = data.length > 0;

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-500/30";
      case 1:
        return "bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg shadow-gray-400/30";
      case 2:
        return "bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 transition-colors duration-200 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/40 dark:to-accent-800/30 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-accent-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Distributors
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By revenue
            </p>
          </div>
        </div>

        {!distributors && (
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
        <ListSkeleton rows={5} />
      ) : hasData ? (
        <div className="space-y-2">
          {data.slice(0, 5).map((dist, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-3 rounded-xl
                         hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getRankStyle(index)}`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {dist.name}
                  </p>
                  {dist.growth !== undefined && (
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        dist.growth >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <TrendingUp
                        className={`w-3 h-3 ${dist.growth < 0 ? "rotate-180" : ""}`}
                      />
                      {Math.abs(dist.growth)}%
                    </p>
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                ₹{(dist.revenue / 1000).toFixed(0)}K
              </span>
            </div>
          ))}

          {/* View All Link */}
          <Link
            href="/data"
            className="flex items-center justify-center gap-2 p-3 mt-2 text-sm font-medium 
                       text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300
                       bg-primary-50 dark:bg-primary-900/20 rounded-xl
                       hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            View all distributors
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No distributors yet"
          description="Upload data to see distributor rankings"
          action={{ label: "Upload Data", href: "/upload" }}
        />
      )}
    </div>
  );
}

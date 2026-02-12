import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description: string;
}

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
}: KPICardProps) {
  const changeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 card-hover transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${changeColors[changeType]}`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {description}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
      </div>
    </div>
  );
}
